import { faker } from '@faker-js/faker';
import { Product } from '@/types/product.type';

faker.seed(2025); // Garantir repetibilidade nos dados mockados

const availableSizes = ['PP', 'P', 'M', 'G', 'GG'];
const poses = ['relaxado', 'dormindo', 'comendo'];

function generateStableSlug(pose: string, index: number) {
  return `panda-${pose}-${index + 1}`;
}

export function generateMockProducts(count = 20): Product[] {
  return Array.from({ length: count }, (_, index) => {
    const id = index + 1;
    const poseSelected = poses[index % poses.length];
    const slug = generateStableSlug(poseSelected, index);
    const title = `Panda ${id}`;

    return {
      id,
      title,
      slug,
      price: parseFloat(faker.commerce.price({ min: 99.9, max: 599.99 })),
      image: `/assets/pandas/panda-1/${poseSelected}.webp`,
      description: faker.commerce.productDescription(),
      featured: faker.datatype.boolean(),
      pose: poseSelected,
      variations: {
        sizes: [...availableSizes],
        poses: [...poses],
      },
    };
  });
}
