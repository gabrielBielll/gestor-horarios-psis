# Componente `GlobalLoader.jsx`

`GlobalLoader` é um componente simples usado para indicar ao usuário que uma operação assíncrona demorada está em andamento, bloqueando interações adicionais com a interface até que seja concluída.

## Responsabilidades

*   Exibir uma sobreposição (overlay) em tela cheia para impedir cliques em outros elementos.
*   Mostrar um indicador visual de carregamento (spinner).
*   Exibir uma mensagem opcional para informar ao usuário qual ação está sendo processada (padrão: "Salvando...").

## Props Recebidas

*   `message`: `String` (opcional) - A mensagem a ser exibida abaixo do spinner. Se não fornecida, o padrão é "Salvando...".

## Estrutura

O componente consiste em:
*   Um `div` com a classe `global-loader-overlay`. Este `div` cobre toda a tela e geralmente tem um fundo semi-transparente para escurecer o conteúdo subjacente.
*   Dentro do overlay, um `div` com a classe `spinner`. Este é o elemento que renderiza a animação de carregamento (geralmente via CSS).
*   Um parágrafo (`<p>`) com a classe `global-loader-text` que exibe a `message` fornecida ou "Salvando...".

## Uso Comum

Este componente é tipicamente renderizado condicionalmente no `App.jsx` (ou em outro componente container) quando um estado como `isSaving` ou `isLoading` é `true`.

**Exemplo em `App.jsx`:**
```jsx
{isSaving && <GlobalLoader message="Processando sua requisição..." />}
```

## Interação

Não há interação direta do usuário com o `GlobalLoader`. Sua aparição e desaparecimento são controlados pelo estado do componente pai. Enquanto visível, ele impede que o usuário interaja com o resto da aplicação.
