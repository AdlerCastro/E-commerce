import { faker } from '@faker-js/faker';
import { Product } from '@/types/product.type'; // ou '@/types/product.type'

export function generateMockProducts(count = 20): Product[] {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: faker.commerce.productName(),
    slug: faker.helpers.slugify(faker.commerce.productName().toLowerCase()),
    price: parseFloat(faker.commerce.price({ min: 29.99, max: 499.99 })),
    image: faker.image.urlPicsumPhotos(), // você pode trocar por /images/fake-1.jpg etc.
    description: faker.commerce.productDescription(),
    featured: faker.datatype.boolean(),
  }));
}
