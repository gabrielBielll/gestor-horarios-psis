# Componente `App.jsx`

O `App.jsx` é o componente principal e o container da aplicação Gestor de Horários PSIS. Ele gerencia o estado global, a lógica de busca de dados, a navegação entre as visualizações e a renderização dos componentes principais da interface.

## Responsabilidades

*   **Busca e Gerenciamento de Dados:**
    *   Busca a lista de psicólogas e seus horários da API (`https://lista-psis-api.onrender.com/api/horarios`).
    *   Armazena esses dados no estado (`schedules`).
    *   Fornece funções para recarregar os dados (`fetchSchedules`).
*   **Gerenciamento de Estado da UI:**
    *   Controla qual visualização está ativa (`activeView`): 'dashboard' (perfis individuais), 'totalGrid' (grade geral) ou 'devtools' (ferramentas).
    *   Gerencia a visibilidade dos modais de criação (`isCreateFormVisible`) e edição (`isEditFormVisible`).
    *   Controla o estado de carregamento global (`isLoading`, `isSaving`).
    *   Gerencia a exibição de notificações (`notification`).
    *   Controla a expansão dos cards de horários individuais (`expandedSchedules`).
*   **Lógica de Negócio:**
    *   Manipula a submissão do formulário de criação de psicólogas (`handleCreateSubmit`).
    *   Manipula a submissão do formulário de edição de horários (`handleEditSubmit`).
    *   Prepara os dados para edição (`handleLoadForEdit`).
    *   Permite o envio de requisições customizadas pela `DevToolsView` (`handleSendCustomRequest`).
*   **Renderização:**
    *   Renderiza a estrutura principal da página, incluindo a barra lateral (`<aside>`), o cabeçalho (`<header>`) e o conteúdo principal (`<main>`).
    *   Renderiza condicionalmente os componentes `CreateForm`, `EditForm`, `TotalScheduleView`, `DevToolsView` com base no estado da aplicação.
    *   Exibe `GlobalLoader` durante operações de salvamento e `NotificationToast` para feedback ao usuário.
    *   Lista os perfis individuais das psicólogas no 'dashboard', permitindo visualização e edição de seus horários.

## Estrutura Interna (Estado Principal)

*   `schedules`: Array. Lista de objetos, onde cada objeto representa uma psicóloga e seus horários.
*   `isLoading`: Boolean. Indica se os dados iniciais estão sendo carregados.
*   `apiError`: String | null. Mensagem de erro caso a busca inicial da API falhe.
*   `expandedSchedules`: Array. Lista de IDs das psicólogas cujos detalhes de horário estão expandidos na visualização 'dashboard'.
*   `activeView`: String. Identifica a visualização principal ativa ('dashboard', 'totalGrid', 'devtools').
*   `isCreateFormVisible`: Boolean. Controla a visibilidade do modal de criação.
*   `isEditFormVisible`: Boolean. Controla a visibilidade do modal de edição.
*   `isSaving`: Boolean. Indica se uma operação de salvamento (criação/edição) está em progresso.
*   `notification`: Object (`{ show: Boolean, message: String, type: String }`). Controla a exibição de notificações.
*   `editId`: String. ID da psicóloga sendo editada.
*   `editPassword`: String. Senha para autenticar a edição.
*   `horariosSelecionados`: Object. Horários selecionados no formulário de edição, no formato `{ seg: [], ter: [], ... }`.
*   `createId`: String. ID para a nova psicóloga (formulário de criação).
*   `createName`: String. Nome para a nova psicóloga (formulário de criação).
*   `createPassword`: String. Senha para a nova psicóloga (formulário de criação).

## Constantes Importantes

*   `DIAS_SEMANA`: Array de objetos definindo os dias da semana e suas chaves.
*   `HORAS_TRABALHO`: Array de strings definindo os horários de trabalho padrão.
*   `HORARIOS_INICIAL`: Objeto usado para inicializar ou resetar a seleção de horários.
*   `API_URL`: String. URL base da API.

## Interações com Componentes Filhos

*   **`GlobalLoader`**: Renderizado quando `isSaving` é `true`.
*   **`NotificationToast`**: Renderizado quando `notification.show` é `true`. Recebe `message` e `type` de `notification`, e uma função `onClose` para esconder a notificação.
*   **`CreateForm`**: Renderizado quando `isCreateFormVisible` é `true`. Recebe:
    *   `handleCreateSubmit`: Função para submeter o formulário.
    *   `createId`, `setCreateId`: Valor e setter para o ID.
    *   `createName`, `setCreateName`: Valor e setter para o nome.
    *   `createPassword`, `setCreatePassword`: Valor e setter para a senha.
    *   `onClose`: Função para fechar o modal.
*   **`EditForm`**: Renderizado quando `isEditFormVisible` é `true`. Recebe:
    *   `show`: `isEditFormVisible`.
    *   `handleEditSubmit`: Função para submeter o formulário.
    *   `editId`: ID da psicóloga.
    *   `editPassword`, `setEditPassword`: Valor e setter para a senha.
    *   `horariosSelecionados`: Objeto com os horários.
    *   `handleHorarioChange`: Função para atualizar `horariosSelecionados`.
    *   `onClose`: Função para fechar o modal.
*   **`TotalScheduleView`**: Renderizado quando `activeView` é 'totalGrid'. Recebe `schedules`.
*   **`DevToolsView`**: Renderizado quando `activeView` é 'devtools'. Recebe `schedules`, `onSendRequest` (wrapper de `handleSendCustomRequest`), e `fetchSchedules`.

## Lógica de Exibição e Navegação

A navegação entre 'dashboard', 'totalGrid' e 'devtools' é controlada clicando nos links da barra lateral, que atualizam o estado `activeView`. A exibição dos formulários modais (`CreateForm`, `EditForm`) é controlada pelos estados `isCreateFormVisible` e `isEditFormVisible`, respectivamente.

O 'dashboard' lista as psicólogas e permite expandir para ver seus horários. Botões de "Editar" em cada card abrem o `EditForm` preenchido com os dados da psicóloga selecionada. O botão "Criar Psicóloga" na barra lateral abre o `CreateForm`.
