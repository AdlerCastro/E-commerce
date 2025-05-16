'use client';

import { useForm } from 'react-hook-form';
import { ButtonRouter } from '../atoms/buttonRouter';
import { Container } from '../atoms/container';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { FormSchemaType, FormSchema } from '@/schemas/form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Toast } from '../atoms/toast';
import { FinalizePurchase } from '@/actions/postPurchase';
import { Button } from '../ui/button';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GetItemsFromCart } from '@/actions/getItemsFromCart';
import { FinalizePurchaseType } from '@/schemas/finalizingPurchase.schema';

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      address: '',
    },
  });

  const cartItems = GetItemsFromCart();

  async function onSubmit(formData: FormSchemaType) {
    setIsLoading(true);
    console.log(formData);

    const values: FinalizePurchaseType = {
      ...formData,
      cartItems: cartItems.map((item) => ({
        productId: item.product.id,
        selectedPose: item.selectedPose,
        selectedSize: item.selectedSize,
        quantity: item.quantity,
      })),
    };

    const response = await FinalizePurchase(values).finally(() => {
      setIsLoading(false);
    });
    if (response.success) {
      Toast({
        description: 'Formulário enviada com sucesso.',
        variant: 'success',
      });
      setIsLoading(false);
    } else {
      Toast({
        description: 'Erro ao enviar formulário.' + response.message,
        variant: 'error',
      });
      setIsLoading(false);
    }
  }

  return (
    <Container className='text-white'>
      <ButtonRouter onClick={() => router.back()} variant='previous' />
      <h1 className='text-3xl font-bold'>Checkout</h1>
      <p className='text-muted-foreground text-lg'>
        Fill in the form below to complete your purchase.
      </p>
      <div className='flex w-full justify-center'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex w-full max-w-131.25 flex-col gap-6'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      id='name'
                      required
                      type='text'
                      {...field}
                      placeholder='Enter your name here'
                      hasError={
                        !!(
                          form.formState.touchedFields.name &&
                          form.formState.errors.name
                        )
                      }
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      required
                      id='email'
                      {...field}
                      type='email'
                      placeholder='Enter your email here'
                      hasError={!!form.formState.errors.email}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input
                      id='address'
                      required
                      type='text'
                      {...field}
                      placeholder='Enter your address here'
                      hasError={
                        !!(
                          form.formState.touchedFields.email &&
                          form.formState.errors.email
                        )
                      }
                      disabled={isLoading}
                      onInvalid={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity(
                          'Please enter a valid address',
                        );
                      }}
                      onInput={(e) => {
                        (e.target as HTMLInputElement).setCustomValidity('');
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='submit'
              disabled={isLoading || !form.formState.isValid}
              variant={'default'}
              className='w-full self-center disabled:cursor-not-allowed disabled:bg-purple-600/40 disabled:text-white/40'
            >
              {isLoading ? (
                <LoaderCircle className='animate-spin' />
              ) : (
                'Enviar formulário'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </Container>
  );
}
