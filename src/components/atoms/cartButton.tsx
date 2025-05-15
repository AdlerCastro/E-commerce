import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export interface CartButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

export default function CartButton({
  icon,
  children,
  className,
  ...props
}: CartButtonProps) {
  return (
    <Button className={cn('rounded-sm', className)} {...props}>
      {icon ? <>{icon}</> : <ShoppingCart className='h-5 w-5' />}
      {children}
    </Button>
  );
}
