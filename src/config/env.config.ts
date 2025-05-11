import z from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
