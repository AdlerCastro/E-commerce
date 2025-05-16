import { FormSchemaType } from '@/schemas/form.schema';

export type FinalizePurchase = FormSchemaType & {
  cartItems: {
    productId: number;
    selectedPose: string;
    selectedSize: string;
    quantity: number;
  }[];
};
