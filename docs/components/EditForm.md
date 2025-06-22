# Componente `EditForm.jsx`

`EditForm` é um componente de formulário modal usado para modificar os horários disponíveis de uma psicóloga existente e, opcionalmente, sua senha.

## Responsabilidades

*   Exibir o ID da psicóloga que está sendo editada (somente leitura).
*   Renderizar um campo para a senha (necessária para autorizar a alteração).
*   Apresentar uma grade de seleção de horários, organizada por dia da semana e hora.
*   Permitir que o usuário selecione/desselecione os horários disponíveis.
*   Submeter os dados (ID, senha, horários selecionados) para o componente pai (`App.jsx`) através da prop `handleEditSubmit`.
*   Permitir o fechamento do modal através da prop `onClose`.

## Props Recebidas

*   `show`: `Boolean` - Controla a visibilidade do formulário. Se `false`, o componente não renderiza nada.
*   `handleEditSubmit`: `Function` - Função a ser chamada quando o formulário é submetido. Responsável por fazer a chamada à API para atualizar os dados da psicóloga.
*   `editId`: `String` - O ID da psicóloga cujos horários estão sendo editados.
*   `editPassword`: `String` - O valor atual do campo senha.
*   `setEditPassword`: `Function` - Função para atualizar o estado `editPassword` no componente pai.
*   `horariosSelecionados`: `Object` - Um objeto onde as chaves são os dias da semana (ex: 'seg', 'ter') e os valores são arrays de strings representando os horários selecionados para aquele dia (ex: `['09:00', '10:00']`).
*   `handleHorarioChange`: `Function` - Função chamada quando um checkbox de horário é clicado. Recebe `diaKey` e `hora` como argumentos e atualiza o estado `horariosSelecionados` no componente pai.
*   `onClose`: `Function` - Função a ser chamada para fechar o modal de edição.

## Estrutura Interna

*   O formulário é encapsulado em um `div` com a classe `section-card`.
*   **Cabeçalho:** Exibe "Editar Horários (ID: {editId})".
*   **Campos de Formulário:**
    *   ID da Psicóloga: Input numérico, somente leitura, exibindo `editId`.
    *   Senha: Input de senha, obrigatório, para `editPassword`.
*   **Seleção de Horários:**
    *   Utiliza as constantes `DIAS_SEMANA` e `HORAS_TRABALHO` (definidas no próprio componente, mas idênticas às de `App.jsx`) para gerar uma grade.
    *   Para cada dia da semana, lista todos os `HORAS_TRABALHO` como checkboxes.
    *   O estado de cada checkbox (`checked`) é determinado pela presença do horário correspondente em `horariosSelecionados[dia.key]`.
    *   A alteração de um checkbox chama `handleHorarioChange(dia.key, hora)`.
*   **Botões:**
    *   "Cancelar": Chama a função `onClose`.
    *   "Salvar Alterações": Submete o formulário, chamando `handleEditSubmit`.

## Interação

*   O formulário é exibido quando `show` é `true`.
*   O usuário insere a senha de autenticação.
*   O usuário clica nos checkboxes para selecionar ou desmarcar os horários disponíveis para cada dia. Cada clique invoca `handleHorarioChange` que atualiza o estado no `App.jsx`.
*   Ao clicar em "Salvar Alterações", a função `handleEditSubmit` (do `App.jsx`) é chamada.
*   Ao clicar em "Cancelar", a função `onClose` (do `App.jsx`) é chamada.

Este componente, assim como `CreateForm`, foca na apresentação e coleta de dados, com a lógica de estado e submissão gerenciada pelo `App.jsx`. As constantes `DIAS_SEMANA` e `HORAS_TRABALHO` são duplicadas aqui; idealmente, poderiam ser importadas de um local compartilhado se fossem usadas em mais lugares.
