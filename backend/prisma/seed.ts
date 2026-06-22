import { PrismaClient, Gender, BudgetRange, OutfitItemRole, SkinTone } from '@prisma/client';

import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // ==================== MASTER DATA ====================
  
  // 1. Styles
  const styles = [
    'Streetwear',
    'Casual',
    'Minimalist',
    'Smart Casual',
    'Formal',
    'Business Casual',
    'Vintage',
    'Sporty',
    'Korean',
  ];

  for (const style of styles) {
    await prisma.style.upsert({
      where: { name: style },
      update: {},
      create: { name: style, description: `${style} style clothing` },
    });
  }

  // 2. Colors
  const colors = [
    { name: 'Black', hexCode: '#000000' },
    { name: 'White', hexCode: '#FFFFFF' },
    { name: 'Grey', hexCode: '#808080' },
    { name: 'Navy', hexCode: '#000080' },
    { name: 'Blue', hexCode: '#0000FF' },
    { name: 'Brown', hexCode: '#8B4513' },
    { name: 'Beige', hexCode: '#F5F5DC' },
    { name: 'Green', hexCode: '#008000' },
    { name: 'Red', hexCode: '#FF0000' },
    { name: 'Yellow', hexCode: '#FFFF00' },
  ];

  for (const color of colors) {
    await prisma.color.upsert({
      where: { name: color.name },
      update: {},
      create: color,
    });
  }

  // 3. Categories
  const categories = [
    'T-Shirt',
    'Polo',
    'Shirt',
    'Hoodie',
    'Sweater',
    'Jacket',
    'Cargo Pants',
    'Chinos',
    'Jeans',
    'Shorts',
    'Sneakers',
    'Loafers',
    'Boots',
    'Accessories',
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: { name: category },
    });
  }

  // 4. Occasions
  const occasions = [
    'Daily',
    'Campus',
    'Hangout',
    'Date',
    'Work',
    'Party',
    'Wedding',
    'Travel',
  ];

  for (const occasion of occasions) {
    await prisma.occasion.upsert({
      where: { name: occasion },
      update: {},
      create: { name: occasion, description: `${occasion} outfit` },
    });
  }

  // 5. Body Types
  const bodyTypes = ['Slim', 'Athletic', 'Regular', 'Heavy'];

  for (const bodyType of bodyTypes) {
    await prisma.bodyType.upsert({
      where: { name: bodyType },
      update: {},
      create: { name: bodyType, description: `${bodyType} body type` },
    });
  }

  // ==================== FETCH REFERENCES ====================

  const styleRefs = {
    streetwear: await prisma.style.findUnique({ where: { name: 'Streetwear' } }),
    casual: await prisma.style.findUnique({ where: { name: 'Casual' } }),
    minimalist: await prisma.style.findUnique({ where: { name: 'Minimalist' } }),
    smartCasual: await prisma.style.findUnique({ where: { name: 'Smart Casual' } }),
    formal: await prisma.style.findUnique({ where: { name: 'Formal' } }),
    businessCasual: await prisma.style.findUnique({ where: { name: 'Business Casual' } }),
    vintage: await prisma.style.findUnique({ where: { name: 'Vintage' } }),
    sporty: await prisma.style.findUnique({ where: { name: 'Sporty' } }),
    korean: await prisma.style.findUnique({ where: { name: 'Korean' } }),
  };

  const colorRefs = {
    black: await prisma.color.findUnique({ where: { name: 'Black' } }),
    white: await prisma.color.findUnique({ where: { name: 'White' } }),
    grey: await prisma.color.findUnique({ where: { name: 'Grey' } }),
    navy: await prisma.color.findUnique({ where: { name: 'Navy' } }),
    blue: await prisma.color.findUnique({ where: { name: 'Blue' } }),
    brown: await prisma.color.findUnique({ where: { name: 'Brown' } }),
    beige: await prisma.color.findUnique({ where: { name: 'Beige' } }),
    green: await prisma.color.findUnique({ where: { name: 'Green' } }),
    red: await prisma.color.findUnique({ where: { name: 'Red' } }),
    yellow: await prisma.color.findUnique({ where: { name: 'Yellow' } }),
  };

  const categoryRefs = {
    tshirt: await prisma.category.findUnique({ where: { name: 'T-Shirt' } }),
    polo: await prisma.category.findUnique({ where: { name: 'Polo' } }),
    shirt: await prisma.category.findUnique({ where: { name: 'Shirt' } }),
    hoodie: await prisma.category.findUnique({ where: { name: 'Hoodie' } }),
    sweater: await prisma.category.findUnique({ where: { name: 'Sweater' } }),
    jacket: await prisma.category.findUnique({ where: { name: 'Jacket' } }),
    cargo: await prisma.category.findUnique({ where: { name: 'Cargo Pants' } }),
    chinos: await prisma.category.findUnique({ where: { name: 'Chinos' } }),
    jeans: await prisma.category.findUnique({ where: { name: 'Jeans' } }),
    shorts: await prisma.category.findUnique({ where: { name: 'Shorts' } }),
    sneakers: await prisma.category.findUnique({ where: { name: 'Sneakers' } }),
    loafers: await prisma.category.findUnique({ where: { name: 'Loafers' } }),
    boots: await prisma.category.findUnique({ where: { name: 'Boots' } }),
  };

  const occasionRefs = {
    daily: await prisma.occasion.findUnique({ where: { name: 'Daily' } }),
    campus: await prisma.occasion.findUnique({ where: { name: 'Campus' } }),
    hangout: await prisma.occasion.findUnique({ where: { name: 'Hangout' } }),
    date: await prisma.occasion.findUnique({ where: { name: 'Date' } }),
    work: await prisma.occasion.findUnique({ where: { name: 'Work' } }),
    party: await prisma.occasion.findUnique({ where: { name: 'Party' } }),
    wedding: await prisma.occasion.findUnique({ where: { name: 'Wedding' } }),
    travel: await prisma.occasion.findUnique({ where: { name: 'Travel' } }),
  };

  const bodyTypeRefs = {
    slim: await prisma.bodyType.findUnique({ where: { name: 'Slim' } }),
    athletic: await prisma.bodyType.findUnique({ where: { name: 'Athletic' } }),
    regular: await prisma.bodyType.findUnique({ where: { name: 'Regular' } }),
    heavy: await prisma.bodyType.findUnique({ where: { name: 'Heavy' } }),
  };

  // ==================== FASHION ITEMS ====================

  const createFashionItem = async (data: {
    name: string;
    slug: string;
    gender: Gender;
    price: number;
    categoryId: string;
    styleId: string;
    colorId: string;
    imageUrl?: string;
  }) => {
    return await prisma.fashionItem.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    });
  };

  // --- MALE ITEMS ---
  const whiteTShirt = await createFashionItem({
    name: 'White T-Shirt', slug: 'white-t-shirt', gender: Gender.MALE, price: 149000,
    categoryId: categoryRefs.tshirt!.id, styleId: styleRefs.casual!.id, colorId: colorRefs.white!.id,
  });

  const blackOversizedHoodie = await createFashionItem({
    name: 'Black Oversized Hoodie', slug: 'black-oversized-hoodie', gender: Gender.MALE, price: 349000,
    categoryId: categoryRefs.hoodie!.id, styleId: styleRefs.streetwear!.id, colorId: colorRefs.black!.id,
  });

  const navyPolo = await createFashionItem({
    name: 'Navy Polo Shirt', slug: 'navy-polo', gender: Gender.MALE, price: 189000,
    categoryId: categoryRefs.polo!.id, styleId: styleRefs.smartCasual!.id, colorId: colorRefs.navy!.id,
  });

  const greySweater = await createFashionItem({
    name: 'Grey Sweater', slug: 'grey-sweater', gender: Gender.MALE, price: 299000,
    categoryId: categoryRefs.sweater!.id, styleId: styleRefs.minimalist!.id, colorId: colorRefs.grey!.id,
  });

  const whiteFormalShirt = await createFashionItem({
    name: 'White Formal Shirt', slug: 'white-formal-shirt', gender: Gender.MALE, price: 259000,
    categoryId: categoryRefs.shirt!.id, styleId: styleRefs.formal!.id, colorId: colorRefs.white!.id,
  });

  const batikShirt = await createFashionItem({
    name: 'Batik Long Sleeve', slug: 'batik-shirt', gender: Gender.MALE, price: 350000,
    categoryId: categoryRefs.shirt!.id, styleId: styleRefs.formal!.id, colorId: colorRefs.brown!.id,
  });

  const blackSuitJacket = await createFashionItem({
    name: 'Black Suit Jacket', slug: 'black-suit-jacket', gender: Gender.MALE, price: 799000,
    categoryId: categoryRefs.jacket!.id, styleId: styleRefs.formal!.id, colorId: colorRefs.black!.id,
  });

  const denimJacket = await createFashionItem({
    name: 'Denim Jacket Blue', slug: 'denim-jacket-blue', gender: Gender.MALE, price: 399000,
    categoryId: categoryRefs.jacket!.id, styleId: styleRefs.vintage!.id, colorId: colorRefs.blue!.id,
  });

  const windbreakerJacket = await createFashionItem({
    name: 'Windbreaker Jacket Green', slug: 'windbreaker-green', gender: Gender.MALE, price: 429000,
    categoryId: categoryRefs.jacket!.id, styleId: styleRefs.sporty!.id, colorId: colorRefs.green!.id,
  });

  // BOTTOMs (MALE)
  const beigeChinos = await createFashionItem({
    name: 'Beige Chinos', slug: 'beige-chinos', gender: Gender.MALE, price: 299000,
    categoryId: categoryRefs.chinos!.id, styleId: styleRefs.smartCasual!.id, colorId: colorRefs.beige!.id,
  });

  const blueJeans = await createFashionItem({
    name: 'Blue Jeans', slug: 'blue-jeans', gender: Gender.MALE, price: 349000,
    categoryId: categoryRefs.jeans!.id, styleId: styleRefs.casual!.id, colorId: colorRefs.blue!.id,
  });

  const blackCargo = await createFashionItem({
    name: 'Black Cargo Pants', slug: 'black-cargo', gender: Gender.MALE, price: 279000,
    categoryId: categoryRefs.cargo!.id, styleId: styleRefs.streetwear!.id, colorId: colorRefs.black!.id,
  });

  const navyFormalPants = await createFashionItem({
    name: 'Navy Formal Pants', slug: 'navy-formal-pants', gender: Gender.MALE, price: 379000,
    categoryId: categoryRefs.chinos!.id, styleId: styleRefs.formal!.id, colorId: colorRefs.navy!.id,
  });

  const blackSweatpants = await createFashionItem({
    name: 'Black Sweatpants', slug: 'black-sweatpants', gender: Gender.MALE, price: 249000,
    categoryId: categoryRefs.cargo!.id, styleId: styleRefs.sporty!.id, colorId: colorRefs.black!.id,
  });

  // FOOTWEAR (MALE)
  const whiteSneakers = await createFashionItem({
    name: 'White Sneakers', slug: 'white-sneakers', gender: Gender.MALE, price: 459000,
    categoryId: categoryRefs.sneakers!.id, styleId: styleRefs.casual!.id, colorId: colorRefs.white!.id,
  });

  const blackSneakers = await createFashionItem({
    name: 'Black Sneakers', slug: 'black-sneakers', gender: Gender.MALE, price: 499000,
    categoryId: categoryRefs.sneakers!.id, styleId: styleRefs.streetwear!.id, colorId: colorRefs.black!.id,
  });

  const brownLoafers = await createFashionItem({
    name: 'Brown Loafers', slug: 'brown-loafers', gender: Gender.MALE, price: 599000,
    categoryId: categoryRefs.loafers!.id, styleId: styleRefs.smartCasual!.id, colorId: colorRefs.brown!.id,
  });

  const blackOxfordShoes = await createFashionItem({
    name: 'Black Oxford Shoes', slug: 'black-oxford', gender: Gender.MALE, price: 749000,
    categoryId: categoryRefs.loafers!.id, styleId: styleRefs.formal!.id, colorId: colorRefs.black!.id,
  });


  // --- FEMALE ITEMS ---
  const whiteBlouse = await createFashionItem({
    name: 'White Blouse', slug: 'white-blouse', gender: Gender.FEMALE, price: 179000,
    categoryId: categoryRefs.shirt!.id, styleId: styleRefs.smartCasual!.id, colorId: colorRefs.white!.id,
  });

  const blackDress = await createFashionItem({
    name: 'Black Midi Dress', slug: 'black-midi-dress', gender: Gender.FEMALE, price: 429000,
    categoryId: categoryRefs.shirt!.id, styleId: styleRefs.minimalist!.id, colorId: colorRefs.black!.id,
  });

  const floralPartyDress = await createFashionItem({
    name: 'Floral Party Dress', slug: 'floral-party-dress', gender: Gender.FEMALE, price: 689000,
    categoryId: categoryRefs.shirt!.id, styleId: styleRefs.vintage!.id, colorId: colorRefs.red!.id,
  });

  const oversizedOatmealSweater = await createFashionItem({
    name: 'Oatmeal Oversized Sweater', slug: 'oatmeal-sweater', gender: Gender.FEMALE, price: 299000,
    categoryId: categoryRefs.sweater!.id, styleId: styleRefs.korean!.id, colorId: colorRefs.beige!.id,
  });

  const femaleCropTee = await createFashionItem({
    name: 'Grey Crop Tee', slug: 'grey-crop-tee', gender: Gender.FEMALE, price: 119000,
    categoryId: categoryRefs.tshirt!.id, styleId: styleRefs.streetwear!.id, colorId: colorRefs.grey!.id,
  });

  const beigeSkirt = await createFashionItem({
    name: 'Beige A-Line Skirt', slug: 'beige-skirt', gender: Gender.FEMALE, price: 249000,
    categoryId: categoryRefs.shorts!.id, styleId: styleRefs.casual!.id, colorId: colorRefs.beige!.id,
  });

  const highWaistJeans = await createFashionItem({
    name: 'High Waist Light Jeans', slug: 'high-waist-jeans', gender: Gender.FEMALE, price: 329000,
    categoryId: categoryRefs.jeans!.id, styleId: styleRefs.minimalist!.id, colorId: colorRefs.blue!.id,
  });

  const pinkSneakers = await createFashionItem({
    name: 'Pink Sneakers', slug: 'pink-sneakers', gender: Gender.FEMALE, price: 459000,
    categoryId: categoryRefs.sneakers!.id, styleId: styleRefs.sporty!.id, colorId: colorRefs.red!.id,
  });

  const blackHeels = await createFashionItem({
    name: 'Black Block Heels', slug: 'black-block-heels', gender: Gender.FEMALE, price: 399000,
    categoryId: categoryRefs.loafers!.id, styleId: styleRefs.formal!.id, colorId: colorRefs.black!.id,
  });


  // ==================== OUTFITS ====================

  const createOutfitWithItems = async (data: {
    name: string;
    slug: string;
    gender: Gender;
    budgetRange: BudgetRange;
    styleId: string;
    occasionId: string;
    bodyTypeId: string;
    imageUrl?: string;
    items: { role: OutfitItemRole; fashionItemId: string }[];
  }) => {
    const outfit = await prisma.outfit.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        name: data.name,
        slug: data.slug,
        gender: data.gender,
        budgetRange: data.budgetRange,
        styleId: data.styleId,
        occasionId: data.occasionId,
        bodyTypeId: data.bodyTypeId,
        imageUrl: data.imageUrl || 'https://example.com/default-outfit.jpg',
        isActive: true,
      },
    });

    for (const item of data.items) {
      await prisma.outfitItem.upsert({
        where: {
          outfitId_role: { outfitId: outfit.id, role: item.role },
        },
        update: {},
        create: {
          outfitId: outfit.id,
          fashionItemId: item.fashionItemId,
          role: item.role,
        },
      });
    }
    return outfit;
  };

  // --- 1. DAILY (Target: 3) ---
  await createOutfitWithItems({
    name: 'Streetwear Daily', slug: 'streetwear-daily', gender: Gender.MALE, budgetRange: BudgetRange.BETWEEN_250K_500K,
    styleId: styleRefs.streetwear!.id, occasionId: occasionRefs.daily!.id, bodyTypeId: bodyTypeRefs.regular!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: blackOversizedHoodie.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: blueJeans.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: blackSneakers.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Comfy Daily Female', slug: 'comfy-daily-female', gender: Gender.FEMALE, budgetRange: BudgetRange.LESS_THAN_250K,
    styleId: styleRefs.casual!.id, occasionId: occasionRefs.daily!.id, bodyTypeId: bodyTypeRefs.regular!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: femaleCropTee.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: highWaistJeans.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: pinkSneakers.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Minimalist Lazy Day', slug: 'minimalist-lazy-day', gender: Gender.MALE, budgetRange: BudgetRange.BETWEEN_250K_500K,
    styleId: styleRefs.minimalist!.id, occasionId: occasionRefs.daily!.id, bodyTypeId: bodyTypeRefs.slim!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: whiteTShirt.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: blackCargo.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: whiteSneakers.id },
    ],
  });

  // --- 2. CAMPUS (Target: 3) ---
  await createOutfitWithItems({
    name: 'Campus Outfit', slug: 'campus-outfit', gender: Gender.MALE, budgetRange: BudgetRange.LESS_THAN_250K,
    styleId: styleRefs.smartCasual!.id, occasionId: occasionRefs.campus!.id, bodyTypeId: bodyTypeRefs.athletic!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: whiteTShirt.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: beigeChinos.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: whiteSneakers.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Korean Preppy Campus', slug: 'korean-campus-female', gender: Gender.FEMALE, budgetRange: BudgetRange.BETWEEN_500K_1M,
    styleId: styleRefs.korean!.id, occasionId: occasionRefs.campus!.id, bodyTypeId: bodyTypeRefs.slim!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: oversizedOatmealSweater.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: beigeSkirt.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: pinkSneakers.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Smart Casual Scholar', slug: 'smart-casual-scholar', gender: Gender.MALE, budgetRange: BudgetRange.BETWEEN_500K_1M,
    styleId: styleRefs.smartCasual!.id, occasionId: occasionRefs.campus!.id, bodyTypeId: bodyTypeRefs.regular!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: navyPolo.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: blueJeans.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: whiteSneakers.id },
    ],
  });

  // --- 3. HANGOUT (Target: 3) ---
  await createOutfitWithItems({
    name: 'Casual Weekend', slug: 'casual-weekend', gender: Gender.MALE, budgetRange: BudgetRange.LESS_THAN_250K,
    styleId: styleRefs.casual!.id, occasionId: occasionRefs.hangout!.id, bodyTypeId: bodyTypeRefs.regular!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: whiteTShirt.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: blueJeans.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: whiteSneakers.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Streetwear Vibes', slug: 'streetwear-vibes', gender: Gender.MALE, budgetRange: BudgetRange.BETWEEN_250K_500K,
    styleId: styleRefs.streetwear!.id, occasionId: occasionRefs.hangout!.id, bodyTypeId: bodyTypeRefs.regular!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: blackOversizedHoodie.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: blackCargo.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: blackSneakers.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Vintage Denim Hangout', slug: 'vintage-denim-hangout', gender: Gender.MALE, budgetRange: BudgetRange.BETWEEN_500K_1M,
    styleId: styleRefs.vintage!.id, occasionId: occasionRefs.hangout!.id, bodyTypeId: bodyTypeRefs.heavy!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: denimJacket.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: blueJeans.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: blackSneakers.id },
    ],
  });

  // --- 4. DATE (Target: 3) ---
  await createOutfitWithItems({
    name: 'Date Night', slug: 'date-night', gender: Gender.MALE, budgetRange: BudgetRange.BETWEEN_500K_1M,
    styleId: styleRefs.minimalist!.id, occasionId: occasionRefs.date!.id, bodyTypeId: bodyTypeRefs.athletic!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: greySweater.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: blackCargo.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: whiteSneakers.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Smart Casual Date', slug: 'smart-casual-date-female', gender: Gender.FEMALE, budgetRange: BudgetRange.BETWEEN_500K_1M,
    styleId: styleRefs.smartCasual!.id, occasionId: occasionRefs.date!.id, bodyTypeId: bodyTypeRefs.slim!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: whiteBlouse.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: beigeSkirt.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: pinkSneakers.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Charming Loafer Date', slug: 'charming-loafer-date', gender: Gender.MALE, budgetRange: BudgetRange.BETWEEN_500K_1M,
    styleId: styleRefs.smartCasual!.id, occasionId: occasionRefs.date!.id, bodyTypeId: bodyTypeRefs.slim!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: navyPolo.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: beigeChinos.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: brownLoafers.id },
    ],
  });

  // --- 5. WORK (Target: 3) ---
  await createOutfitWithItems({
    name: 'Smart Casual Work', slug: 'smart-casual-work', gender: Gender.MALE, budgetRange: BudgetRange.BETWEEN_500K_1M,
    styleId: styleRefs.smartCasual!.id, occasionId: occasionRefs.work!.id, bodyTypeId: bodyTypeRefs.slim!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: navyPolo.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: navyFormalPants.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: brownLoafers.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Formal Meeting', slug: 'formal-meeting', gender: Gender.MALE, budgetRange: BudgetRange.ABOVE_1M,
    styleId: styleRefs.formal!.id, occasionId: occasionRefs.work!.id, bodyTypeId: bodyTypeRefs.slim!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: whiteFormalShirt.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: navyFormalPants.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: brownLoafers.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Office Chic Female', slug: 'office-chic-female', gender: Gender.FEMALE, budgetRange: BudgetRange.BETWEEN_500K_1M,
    styleId: styleRefs.businessCasual!.id, occasionId: occasionRefs.work!.id, bodyTypeId: bodyTypeRefs.regular!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: whiteBlouse.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: highWaistJeans.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: blackHeels.id },
    ],
  });

  // --- 6. PARTY (Target: 3) ---
  await createOutfitWithItems({
    name: 'Minimalist Chic', slug: 'minimalist-chic', gender: Gender.FEMALE, budgetRange: BudgetRange.BETWEEN_500K_1M,
    styleId: styleRefs.minimalist!.id, occasionId: occasionRefs.party!.id, bodyTypeId: bodyTypeRefs.athletic!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: blackDress.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: beigeSkirt.id }, // Dianggap layering/tambahan penunjang
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: blackHeels.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Night Out Party', slug: 'night-out-party', gender: Gender.MALE, budgetRange: BudgetRange.BETWEEN_500K_1M,
    styleId: styleRefs.streetwear!.id, occasionId: occasionRefs.party!.id, bodyTypeId: bodyTypeRefs.regular!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: blackOversizedHoodie.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: blackCargo.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: blackSneakers.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Vintage Cocktail Party', slug: 'vintage-cocktail-party', gender: Gender.FEMALE, budgetRange: BudgetRange.ABOVE_1M,
    styleId: styleRefs.vintage!.id, occasionId: occasionRefs.party!.id, bodyTypeId: bodyTypeRefs.slim!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: floralPartyDress.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: beigeSkirt.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: blackHeels.id },
    ],
  });

  // --- 7. WEDDING (Target: 3) ---
  await createOutfitWithItems({
    name: 'Groom Elegant Suit', slug: 'groom-elegant-suit', gender: Gender.MALE, budgetRange: BudgetRange.ABOVE_1M,
    styleId: styleRefs.formal!.id, occasionId: occasionRefs.wedding!.id, bodyTypeId: bodyTypeRefs.athletic!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: blackSuitJacket.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: navyFormalPants.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: blackOxfordShoes.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Formal Batik Kondangan', slug: 'formal-batik-kondangan', gender: Gender.MALE, budgetRange: BudgetRange.BETWEEN_500K_1M,
    styleId: styleRefs.formal!.id, occasionId: occasionRefs.wedding!.id, bodyTypeId: bodyTypeRefs.regular!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: batikShirt.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: navyFormalPants.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: brownLoafers.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Elegant Wedding Guest', slug: 'elegant-wedding-guest-female', gender: Gender.FEMALE, budgetRange: BudgetRange.ABOVE_1M,
    styleId: styleRefs.formal!.id, occasionId: occasionRefs.wedding!.id, bodyTypeId: bodyTypeRefs.slim!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: blackDress.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: beigeSkirt.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: blackHeels.id },
    ],
  });

  // --- 8. TRAVEL (Target: 3) ---
  await createOutfitWithItems({
    name: 'Airport Techwear', slug: 'airport-techwear', gender: Gender.MALE, budgetRange: BudgetRange.BETWEEN_500K_1M,
    styleId: styleRefs.streetwear!.id, occasionId: occasionRefs.travel!.id, bodyTypeId: bodyTypeRefs.regular!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: blackOversizedHoodie.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: blackCargo.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: blackSneakers.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Sporty Backpacker', slug: 'sporty-backpacker', gender: Gender.MALE, budgetRange: BudgetRange.BETWEEN_500K_1M,
    styleId: styleRefs.sporty!.id, occasionId: occasionRefs.travel!.id, bodyTypeId: bodyTypeRefs.athletic!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: windbreakerJacket.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: blackSweatpants.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: whiteSneakers.id },
    ],
  });
  await createOutfitWithItems({
    name: 'Wanderlust Cozy Female', slug: 'wanderlust-cozy-female', gender: Gender.FEMALE, budgetRange: BudgetRange.BETWEEN_500K_1M,
    styleId: styleRefs.korean!.id, occasionId: occasionRefs.travel!.id, bodyTypeId: bodyTypeRefs.regular!.id,
    items: [
      { role: OutfitItemRole.TOP, fashionItemId: oversizedOatmealSweater.id },
      { role: OutfitItemRole.BOTTOM, fashionItemId: highWaistJeans.id },
      { role: OutfitItemRole.FOOTWEAR, fashionItemId: pinkSneakers.id },
    ],
  });

  const adminPassword =
    await bcrypt.hash(
      'admin123',
      10,
    );

  await prisma.user.upsert({
    where: {
      email:
        'admin@seventhskystyle.com',
    },

    update: {
      password: adminPassword,
      role: 'ADMIN',
    },

    create: {
      name:
        'Admin SeventhSkyStyle',
      email:
        'admin@seventhskystyle.com',
      password: adminPassword,
      role: 'ADMIN',
      isActive: true,
    },
  });

  // ==================== ADMIN USER ====================
  const adminUser =
    await prisma.user.upsert({
      where: {
        email:
          'admin@seventhskystyle.com',
      },
      update: {},
      create: {
        name:
          'Admin SeventhSkyStyle',
        email:
          'admin@seventhskystyle.com',
        password: adminPassword,
        role: 'ADMIN',
        isActive: true,
      },
    });

  // (Opsional) Jika admin juga membutuhkan data UserProfile
  await prisma.userProfile.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      gender: Gender.MALE,
      age: 25,
      height: 170,
      weight: 65,
      skinTone: SkinTone.MEDIUM,
      favoriteColorId: colorRefs.black!.id,
      preferredStyleId: styleRefs.minimalist!.id,
      budgetRange: BudgetRange.ABOVE_1M,
    },
  });

  // ==================== USERS ====================

  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '$2b$10$hashed_password_here',
      role: 'USER',
      isActive: true,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane.doe@example.com' },
    update: {},
    create: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: '$2b$10$hashed_password_here',
      role: 'USER',
      isActive: true,
    },
  });

  await prisma.userProfile.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      gender: Gender.MALE,
      age: 22,
      height: 175,
      weight: 70,
      skinTone: SkinTone.MEDIUM,
      favoriteColorId: colorRefs.black!.id,
      preferredStyleId: styleRefs.streetwear!.id,
      budgetRange: BudgetRange.BETWEEN_250K_500K,
    },
  });

  await prisma.userProfile.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      gender: Gender.FEMALE,
      age: 21,
      height: 165,
      weight: 55,
      skinTone: SkinTone.FAIR,
      favoriteColorId: colorRefs.beige!.id,
      preferredStyleId: styleRefs.smartCasual!.id,
      budgetRange: BudgetRange.BETWEEN_500K_1M,
    },
  });

  // ==================== RECOMMENDATIONS ====================

  const recommendation1 = await prisma.recommendation.upsert({
    where: { id: 'rec1' },
    update: {},
    create: { id: 'rec1', userId: user1.id },
  });

  const outfitScores1 = [
    { slug: 'campus-outfit', score: 95 },
    { slug: 'streetwear-daily', score: 90 },
    { slug: 'streetwear-vibes', score: 85 },
    { slug: 'casual-weekend', score: 80 },
    { slug: 'date-night', score: 75 },
  ];

  for (const { slug, score } of outfitScores1) {
    const outfit = await prisma.outfit.findUnique({ where: { slug } });
    if (outfit) {
      await prisma.recommendationItem.upsert({
        where: { id: `rec1-${outfit.id}` },
        update: {},
        create: {
          id: `rec1-${outfit.id}`,
          recommendationId: recommendation1.id,
          outfitId: outfit.id,
          score: score,
        },
      });
    }
  }

  const recommendation2 = await prisma.recommendation.upsert({
    where: { id: 'rec2' },
    update: {},
    create: { id: 'rec2', userId: user2.id },
  });

  const outfitScores2 = [
    { slug: 'smart-casual-date-female', score: 98 },
    { slug: 'minimalist-chic', score: 92 },
    { slug: 'campus-outfit', score: 88 },
    { slug: 'streetwear-daily', score: 82 },
    { slug: 'date-night', score: 78 },
  ];

  for (const { slug, score } of outfitScores2) {
    const outfit = await prisma.outfit.findUnique({ where: { slug } });
    if (outfit) {
      await prisma.recommendationItem.upsert({
        where: { id: `rec2-${outfit.id}` },
        update: {},
        create: {
          id: `rec2-${outfit.id}`,
          recommendationId: recommendation2.id,
          outfitId: outfit.id,
          score: score,
        },
      });
    }
  }

  console.log('Seed completed successfully!');
  console.log(`- ${styles.length} styles created`);
  console.log(`- ${colors.length} colors created`);
  console.log(`- ${categories.length} categories created`);
  console.log(`- ${occasions.length} occasions created`);
  console.log(`- ${bodyTypes.length} body types created`);
  console.log(`- ${await prisma.fashionItem.count()} fashion items created`);
  console.log(`- ${await prisma.outfit.count()} outfits created`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });