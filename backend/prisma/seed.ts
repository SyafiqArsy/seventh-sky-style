import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
      where: {
        name: style,
      },
      update: {},
      create: {
        name: style,
      },
    });
  }

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
      where: {
        name: color.name,
      },
      update: {},
      create: color,
    });
  }

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
      where: {
        name: category,
      },
      update: {},
      create: {
        name: category,
      },
    });
  }

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
      where: {
        name: occasion,
      },
      update: {},
      create: {
        name: occasion,
      },
    });
  }

  const bodyTypes = [
    'Slim',
    'Athletic',
    'Regular',
    'Heavy',
  ];

  for (const bodyType of bodyTypes) {
    await prisma.bodyType.upsert({
      where: {
        name: bodyType,
      },
      update: {},
      create: {
        name: bodyType,
      },
    });
  }

  console.log('Seed completed');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });