import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';

export default function CartButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button className='rounded-sm' {...props}>
      <ShoppingCart className='h-5 w-5' />
      {children}
    </Button>
  );
}
