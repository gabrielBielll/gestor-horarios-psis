# Configuração do Projeto

Esta seção detalha como configurar o ambiente de desenvolvimento para o projeto Gestor de Horários PSIS, suas dependências, scripts disponíveis e outras informações relevantes sobre a configuração.

## Tecnologias Principais

*   **React 19:** Biblioteca JavaScript para construir interfaces de usuário.
*   **Vite:** Ferramenta de build e servidor de desenvolvimento rápido para projetos web modernos.
*   **JavaScript (ES Modules):** Linguagem de programação principal.
*   **CSS:** Para estilização (referenciado em `index.css` e `App.css`, embora `App.css` possa estar obsoleto ou seus estilos movidos para `index.css`).

## Pré-requisitos

*   **Node.js e npm (ou yarn/pnpm):** Vite e as dependências do projeto são gerenciadas via npm (ou outro gerenciador de pacotes Node.js). Você pode baixar Node.js em [nodejs.org](https://nodejs.org/).

## Instalação de Dependências

1.  Clone o repositório (se ainda não o fez):
    ```bash
    git clone https://github.com/gabrielBielll/gestor-horarios-psis.git
    cd gestor-horarios-psis
    ```
2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```
    ou se estiver usando yarn:
    ```bash
    yarn install
    ```

## Scripts Disponíveis

Os seguintes scripts estão definidos no arquivo `package.json` e podem ser executados com `npm run <script_name>` (ou `yarn <script_name>`):

*   **`npm run dev`**
    *   Comando: `vite`
    *   Descrição: Inicia o servidor de desenvolvimento Vite. Isso permite o desenvolvimento local com Hot Module Replacement (HMR), o que significa que as alterações no código são refletidas no navegador quase instantaneamente sem a necessidade de recarregar a página inteira. Geralmente, a aplicação estará acessível em `http://localhost:5173` (Vite pode usar outras portas se a 5173 estiver ocupada).

*   **`npm run build`**
    *   Comando: `vite build`
    *   Descrição: Compila e otimiza a aplicação para produção. Os arquivos resultantes são colocados na pasta `dist/` (configuração padrão do Vite). Estes são os arquivos estáticos que seriam implantados em um servidor web.

*   **`npm run lint`**
    *   Comando: `eslint .`
    *   Descrição: Executa o ESLint para analisar o código em busca de problemas de estilo, erros de sintaxe e potenciais bugs, com base nas regras configuradas (ver `eslint.config.js`).

*   **`npm run preview`**
    *   Comando: `vite preview`
    *   Descrição: Inicia um servidor local estático que serve os arquivos da pasta `dist/`. Este comando é útil para testar a build de produção localmente antes de fazer o deploy.

## Estrutura de Arquivos Relevante para Configuração

*   **`package.json`:**
    *   Define o nome do projeto, versão, tipo de módulo (`"type": "module"`).
    *   Lista os `scripts` de desenvolvimento e build.
    *   Lista as `dependencies` (pacotes necessários para a aplicação em produção, como `react`, `react-dom`, `lucide-react`).
    *   Lista as `devDependencies` (pacotes necessários apenas para desenvolvimento, como `@vitejs/plugin-react`, `eslint`, `vite`).
*   **`vite.config.js`:**
    *   Arquivo de configuração do Vite.
    *   Atualmente, ele importa e usa o plugin `@vitejs/plugin-react` para fornecer suporte ao React (como JSX e Fast Refresh).
    *   Pode ser estendido para configurações mais avançadas do Vite (ex: proxies de servidor, aliases de caminho, etc.).
*   **`index.html`:**
    *   O ponto de entrada HTML da aplicação.
    *   Contém um `div` com `id="root"` onde a aplicação React será montada.
    *   Inclui o script principal via `<script type="module" src="/src/main.jsx"></script>`.
*   **`src/main.jsx`:**
    *   O ponto de entrada JavaScript/JSX da aplicação React.
    *   Importa o componente principal `App` e o renderiza dentro do elemento `#root` do `index.html` usando `createRoot` do `react-dom/client`.
    *   Importa o arquivo CSS global `index.css`.
*   **`eslint.config.js`:** (Arquivo não lido diretamente, mas inferido pelo script `lint`)
    *   Configuração do ESLint, definindo as regras de linting para o projeto. Utiliza plugins como `eslint-plugin-react-hooks` e `eslint-plugin-react-refresh`.

## Dependências Principais

*   **`react`, `react-dom`**: Núcleo da biblioteca React para construir a interface do usuário.
*   **`lucide-react`**: Biblioteca de ícones SVG utilizada na interface.

## Dependências de Desenvolvimento

*   **`@vitejs/plugin-react`**: Plugin do Vite para habilitar o suporte ao React.
*   **`vite`**: A ferramenta de build e servidor de desenvolvimento.
*   **`eslint`**: Linter para JavaScript e JSX.
    *   `@eslint/js`: Regras base do ESLint.
    *   `eslint-plugin-react-hooks`: Regras ESLint para hooks do React.
    *   `eslint-plugin-react-refresh`: Regras ESLint para o Fast Refresh do React com Vite.
    *   `globals`: Para definir variáveis globais reconhecidas pelo ESLint.
*   **`@types/react`, `@types/react-dom`**: Tipos TypeScript para React (embora o projeto pareça ser JavaScript, ter tipos pode ajudar em IDEs e é uma boa prática se TypeScript for considerado no futuro).

## Deploy

O processo de deploy não está definido nos scripts, mas tipicamente envolveria:
1.  Executar `npm run build` para gerar os arquivos estáticos na pasta `dist/`.
2.  Copiar o conteúdo da pasta `dist/` para um servidor web estático (como Netlify, Vercel, GitHub Pages, AWS S3, etc.).

A API backend (`https://lista-psis-api.onrender.com`) é uma dependência externa e precisa estar acessível para que a aplicação frontend funcione corretamente após o deploy.
