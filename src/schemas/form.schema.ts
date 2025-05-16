import z from 'zod';

export const FormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  address: z.string().min(10, {
    message: 'Address must be at least 10 characters long',
  }),
});

export type FormSchemaType = z.infer<typeof FormSchema>;
