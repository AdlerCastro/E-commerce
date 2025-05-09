import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Example from '@/components/example';

describe('Example', () => {
  it('deve renderizar o botão corretamente', () => {
    render(<Example />);
    expect(screen.getByRole('button')).toHaveTextContent('Olá, Adler!');
  });
});
