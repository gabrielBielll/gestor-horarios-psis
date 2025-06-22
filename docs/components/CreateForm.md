# Componente `CreateForm.jsx`

`CreateForm` é um componente de formulário modal utilizado para registrar uma nova psicóloga no sistema.

## Responsabilidades

*   Renderizar os campos de entrada para o ID, nome e senha inicial da nova psicóloga.
*   Coletar os dados inseridos pelo usuário.
*   Submeter os dados para o componente pai (`App.jsx`) através da prop `handleCreateSubmit`.
*   Permitir o fechamento do modal através da prop `onClose`.

## Props Recebidas

*   `handleCreateSubmit`: `Function` - Função a ser chamada quando o formulário é submetido. É responsável por fazer a chamada à API para criar a psicóloga.
*   `createId`: `String` - O valor atual do campo ID da psicóloga.
*   `setCreateId`: `Function` - Função para atualizar o estado `createId` no componente pai.
*   `createName`: `String` - O valor atual do campo nome da psicóloga.
*   `setCreateName`: `Function` - Função para atualizar o estado `createName` no componente pai.
*   `createPassword`: `String` - O valor atual do campo senha da psicóloga.
*   `setCreatePassword`: `Function` - Função para atualizar o estado `createPassword` no componente pai.
*   `onClose`: `Function` - Função a ser chamada para fechar o modal de criação.

## Estrutura

O formulário é apresentado dentro de um `div` com a classe `section-card` e contém:
*   Um cabeçalho com o título "Criar Nova Psicóloga".
*   Campos de entrada (`input`) para:
    *   ID da Psicóloga (numérico, obrigatório).
    *   Nome (texto, obrigatório).
    *   Senha Inicial (password, obrigatório).
*   Botões:
    *   "Cancelar": Chama a função `onClose`.
    *   "Criar": Submete o formulário, chamando `handleCreateSubmit`.

## Interação

*   O usuário preenche os campos do formulário.
*   Ao clicar em "Criar", a função `handleCreateSubmit` (fornecida pelo `App.jsx`) é invocada com os dados do formulário.
*   Ao clicar em "Cancelar", a função `onClose` (fornecida pelo `App.jsx`) é invocada, geralmente para esconder o formulário.

Este componente é puramente presentacional e de coleta de dados, delegando a lógica de submissão e gerenciamento de estado ao seu componente pai (`App.jsx`).
