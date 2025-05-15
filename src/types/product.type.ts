export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  featured: boolean;
  pose: string;
  variations: {
    sizes: string[];
    poses: string[];
  };
};
