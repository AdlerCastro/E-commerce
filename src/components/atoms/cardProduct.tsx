'use client';

import { cn } from '@/lib/utils';
import Image, { StaticImageData } from 'next/image';

export interface CardProductProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  price: number;
  image: string | StaticImageData;
  alt: string;
  featured?: boolean;
}

export default function CardProduct({
  title,
  description,
  price,
  image,
  alt,
  className,
  featured,
  ...props
}: CardProductProps) {
  return (
    <div
      className={cn(
        'relative flex h-52 w-52 flex-col gap-3 rounded-lg md:h-70 md:w-70',
        featured && 'h-72 w-72 md:h-68 md:w-68',
        className,
      )}
      {...props}
    >
      <Image
        src={image}
        alt={alt}
        width={featured ? 400 : 300}
        height={featured ? 400 : 300}
        className='h-full w-full rounded-lg object-cover object-center'
      />
      {featured ? (
        <div className='absolute top-0 z-10 flex h-full w-full flex-col items-start justify-end gap-2 rounded-lg bg-gradient-to-b from-transparent to-black/60 to-85% p-2 text-white'>
          <h2 className='text-base font-bold md:text-lg lg:text-xl'>{title}</h2>
          <p className='line-clamp-1 text-xs md:text-sm lg:text-base'>
            {description}
          </p>
          <span className='text-center text-sm font-semibold md:text-base lg:text-lg'>
            R${price} reais
          </span>
        </div>
      ) : (
        <div className='flex flex-col items-start gap-2 text-white'>
          <h2 className='text-lg font-bold'>{title}</h2>
          <p className='line-clamp-3 text-sm'>{description}</p>
          <span className='text-center text-sm font-semibold md:text-base lg:text-lg'>
            R${price} reais
          </span>
        </div>
      )}
    </div>
  );
}
