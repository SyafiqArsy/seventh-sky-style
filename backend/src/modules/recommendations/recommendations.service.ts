import {
Injectable,
BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class RecommendationsService {
// 1. CONSTRUCTOR HANYA UNTUK INJEKSI SERVICE
constructor(
    private readonly prisma: PrismaService,
    private readonly profilesService: ProfilesService,
) {}

// 2. PINDAHKAN PRIVATE METHODS KE LUAR CONSTRUCTOR
private calculateBMI(
    height: number,
    weight: number,
): number {
    const heightInMeter =
        height / 100;

    return Number(
        (
        weight /
        (heightInMeter * heightInMeter)
        ).toFixed(2),
    );
}

private classifyBodyType(
    bmi: number,
): string {
    if (bmi < 18.5) {
        return 'Slim';
    }

    if (bmi < 25) {
        return 'Athletic';
    }

    if (bmi < 30) {
        return 'Regular';
    }

    return 'Heavy';
}

private calculateColorMatch(
    outfit: any,
    favoriteColorId: string,
): boolean {
    return outfit.outfitItems.some(
        (item) =>
        item.fashionItem.colorId ===
        favoriteColorId,
    );
}

// 3. CORE PUBLIC METHODS
async generate(userId: string) {
        const profile =
        await this.profilesService.findMyProfile(
            userId,
        );

        if (!profile) {
        throw new BadRequestException(
            'Profile not found',
        );
        }

        const outfits =
        await this.prisma.outfit.findMany({
            where: {
            isActive: true,
            },

            include: {
            style: true,
            occasion: true,
            bodyType: true,

            outfitItems: {
                include: {
                fashionItem: true,
                },
            },
            },
        });

        if (!outfits.length) {
        throw new BadRequestException(
            'No outfits available',
        );
        }

        const bmi =
        this.calculateBMI(
            profile.height,
            profile.weight,
        );

        const userBodyType =
        this.classifyBodyType(bmi);

        const scoredOutfits =
        outfits.map((outfit) => {
            let score = 0;

            const reasons: string[] = [];

            if (
            outfit.gender === profile.gender
            ) {
            score += 25;

            reasons.push(
                'Gender match',
            );
            }

            if (
            outfit.styleId ===
            profile.preferredStyleId
            ) {
            score += 30;

            reasons.push(
                'Style match',
            );
            }

            if (
            outfit.budgetRange ===
            profile.budgetRange
            ) {
            score += 15;

            reasons.push(
                'Budget match',
            );
            }

            if (
            outfit.bodyType.name ===
            userBodyType
            ) {
            score += 20;

            reasons.push(
                'Body type match',
            );
            }

            const colorMatch =
            this.calculateColorMatch(
                outfit,
                profile.favoriteColorId,
            );

            if (colorMatch) {
            score += 10;

            reasons.push(
                'Favorite color match',
            );
            }

            return {
            outfit,
            score,
            reasons,
            };
        });

        scoredOutfits.sort(
        (a, b) =>
            b.score - a.score,
        );

        const topOutfits =
        scoredOutfits.slice(0, 3);

        const recommendationSummary =
        {
            bmi,
            bodyType:
            userBodyType,
        };

        const recommendation =
        await this.prisma.recommendation.create({
            data: {
            userId,

            bmi,

            bodyType: userBodyType,

            items: {
                create: topOutfits.map(
                (item) => ({
                    outfitId: item.outfit.id,
                    score: item.score,
                    reasons: item.reasons,
                }),
                ),
            },
            },

            include: {
            items: {
                include: {
                outfit: true,
                },
            },
            },
        });

        return {
            recommendation,

            profileAnalysis: {
                bmi,
                bodyType:
                userBodyType,
            },

            recommendations:
                topOutfits.map(
                (item) => ({
                    outfitId:
                    item.outfit.id,

                    outfitName:
                    item.outfit.name,

                    score:
                    item.score,

                    reasons:
                    item.reasons,
                }),
                ),
        };
    }

    async findMyRecommendations(
    userId: string,
    ) {
    return this.prisma.recommendation.findMany({
        where: {
        userId,
        },

        include: {
        items: {
            include: {
            outfit: {
                include: {
                style: true,
                occasion: true,
                bodyType: true,
                },
            },
            },
        },
        },

        orderBy: {
        createdAt: 'desc',
        },
    });
    }
}