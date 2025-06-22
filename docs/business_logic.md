# Lógica de Negócio

Esta seção descreve as principais funcionalidades do sistema Gestor de Horários PSIS e como elas são implementadas, com foco nas interações do usuário e nas operações de backend.

## 1. Listagem e Visualização de Horários

*   **Objetivo:** Permitir que os usuários visualizem os horários disponíveis das psicólogas.
*   **Implementação:**
    *   **Painel Individual (`activeView === 'dashboard'` em `App.jsx`):**
        *   Ao carregar `App.jsx` ou após certas ações, `fetchSchedules` busca todos os dados de `/api/horarios`.
        *   Os dados (`schedules`) são mapeados para renderizar um "card" (`schedule-card`) para cada psicóloga.
        *   Cada card exibe o nome e ID da psicóloga.
        *   Um botão "Ver Horários" (ícones `Eye`/`EyeOff`) usa `toggleScheduleExpansion(psi.psicologa_id)` para mostrar/ocultar os horários detalhados daquela psicóloga. Os horários são formatados em uma grade de dias da semana e horas.
    *   **Grade Geral (`activeView === 'totalGrid'` em `App.jsx`):**
        *   O componente `TotalScheduleView` recebe a lista completa de `schedules`.
        *   Ele processa esses dados para criar uma grade consolidada (`totalSchedule` via `useMemo`) onde cada célula (dia/hora) lista todas as psicólogas disponíveis naquele horário.

## 2. Criação de Nova Psicóloga

*   **Objetivo:** Permitir o cadastro de novas psicólogas no sistema.
*   **Implementação (`App.jsx` e `CreateForm.jsx`):**
    1.  **Interface:** O usuário clica no botão "Criar Psicóloga" na barra lateral.
        *   `App.jsx` define `isCreateFormVisible = true`, exibindo o modal `CreateForm`.
    2.  **Entrada de Dados:** O usuário preenche ID, Nome e Senha Inicial no `CreateForm`.
        *   Os estados `createId`, `createName`, `createPassword` em `App.jsx` são atualizados via callbacks (`setCreateId`, etc.).
    3.  **Submissão:** O usuário clica em "Criar".
        *   `CreateForm` chama `handleCreateSubmit` (prop de `App.jsx`).
    4.  **Processamento em `App.jsx` (`handleCreateSubmit`):**
        *   `isSaving` é definido como `true`.
        *   Uma requisição POST é enviada para `/api/horarios/criar` com os dados `{ id, nome, senha }`.
        *   **Se sucesso (API retorna 2xx e dados válidos):**
            *   Os campos do formulário de criação (`createId`, `createName`, `createPassword`) são limpos.
            *   `fetchSchedules()` é chamada para atualizar a lista de psicólogas.
            *   `isCreateFormVisible` é definido como `false`.
            *   Uma notificação de sucesso é exibida.
        *   **Se falha (API retorna erro ou falha na rede):**
            *   Uma mensagem de erro é exibida (via `alert` ou `NotificationToast`).
        *   `isSaving` é definido como `false`.

## 3. Edição de Horários de Psicóloga Existente

*   **Objetivo:** Permitir a alteração dos horários disponíveis e, opcionalmente, da senha de uma psicóloga.
*   **Implementação (`App.jsx` e `EditForm.jsx`):**
    1.  **Seleção:** No painel 'dashboard', o usuário clica no botão "Editar" de uma psicóloga específica.
        *   `App.jsx` chama `handleLoadForEdit(psi)`.
            *   `editId` é definido com o ID da psicóloga.
            *   `horariosSelecionados` é populado com os horários atuais da psicóloga.
            *   `editPassword` é limpo.
            *   `isEditFormVisible = true`, exibindo o modal `EditForm`.
    2.  **Entrada de Dados:** O usuário modifica os checkboxes de horários e insere a senha (obrigatória para confirmar).
        *   Alterações nos horários chamam `handleHorarioChange(diaKey, hora)` em `App.jsx`, atualizando `horariosSelecionados`.
        *   A senha digitada atualiza `editPassword` em `App.jsx` via `setEditPassword`.
    3.  **Submissão:** O usuário clica em "Salvar Alterações".
        *   `EditForm` chama `handleEditSubmit` (prop de `App.jsx`).
    4.  **Processamento em `App.jsx` (`handleEditSubmit`):**
        *   `isSaving` é definido como `true`.
        *   Uma requisição POST é enviada para `/api/horarios/editar` com `{ id: editId, senha: editPassword, horarios: horariosSelecionados }`.
        *   **Se sucesso:**
            *   `fetchSchedules()` é chamada.
            *   `isEditFormVisible` é definido como `false`.
            *   Notificação de sucesso.
        *   **Se falha (senha incorreta, ID não existe, etc.):**
            *   Mensagem de erro.
        *   `isSaving` é definido como `false`.

## 4. Interação com Ferramentas de Desenvolvedor (`DevToolsView`)

*   **Objetivo:** Fornecer uma interface para desenvolvedores/administradores visualizarem dados brutos e enviarem requisições customizadas para a API.
*   **Implementação (`App.jsx` e `DevToolsView.jsx`):**
    *   **Visualização de JSON:** `DevToolsView` recebe `schedules` e os exibe. Um botão "Atualizar Dados" chama `fetchSchedules` de `App.jsx`.
    *   **Envio Manual:**
        1.  O usuário seleciona um preset ou digita um `endpoint` e `requestBody` JSON no `DevToolsView`.
        2.  Ao clicar em "Enviar Requisição", `DevToolsView` chama a prop `onSendRequest` (que é `handleSendCustomRequest` de `App.jsx`) passando o `endpoint`, `requestBody` e uma função callback `setResponse` (local de `DevToolsView`).
        3.  `handleSendCustomRequest` em `App.jsx`:
            *   `isSaving = true`.
            *   Envia a requisição POST para `${API_URL}/api/horarios${endpoint}` com o corpo.
            *   Chama `setResponse` do `DevToolsView` com `{ ok: res.ok, data: result }`.
            *   Se a requisição for `ok` (e implicitamente for uma escrita), chama `fetchSchedules()` para atualizar os dados globais.
            *   Mostra notificação de sucesso.
            *   `isSaving = false`.
        4.  `DevToolsView` atualiza seu estado `response` e exibe a resposta da API.

## Considerações de Negócio Não Implementadas (ou Implícitas)

*   **Autenticação de Usuário Geral:** O sistema não parece ter um login de usuário global. A "autenticação" é feita por psicóloga individualmente ao editar, usando uma senha específica para cada uma.
*   **Níveis de Acesso:** Não há distinção entre usuários comuns e administradores, exceto pela seção "Ferramentas" que é mais técnica.
*   **Validação de Dados:**
    *   **Frontend:** Há validações básicas (campos obrigatórios nos formulários HTML).
    *   **Backend (API):** A API (`lista-psis-api.onrender.com`) é responsável pela validação mais robusta (ex: ID já existente, formato de horários, senha correta na edição). As mensagens de erro da API são propagadas para o frontend.
*   **Exclusão de Psicóloga:** Não há funcionalidade explícita na UI para excluir uma psicóloga. Isso poderia ser feito via `DevToolsView` se a API suportar um endpoint de exclusão.
*   **Conflito de Horários:** A lógica de negócio atual foca na *disponibilidade*. Não há verificação de agendamentos ou conflitos se múltiplos clientes tentassem marcar o mesmo horário (essa funcionalidade está fora do escopo do "gestor de horários de psicólogas" e mais para um "sistema de agendamento").

Esta descrição cobre as principais operações do ponto de vista da lógica de negócio implementada na interface do usuário e suas interações com a API.
