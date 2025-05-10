import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';

export interface CartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export default function CartButton({
  icon,
  children,
  ...props
}: CartButtonProps) {
  return (
    <Button className='rounded-sm' {...props}>
      {icon ? <>{icon}</> : <ShoppingCart className='h-5 w-5' />}
      {children}
    </Button>
  );
}
