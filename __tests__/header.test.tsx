import { render, screen } from '@testing-library/react';
import Header from '@/components/molecules/header';
import { CartProvider } from '@/contexts/cartContext';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('<Header />', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    localStorage.clear();
  });

  function renderWithProviders() {
    return render(
      <CartProvider>
        <Header />
      </CartProvider>,
    );
  }

  it('deve renderizar os links e o botão do carrinho', () => {
    renderWithProviders();

    expect(
      screen.getByRole('link', {
        name: 'Link para acessar a página principal',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', {
        name: 'Link para acessar a página dos produtos',
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: 'Botão para acessar o carrinho',
      }),
    ).toBeInTheDocument();
  });

  it('deve exibir o valor total do carrinho formatado corretamente', () => {
    renderWithProviders();

    const totalText = screen.getByText((content, node) => {
      const hasText = content.includes('R$') && content.includes('0,00');
      const isSpan = node?.tagName.toLowerCase() === 'span';
      return hasText && isSpan;
    });

    expect(totalText).toBeInTheDocument();
  });

  it('deve redirecionar ao clicar no botão de carrinho', async () => {
    renderWithProviders();
    const user = userEvent.setup();

    const button = screen.getByRole('button', {
      name: 'Botão para acessar o carrinho',
    });

    await user.click(button);

    expect(push).toHaveBeenCalled();
  });
});
