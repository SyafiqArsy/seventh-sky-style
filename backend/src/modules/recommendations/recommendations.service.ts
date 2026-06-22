import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { ProfilesService } from '../profiles/profiles.service';
import { GenerateRecommendationDto } from './dto/generate-recommendation.dto';
import { AiService } from '../ai/ai.service';

@Injectable()
export class RecommendationsService {
  // 1. CONSTRUCTOR HANYA UNTUK INJEKSI SERVICE
  constructor(
    private readonly prisma: PrismaService,
    private readonly profilesService: ProfilesService,
    private readonly aiService: AiService,
  ) {}

  private calculateColorMatch(
    outfit: any,
    favoriteColorId: string,
  ): boolean {
    return outfit.outfitItems.some(
      (item) => item.fashionItem.colorId === favoriteColorId,
    );
  }

  private getFeedbackScore(
    feedback: string,
  ): number {
    switch (feedback) {
      case 'LIKE':
        return 15;

      case 'DISLIKE':
        return -20;

      default:
        return 0;
    }
  }

  // 3. CORE PUBLIC METHODS
  async generate(userId: string, dto: GenerateRecommendationDto) {
    const profile = await this.profilesService.findMyProfile(userId);

    // SOLUSI TS18047: Proteksi guard clause jika profile null
    if (!profile) {
      throw new BadRequestException(
        'Profile not found. Please complete your profile preferences first.',
      );
    }

    const userFeedbacks = await this.prisma.recommendationFeedback.findMany({
      where: {
        userId,
      },
      include: {
        recommendationItem: {
          include: {
            outfit: true,
          },
        },
      },
    });

    let selectedOccasion: Awaited<
      ReturnType<typeof this.prisma.occasion.findUnique>
    > = null;

    if (dto.occasionId) {
      selectedOccasion = await this.prisma.occasion.findUnique({
        where: {
          id: dto.occasionId,
        },
      });

      if (!selectedOccasion) {
        throw new BadRequestException(
          'Occasion not found',
        );
      }
    }

    const outfits = await this.prisma.outfit.findMany({
      where: {
        isActive: true,
        gender: profile.gender,
        ...(dto.occasionId && {
          occasionId: dto.occasionId,
        }),
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

    const profileAnalysis = await this.aiService.analyzeProfile(
      profile.height,
      profile.weight,
    );

    const bmi = profileAnalysis.bmi;
    const userBodyType = profileAnalysis.bodyType;

    const scoredOutfits = outfits.map((outfit) => {
      let score = 0;
      const reasons: string[] = [];

      if (outfit.gender === profile.gender) {
        score += 20;
        reasons.push('Gender match');
      }

      if (outfit.styleId === profile.preferredStyleId) {
        score += 25;
        reasons.push('Style match');
      }

      if (outfit.budgetRange === profile.budgetRange) {
        score += 10;
        reasons.push('Budget match');
      }

      if (outfit.bodyType.name === userBodyType) {
        score += 15;
        reasons.push('Body type match');
      }

      const colorMatch = this.calculateColorMatch(
        outfit,
        profile.favoriteColorId,
      );

      if (colorMatch) {
        score += 10;
        reasons.push('Favorite color match');
      }

      const outfitFeedbacks = userFeedbacks.filter(
        (feedback) => feedback.recommendationItem.outfitId === outfit.id,
      );

      for (const feedback of outfitFeedbacks) {
        const feedbackScore = this.getFeedbackScore(feedback.feedback);
        score += feedbackScore;

        if (feedback.feedback === 'LIKE') {
          reasons.push('Positive feedback history');
        } else if (feedback.feedback === 'DISLIKE') {
          reasons.push('Negative feedback history');
        }
      }

      return {
        outfit,
        score,
        reasons,
      };
    });

    scoredOutfits.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.outfit.outfitItems.length - a.outfit.outfitItems.length;
    });

    const topOutfits = scoredOutfits.slice(0, 3);

    const recommendation = await this.prisma.recommendation.create({
      data: {
        userId,
        bmi,
        bodyType: userBodyType,
        items: {
          create: topOutfits.map((item) => ({
            outfitId: item.outfit.id,
            score: item.score,
            reasons: item.reasons,
          })),
        },
      },
      include: {
        items: {
          include: {
            outfit: {
              include: {
                outfitItems: {
                  include: {
                    fashionItem: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // FIX: HANYA ADA SATU LOOP TUNGGAL UNTUK GENERATE AI DAN UPSERT DATABASE
    for (const [index, item] of recommendation.items.entries()) {
      const outfitItems = item.outfit.outfitItems.map(
        (outfitItem) => outfitItem.fashionItem.name,
      );

      const modelPrompt = `
    Gender: ${profile.gender}
    Age: ${profile.age}
    Height: ${profile.height}
    Weight: ${profile.weight}
    Body Type: ${userBodyType}
    Skin Tone: ${profile.skinTone}
    Preferred Style: ${profile.preferredStyle?.name}
    Favorite Color: ${profile.favoriteColor?.name}
    `;

      const outfitPrompt = `
    Outfit Name: ${item.outfit.name}

    Items:
    ${outfitItems.join(', ')}
    `;

      const fashionAdvice = await this.aiService.generateFashionAdvice({
        gender: profile.gender,
        age: profile.age,
        height: profile.height,
        weight: profile.weight,
        bodyType: userBodyType,
        skinTone: profile.skinTone,
        preferredStyle: profile.preferredStyle?.name,
        favoriteColor: profile.favoriteColor?.name,
        outfitName: item.outfit.name,
        outfitItems,
      });

      const promptResult = await this.aiService.generatePrompt({
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
        bodyType: userBodyType,
        skinTone: profile.skinTone,
        preferredStyle: profile.preferredStyle?.name,
        favoriteColor: profile.favoriteColor?.name,
        outfitName: item.outfit.name,
        outfitItems,
      });

      let imageUrl: string | null = null;

      if (index === 0) {
        if (!promptResult?.prompt) {
          console.log(
            "Prompt generation failed",
          );
        } else {
          try {
            const imageResult =
              await this.aiService.generateImage(
                promptResult.prompt,
              );

            imageUrl =
              imageResult?.imageUrl ??
              null;

            console.log(
              "Image generated:",
              imageUrl,
            );
          } catch (error) {
            console.error(
              "Image generation failed",
              error,
            );

            imageUrl = null;
          }
        }
      }

      await this.prisma.recommendationAiResult.upsert({
        where: {
          recommendationItemId: item.id,
        },
        update: {
          advice: fashionAdvice.advice,
          explanation: fashionAdvice.explanation,
          imageUrl,
          modelPrompt,
          outfitPrompt,
          finalPrompt: promptResult.prompt,
        },
        create: {
          recommendationItemId: item.id,
          advice: fashionAdvice.advice,
          explanation: fashionAdvice.explanation,
          imageUrl,
          modelPrompt,
          outfitPrompt,
          finalPrompt: promptResult.prompt,
        },
      });
    }

    return {
      recommendation,
      profileAnalysis: {
        bmi,
        bodyType: userBodyType,
      },
      selectedOccasion: selectedOccasion
        ? {
            id: selectedOccasion.id,
            name: selectedOccasion.name,
          }
        : null,
      recommendations: topOutfits.map((item) => ({
        outfitId: item.outfit.id,
        outfitName: item.outfit.name,
        score: item.score,
        reasons: item.reasons,
      })),
    };
  }

  async findMyRecommendations(userId: string) {
    const recommendations = await this.prisma.recommendation.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            aiResult: true,
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

    return recommendations.map((recommendation) => ({
      recommendationId: recommendation.id,
      generatedAt: recommendation.generatedAt,
      bmi: recommendation.bmi,
      bodyType: recommendation.bodyType,
      items: recommendation.items.map((item) => ({
        recommendationItemId: item.id,
        outfitId: item.outfit.id,
        outfitName: item.outfit.name,
        score: item.score,
        reasons: item.reasons,
        style: item.outfit.style.name,
        occasion: item.outfit.occasion.name,
        bodyType: item.outfit.bodyType.name,
        aiResult: item.aiResult,
      })),
    }));
  }

  async findOne(recommendationId: string, userId: string) {
    const recommendation = await this.prisma.recommendation.findFirst({
      where: {
        id: recommendationId,
        userId,
      },
      include: {
        items: {
          include: {
            aiResult: true,
            outfit: {
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
            },
          },
        },
      },
    });

    if (!recommendation) {
      throw new NotFoundException('Recommendation not found');
    }

    return recommendation;
  }

    async findLatest(userId: string) {
    const recommendation =
        await this.prisma.recommendation.findFirst({
        where: {
            userId,
        },

        orderBy: {
            createdAt: 'desc',
        },

        include: {
            items: {
            include: {
                aiResult: true,

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
        });

    return recommendation;
    }

    async findHistory(userId: string) {
    const recommendations =
        await this.prisma.recommendation.findMany({
        where: {
            userId,
        },

        orderBy: {
            createdAt: 'desc',
        },

        select: {
            id: true,
            generatedAt: true,
            bmi: true,
            bodyType: true,

            items: {
            select: {
                id: true,

                outfit: {
                select: {
                    name: true,
                },
                },

                aiResult: {
                select: {
                    imageUrl: true,
                },
                },
            },
            },
        },
        });

    return recommendations;
    }
}