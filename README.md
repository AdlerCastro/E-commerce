# 🛒 E-commerce - Single Product

> Estudo prático com foco em Next.js 15, explorando as melhores práticas de desenvolvimento frontend com TDD, Atomic Design e simulações realistas de fetching e checkout.

---

## 📦 Sobre o Projeto

Este projeto é parte do **Treinamento 1 de Next.js**, e simula um e-commerce para um único produto com múltiplas variações. O objetivo é aplicar conceitos modernos de desenvolvimento web com foco em:

- Performance (Turbopack)
- Organização (Atomic Design)
- Testes (TDD com Jest)
- Estilização escalável (TailwindCSS)

---

## 🚀 Funcionalidades

### 🧾 1. Página de Produto (`/product/[slug]`)
- Exibição da imagem principal e galeria.
- Seleção de variações (cor e tamanho).
- Atualização dinâmica de preço e imagem com base na variação.

### 🛍️ 2. Carrinho de Compras
- Adição de variações com quantidade.
- Visualização e manipulação dos itens do carrinho.
- Persistência de dados com `localStorage`.

### 💳 3. Checkout Simulado
- Formulário de dados do cliente com validação.
- Página de resumo do pedido após finalização.

### 🔄 4. Estratégias de Fetching
- Simulação de delay com `Promise`.
- Feedback de sucesso ou erro no carregamento.

---

## ✅ Critérios de Aceitação

- [ ] Rota dinâmica `/product/[slug]` com pelo menos 3 variações distintas.
- [ ] Mudança de variação atualiza preço e imagem.
- [ ] Carrinho persistente e funcional no client-side.
- [ ] Checkout com validações e resumo final de pedido.

---

## 🧰 Tecnologias e Ferramentas

| Stack        | Descrição                          |
|--------------|------------------------------------|
| **Next.js 15**     | Framework React para SSR e SSG   |
| **TypeScript**     | Tipagem estática e segura        |
| **Tailwind CSS**   | Utilitários CSS para estilização |
| **Jest**           | Testes unitários (TDD)           |
| **ESLint + Prettier** | Padrões de código e formatação |

---

## 🧪 Metodologias e Boas Práticas

- **TDD (Test Driven Development)** com `jest`
- **Atomic Design** na composição dos componentes
- **Page-based Architecture** com rotas do Next.js
- **CamelCase** em nomes de arquivos e variáveis
- **Mock de dados realistas** com `Faker.js`

---

## 🗂️ Scripts Importantes

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --check --ignore-path .gitignore .",
  "format:fix": "prettier --write --ignore-path .gitignore .",
  "test": "jest --passWithNoTests",
  "test:watch": "jest --watch --passWithNoTests"
}
```

---

## ⚙️ Requisitos de Ambiente

```json
"engines": {
  "node": ">=18.18.0",
  "pnpm": ">=9.6.0",
  "yarn": "please-use-pnpm",
  "npm": "please-use-pnpm"
}
```

---

## 🧪 Testes

Testes são escritos com `Jest` e seguem o padrão de TDD. Basta rodar:

```bash
pnpm test
# ou em modo observador
pnpm test:watch
```

---

## 💡 Observações

- Dados de produtos são gerados com **Faker.js** para simular uma API.
- Checkout não realiza transações reais, é apenas ilustrativo.
- Projeto ideal para estudos, testes de UI/UX e práticas de desenvolvimento moderno.

---

## 📁 Estrutura de Pastas (simplificada)

```
src/
│
├── components/     # Componentes atômicos e compostos
├── pages/          # Páginas e rotas do Next.js
├── utils/          # Funções auxiliares
├── hooks/          # Hooks customizados
├── styles/         # Estilização global
└── __tests__/      # Testes automatizados
```

---

## 📚 Licença

Este projeto é de uso educacional e livre para estudos.

---