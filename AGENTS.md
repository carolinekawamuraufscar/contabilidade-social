# Diretrizes de Desenvolvimento e Histórico de Preferências

Este arquivo registra decisões importantes de design e guias de publicação definidas pelo usuário para garantir consistência no desenvolvimento.

---

## 🔒 Áreas "Bloqueadas" (Não Alterar)

De acordo com as solicitações da usuária, as seguintes seções do projeto estão consolidadas e **não devem sofrer alterações de layout ou design** (exceto para substituição futura de placeholders ou integração de Tableau quando solicitado):

1. **Lado Direito e Textos da Página Inicial ('Início')**: Os textos, tamanho do "subtexto", posicionamento, fontes dos botões e o link de transição do "Sobre o projeto" estão perfectibilizados e travados.
2. **Página de Mapa Interativo**: O layout e comportamento visual atual estão consolidados e "bloqueados" até o momento de atualizar a imagem placeholder, alterar títulos específicos ou integrar os gráficos do Tableau.

---

## 🚀 Como Exportar e Lançar o Site no GitHub (GitHub Pages)

Caso você me pergunte no futuro ou precise realizar o processo por conta própria, aqui está o passo a passo completo e detalhado para exportar este projeto do AI Studio e publicá-lo de forma gratuita no GitHub:

### Passo 1: Exportar o Projeto do AI Studio
1. No canto superior direito da tela ou no menu de configurações do **Google AI Studio**, clique no botão para exportar/fazer o download do projeto (normalmente como formato **ZIP** ou integração direta com o **GitHub**).
2. Se baixar o arquivo **ZIP**, extraia o conteúdo em uma pasta no seu computador.

### Passo 2: Inicializar o Repositório no GitHub
Se você for fazer o upload manualmente usando o Terminal/Git no seu computador:
1. Crie um repositório vazio no GitHub (ex: `seu-usuario/contabilidade-social`).
2. Abra a pasta do projeto no seu terminal e execute:
   ```bash
   git init
   git add .
   git commit -m "commit inicial do projeto"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/seu-repositorio.git
   git push -u origin main
   ```

### Passo 3: Publicação Rápida com GitHub Pages (Recomendado para Projetos React/Vite)

Para colocar o site no ar de forma totalmente automatizada através do GitHub Actions:

1. No seu repositório no GitHub, acesse a aba **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages**.
3. Na seção dita **Build and deployment** -> **Source**, altere de *Deploy from a branch* para **GitHub Actions**.
4. Agora criaremos um fluxo automatizado. No seu projeto local, crie a seguinte estrutura de pastas: `.github/workflows/`
5. Dentro dessa pasta, crie um arquivo chamado `deploy.yml` com o seguinte conteúdo:

```yaml
name: Deploy static content to Pages

on:
  push:
    branches: ["main"]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Pasta onde o Vite gera o build de produção
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

6. Faça o commit e envie as alterações para o seu repositório do GitHub:
   ```bash
   git add .
   git commit -m "configura deploy automatico github pages"
   git push
   ```
7. O site será compilado e publicado sozinho! O link ficará disponível na aba **Actions** ou direto no topo do painel das configurações de do **GitHub Pages** (geralmente formato `seu-usuario.github.io/nome-do-repositorio`).
