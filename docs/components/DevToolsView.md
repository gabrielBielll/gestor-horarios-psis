# Componente `DevToolsView.jsx`

`DevToolsView` é uma seção da aplicação destinada a desenvolvedores ou administradores, fornecendo ferramentas para interagir diretamente com a API e visualizar o estado atual dos dados.

## Responsabilidades

*   **Visualizador de JSON:** Exibir os dados brutos das psicólogas (`schedules`) em formato JSON formatado.
*   **Atualização de Dados:** Fornecer um botão para recarregar os dados das psicólogas da API.
*   **Envio Manual de Requisições:**
    *   Permitir que o usuário especifique um endpoint da API (relativo a `/api/horarios`).
    *   Permitir que o usuário insira um corpo de requisição em formato JSON.
    *   Oferecer presets para endpoints comuns (como `/criar` e `/editar`) que preenchem automaticamente o endpoint e um corpo de exemplo.
    *   Enviar a requisição para a API através de uma função fornecida pelo componente pai (`onSendRequest`).
    *   Exibir a resposta da API (tanto sucesso quanto erro) em formato JSON.

## Props Recebidas

*   `schedules`: `Array` - A lista atual de psicólogas e seus horários, usada pelo visualizador de JSON.
*   `onSendRequest`: `Function` - Uma função (provida pelo `App.jsx`, que envolve `handleSendCustomRequest`) para enviar uma requisição customizada à API. Espera-se que esta função receba `endpoint`, `body` (string JSON) e uma função `setResponse` para atualizar o estado local com a resposta.
*   `fetchSchedules`: `Function` - Função (provida pelo `App.jsx`) para recarregar os dados de todas as psicólogas da API.

## Estado Interno

*   `endpoint`: `String` - O endpoint da API para o qual a requisição manual será enviada (ex: `/criar`, `/editar`). Inicializado como `/criar`.
*   `requestBody`: `String` - O corpo da requisição em formato JSON a ser enviado. Inicializado com um exemplo para o endpoint `/criar`.
*   `response`: `Object | null` - Armazena a resposta da última requisição manual enviada. Formato esperado: `{ ok: Boolean, data: Object }`. Inicializado como `null`.

## Estrutura e Funcionalidades

O componente é dividido em dois `section-card`:

1.  **Visualizador de JSON:**
    *   **Cabeçalho:** "Visualizador de JSON".
    *   **Botão "Atualizar Dados":** Ao ser clicado, chama a prop `fetchSchedules`.
    *   **Conteúdo:** Um elemento `<pre>` com a classe `json-viewer` que exibe `JSON.stringify(schedules, null, 2)`.

2.  **Enviar Requisição Manual:**
    *   **Cabeçalho:** "Enviar Requisição Manual".
    *   **Presets de Requisição:**
        *   Um `select` que permite ao usuário escolher entre "Criar Psicóloga" (`/criar`) e "Editar Horários" (`/editar`).
        *   A seleção de um preset (`handlePresetChange`) atualiza os estados `endpoint` e `requestBody` com valores de exemplo apropriados.
    *   **Campo Endpoint:**
        *   Um `input` de texto para o usuário digitar o `endpoint` desejado (prefixado por `/api/horarios` na chamada real).
    *   **Campo Corpo da Requisição:**
        *   Um `textarea` para o usuário digitar o `requestBody` em formato JSON.
    *   **Botão "Enviar Requisição":**
        *   Ao ser clicado, chama `onSendRequest(endpoint, requestBody, setResponse)`. A função `setResponse` é uma referência à função que atualiza o estado `response` local deste componente.
    *   **Visualizador de Resposta:**
        *   Se `response` não for nulo, exibe um `<pre>` com a classe `json-viewer`.
        *   O conteúdo é `JSON.stringify(response.data, null, 2)`.
        *   O estilo de fundo do visualizador de resposta muda com base em `response.ok` (verde para sucesso, vermelho para erro).

## Interação

*   O usuário pode visualizar os dados atuais das psicólogas e atualizá-los clicando no botão.
*   Para enviar uma requisição manual:
    1.  O usuário pode selecionar um preset, que preenche o endpoint e um corpo de exemplo.
    2.  O usuário pode modificar o endpoint e o corpo da requisição conforme necessário.
    3.  Ao clicar em "Enviar Requisição", a prop `onSendRequest` é chamada.
    4.  A resposta da API é então exibida abaixo do botão de envio. Se a requisição for bem-sucedida e modificar dados (ex: criar, editar), o `App.jsx` (através de `handleSendCustomRequest`) deve também chamar `fetchSchedules` para atualizar a lista geral.

Este componente oferece uma maneira poderosa, porém técnica, de interagir com o backend, útil para depuração e administração.
