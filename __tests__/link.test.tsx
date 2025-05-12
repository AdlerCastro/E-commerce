import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Link } from '@/components/atoms/link';

describe('<Link />', () => {
  it('renderiza como <a> por padrão com texto', () => {
    const { getByText } = render(<Link href='/teste'>Clique aqui</Link>);
    const link = getByText('Clique aqui');

    expect(link).toBeInTheDocument();
    expect(link.tagName.toLowerCase()).toBe('a');
    expect(link).toHaveAttribute('href', '/teste');
  });

  it('aplica classes padrão corretamente', () => {
    const { getByText } = render(<Link href='#'>Exemplo</Link>);
    const link = getByText('Exemplo');

    expect(link.className).toMatch(/inline-flex/); // Uma das classes base
  });

  it('permite sobrescrever classes com className', () => {
    const { getByText } = render(
      <Link href='#' className='text-red-500'>
        Personalizado
      </Link>,
    );

    const link = getByText('Personalizado');
    expect(link).toHaveClass('text-red-500');
  });

  it('renderiza usando <Slot> quando asChild é true', () => {
    const { getByText } = render(
      <Link asChild>
        <button>Botão Slot</button>
      </Link>,
    );

    const slot = getByText('Botão Slot');
    expect(slot.tagName.toLowerCase()).toBe('button');
    expect(slot).toHaveAttribute('data-slot', 'a');
  });
});
