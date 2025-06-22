# Estrutura do Projeto

Este documento descreve a organização dos arquivos e pastas no projeto Gestor de Horários PSIS.

## Visão Geral da Estrutura de Pastas

```
gestor-horarios-psis/
├── docs/                       # Contém toda a documentação do projeto.
│   ├── README.md               # Ponto de entrada da documentação.
│   ├── project_structure.md    # Este arquivo.
│   ├── components/             # Documentação específica dos componentes React.
│   │   ├── README.md           # Visão geral dos componentes.
│   │   ├── App.md              # Documentação do App.jsx.
│   │   ├── CreateForm.md       # ... e assim por diante para outros componentes.
│   │   └── ...
│   ├── data_flow.md            # Explicação do fluxo de dados.
│   ├── business_logic.md       # Descrição da lógica de negócio.
│   ├── project_setup.md        # Guia de configuração do projeto.
│   └── api_guide.md            # Guia de interação com a API.
├── public/                     # Arquivos estáticos servidos diretamente.
│   └── vite.svg                # Exemplo de arquivo estático (ícone do Vite).
├── src/                        # Código fonte da aplicação React.
│   ├── assets/                 # Ativos estáticos como imagens (ex: react.svg).
│   │   └── react.svg
│   ├── components/             # Componentes React reutilizáveis.
│   │   ├── CreateForm.jsx
│   │   ├── DevToolsView.jsx
│   │   ├── EditForm.jsx
│   │   ├── GlobalLoader.jsx
│   │   ├── NotificationToast.jsx
│   │   └── TotalScheduleView.jsx
│   ├── App.css                 # Estilos específicos para App.jsx (pode estar obsoleto ou integrado em index.css).
│   ├── App.jsx                 # Componente principal da aplicação.
│   ├── index.css               # Estilos globais da aplicação.
│   └── main.jsx                # Ponto de entrada da aplicação React.
├── .eslint.config.js           # Configuração do ESLint (novo formato).
├── .gitignore                  # Especifica arquivos e pastas ignorados pelo Git.
├── index.html                  # Ponto de entrada HTML da aplicação.
├── package-lock.json           # Registra as versões exatas das dependências.
├── package.json                # Define metadados do projeto, dependências e scripts.
├── README.md                   # README principal do projeto (geralmente com instruções de setup e visão geral).
└── vite.config.js              # Arquivo de configuração do Vite.
```

## Descrição das Pastas e Arquivos Principais

*   **`docs/`**: Como descrito acima, contém toda a documentação técnica e funcional do projeto, criada para auxiliar no entendimento e manutenção.
*   **`public/`**: Contém ativos estáticos que são copiados para a raiz do diretório de build (`dist/`) sem processamento pelo Vite. Útil para arquivos como `favicon.ico`, `robots.txt`, ou manifestos web.
*   **`src/`**: O coração da aplicação React.
    *   **`src/assets/`**: Usado para armazenar imagens, fontes ou outros ativos que são importados e usados pelos componentes.
    *   **`src/components/`**: Contém os componentes React modulares que formam a interface do usuário. Cada componente geralmente lida com uma parte específica da UI.
    *   **`src/App.jsx`**: O componente de nível superior que organiza a layout principal da aplicação, gerencia o estado global e a lógica de negócios principal.
    *   **`src/main.jsx`**: O script que inicializa a aplicação React, montando o componente `App` no DOM (no elemento com `id="root"` em `index.html`). É aqui que os estilos globais (`index.css`) também são importados.
    *   **`src/index.css`**: Arquivo CSS para estilos globais que afetam toda a aplicação.
    *   **`src/App.css`**: Pode conter estilos específicos para o componente `App.jsx`. No projeto atual, foi mencionado que seus estilos podem ter sido movidos para `index.css`.
*   **`.eslint.config.js`**: Arquivo de configuração para o ESLint, a ferramenta de linting de código JavaScript/JSX. Ele define as regras e plugins para manter a qualidade e consistência do código. (Nota: projetos mais antigos podem usar `.eslintrc.js` ou `.eslintrc.json`).
*   **`.gitignore`**: Lista arquivos e diretórios que o Git não deve rastrear (ex: `node_modules/`, `dist/`, arquivos `.env`).
*   **`index.html`**: O arquivo HTML principal servido ao navegador. Ele contém o elemento raiz onde a aplicação React é renderizada.
*   **`package.json`**: Arquivo fundamental para projetos Node.js. Ele lista as dependências do projeto (bibliotecas externas), scripts de desenvolvimento (como `dev`, `build`, `lint`), e outras informações do projeto.
*   **`package-lock.json`**: Gerado automaticamente pelo `npm install`, registra as versões exatas de todas as dependências instaladas, garantindo instalações consistentes em diferentes ambientes.
*   **`README.md`** (raiz): O arquivo README principal do repositório. Geralmente contém uma visão geral do projeto, instruções básicas de como rodá-lo, e links para mais informações.
*   **`vite.config.js`**: Arquivo de configuração para o Vite, a ferramenta de build e servidor de desenvolvimento usada no projeto.

Esta estrutura é típica para aplicações React modernas construídas com Vite, promovendo uma boa organização e separação de responsabilidades.
