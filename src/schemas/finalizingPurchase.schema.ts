import z from 'zod';

export const FinalizePurchaseSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  address: z.string().min(10, {
    message: 'Address must be at least 10 characters long',
  }),
  cartItems: z
    .array(
      z.object({
        productId: z.number(),
        selectedPose: z.string(),
        selectedSize: z.string(),
        quantity: z.number().min(1),
      }),
    )
    .min(1, 'Carrinho não pode estar vazio'),
});

export type FinalizePurchaseType = z.infer<typeof FinalizePurchaseSchema>;
