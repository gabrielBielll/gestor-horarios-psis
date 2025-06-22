# Fluxo de Dados da Aplicação

Esta seção descreve como os dados fluem através da aplicação Gestor de Horários PSIS, incluindo o gerenciamento de estado no componente principal (`App.jsx`) e a comunicação com a API.

## 1. Estado Principal e Gerenciamento (em `App.jsx`)

O componente `App.jsx` atua como a principal fonte da verdade para a maioria dos dados da aplicação.

*   **`schedules` (Array):**
    *   **Origem:** Buscado da API (`${API_URL}/api/horarios`) na montagem inicial do componente (`useEffect` chamando `fetchSchedules`) e após ações de criação/edição bem-sucedidas.
    *   **Fluxo Descendente (Props):**
        *   Passado para `TotalScheduleView` para exibir a grade geral.
        *   Passado para `DevToolsView` para exibição no visualizador JSON.
        *   Usado internamente no `App.jsx` para renderizar a lista de perfis individuais no painel 'dashboard'.
    *   **Modificação:** Atualizado pela função `setSchedules` após `fetchSchedules` obter novos dados da API.

*   **Estado da UI (Controlado por `App.jsx`):**
    *   `isLoading` (Boolean): Controla a exibição do loader inicial. Modificado por `fetchSchedules`.
    *   `apiError` (String | null): Armazena mensagens de erro da API. Modificado por `fetchSchedules`.
    *   `expandedSchedules` (Array): IDs das psicólogas com horários expandidos. Modificado por `toggleScheduleExpansion`.
    *   `activeView` (String): Controla qual painel principal é exibido ('dashboard', 'totalGrid', 'devtools'). Modificado por cliques nos links da barra lateral.
    *   `isCreateFormVisible` (Boolean): Controla a visibilidade do modal `CreateForm`. Modificado por cliques no botão "Criar Psicóloga" e pela função `closeModal` ou após submissão bem-sucedida.
    *   `isEditFormVisible` (Boolean): Controla a visibilidade do modal `EditForm`. Modificado pela função `handleLoadForEdit` e `closeModal` ou após submissão bem-sucedida.
    *   `isSaving` (Boolean): Controla a visibilidade do `GlobalLoader`. Ativado antes de chamadas de API de escrita (criar/editar) e desativado após a conclusão.
    *   `notification` (Object): Controla o `NotificationToast`. Modificado após operações de API para dar feedback ao usuário.

*   **Dados de Formulários (Gerenciados em `App.jsx`, passados para os formulários):**
    *   **Criação (`CreateForm`):**
        *   `createId`, `createName`, `createPassword`: Estados em `App.jsx`.
        *   **Fluxo:** `App.jsx` -> `CreateForm` (como props `value`).
        *   **Atualização:** `CreateForm` (eventos `onChange`) -> `App.jsx` (via props `setCreateId`, `setCreateName`, `setCreatePassword`).
    *   **Edição (`EditForm`):**
        *   `editId`: Definido em `App.jsx` por `handleLoadForEdit`. Passado como prop para `EditForm`.
        *   `editPassword`: Estado em `App.jsx`. Fluxo similar ao `createPassword`.
        *   `horariosSelecionados`: Estado complexo (objeto) em `App.jsx`.
            *   **Inicialização:** Preenchido por `handleLoadForEdit` com base nos dados da psicóloga.
            *   **Fluxo:** `App.jsx` -> `EditForm` (prop `horariosSelecionados`).
            *   **Atualização:** `EditForm` (checkbox `onChange`) -> `App.jsx` (via prop `handleHorarioChange(diaKey, hora)`).

## 2. Comunicação com a API

A comunicação com a API (`https://lista-psis-api.onrender.com/api/horarios`) é centralizada nas funções dentro de `App.jsx`.

*   **`fetchSchedules` (GET `/api/horarios`):**
    *   Chamada para buscar todos os horários.
    *   Atualiza `schedules`, `isLoading`, `apiError`.

*   **`handleCreateSubmit` (POST `/api/horarios/criar`):**
    *   Envia `createId`, `createName`, `createPassword`.
    *   Se sucesso: chama `fetchSchedules`, esconde `CreateForm`, mostra notificação.
    *   Se erro: mostra alerta/notificação de erro.
    *   Controla `isSaving`.

*   **`handleEditSubmit` (POST `/api/horarios/editar`):**
    *   Envia `editId`, `editPassword`, `horariosSelecionados`.
    *   Se sucesso: chama `fetchSchedules`, esconde `EditForm`, mostra notificação.
    *   Se erro: mostra alerta/notificação de erro.
    *   Controla `isSaving`.

*   **`handleSendCustomRequest` (POST para endpoint customizado):**
    *   Usada por `DevToolsView`.
    *   Envia o `endpoint` e `body` fornecidos.
    *   Se sucesso e a requisição for de escrita (implícito, pois só há POSTs), chama `fetchSchedules`.
    *   Retorna a resposta para `DevToolsView` para exibição.
    *   Controla `isSaving`.

## 3. Fluxo de Dados nos Componentes de UI Menores

*   **`GlobalLoader`:** Recebe `message` (opcional) de `App.jsx`. Sua visibilidade é controlada por `isSaving` em `App.jsx`.
*   **`NotificationToast`:** Recebe `message`, `type`, e `onClose` de `App.jsx`. Sua visibilidade é controlada por `notification.show` em `App.jsx`.
*   **`CreateForm`:**
    *   **Recebe:** `createId`, `createName`, `createPassword` (valores) e `setCreateId`, `setCreateName`, `setCreatePassword` (setters), `handleCreateSubmit`, `onClose` de `App.jsx`.
    *   **Envia de volta:** Chamadas aos setters em `onChange` dos inputs; chamada a `handleCreateSubmit` na submissão; chamada a `onClose` ao cancelar.
*   **`EditForm`:**
    *   **Recebe:** `show`, `editId`, `editPassword`, `setEditPassword`, `horariosSelecionados`, `handleHorarioChange`, `handleEditSubmit`, `onClose` de `App.jsx`.
    *   **Envia de volta:** Chamada a `setEditPassword` no `onChange` do input de senha; chamada a `handleHorarioChange` nos `onChange` dos checkboxes de horário; chamada a `handleEditSubmit` na submissão; chamada a `onClose` ao cancelar.
*   **`TotalScheduleView`:**
    *   **Recebe:** `schedules` de `App.jsx`.
    *   Componente puramente de exibição, processa `schedules` internamente com `useMemo` para renderizar a grade.
*   **`DevToolsView`:**
    *   **Recebe:** `schedules`, `onSendRequest` (wrapper de `handleSendCustomRequest` do `App.jsx`), `fetchSchedules` de `App.jsx`.
    *   **Gerencia estado local:** `endpoint`, `requestBody`, `response` (para a resposta da requisição manual).
    *   **Envia de volta:** Chama `onSendRequest` e `fetchSchedules`.

## Resumo do Fluxo Típico de uma Ação de Edição

1.  **Usuário clica em "Editar"** em um card de psicóloga no 'dashboard' (`App.jsx`).
2.  `App.jsx`: `handleLoadForEdit(psi)` é chamada.
    *   `editId` é definido com `psi.psicologa_id`.
    *   `horariosSelecionados` é populado com `psi.horarios_disponiveis`.
    *   `editPassword` é resetado para `''`.
    *   `isEditFormVisible` é definido como `true`.
3.  `EditForm` é renderizado com os dados preenchidos.
4.  **Usuário modifica horários e digita a senha** no `EditForm`.
    *   Mudanças nos checkboxes chamam `handleHorarioChange(dia, hora)` (prop do `App.jsx`), que atualiza `horariosSelecionados` em `App.jsx`.
    *   Mudança na senha chama `setEditPassword` (prop do `App.jsx`), que atualiza `editPassword` em `App.jsx`.
5.  **Usuário clica em "Salvar Alterações"** no `EditForm`.
6.  `EditForm`: Chama `handleEditSubmit` (prop do `App.jsx`).
7.  `App.jsx`: `handleEditSubmit` é executada.
    *   `isSaving` é definido como `true` (mostra `GlobalLoader`).
    *   Requisição POST é enviada para `/api/horarios/editar` com `editId`, `editPassword`, `horariosSelecionados`.
    *   **Após resposta da API:**
        *   `isSaving` é definido como `false` (esconde `GlobalLoader`).
        *   Se sucesso:
            *   `fetchSchedules()` é chamada para atualizar `schedules`.
            *   `isEditFormVisible` é definido como `false` (esconde `EditForm`).
            *   `notification` é configurada para exibir mensagem de sucesso.
        *   Se erro:
            *   `notification` (ou `alert`) é configurada para exibir mensagem de erro.
8.  A UI é re-renderizada com os dados atualizados e feedback visual.

Este padrão de fluxo de dados (estado centralizado no componente pai/container, passagem de dados e callbacks via props) é característico de aplicações React.
