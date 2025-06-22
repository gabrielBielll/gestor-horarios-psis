# Componente `NotificationToast.jsx`

`NotificationToast` é um componente de UI usado para exibir mensagens curtas e temporárias (notificações "toast") ao usuário, geralmente para informar sobre o resultado de uma ação (sucesso ou erro).

## Responsabilidades

*   Exibir uma mensagem de notificação.
*   Opcionalmente, exibir um ícone indicando o tipo de notificação (ex: sucesso, erro, aviso). No código atual, ele sempre exibe um ícone de `CheckCircle`.
*   Desaparecer automaticamente após um período de tempo.
*   Permitir que o usuário feche a notificação manualmente (embora a implementação atual não inclua um botão de fechar explícito, ele depende do `onClose` ser chamado pelo timer).

## Props Recebidas

*   `message`: `String` - A mensagem a ser exibida na notificação.
*   `type`: `String` - O tipo de notificação (ex: 'success', 'error'). Embora recebida, esta prop não é explicitamente usada para alterar o estilo ou ícone na implementação atual do componente (o CSS pode estar fazendo isso com base na classe `notification-toast` e classes adicionais que poderiam ser adicionadas baseadas no `type`).
*   `onClose`: `Function` - Uma função a ser chamada quando a notificação deve ser fechada. Esta função é responsável por atualizar o estado no componente pai para esconder a notificação.

## Estrutura e Lógica

*   **Renderização:**
    *   O componente principal é um `div` com a classe `notification-toast`.
    *   Dentro dele, um ícone `CheckCircle` da biblioteca `lucide-react` é exibido.
    *   Um `span` exibe a `message` da prop.
*   **Desaparecimento Automático:**
    *   Um hook `useEffect` é usado para configurar um temporizador (`setTimeout`).
    *   Quando o componente é montado (ou `onClose` muda), o timer é configurado para chamar a função `onClose` após 3000 milissegundos (3 segundos).
    *   Uma função de limpeza é retornada pelo `useEffect` para limpar o timer (`clearTimeout`) se o componente for desmontado antes que o timer dispare, ou se `onClose` mudar, para evitar chamadas múltiplas ou chamadas a `onClose` de uma instância anterior.

## Uso Comum

Este componente é renderizado condicionalmente no `App.jsx` (ou outro container) quando há uma notificação a ser exibida. O estado da notificação (visibilidade, mensagem, tipo) é geralmente gerenciado no componente pai.

**Exemplo em `App.jsx`:**
```jsx
// No estado do App.jsx
// const [notification, setNotification] = useState({ show: false, message: '', type: ''});

// No JSX do App.jsx
{notification.show && (
  <NotificationToast
    message={notification.message}
    type={notification.type}
    onClose={() => setNotification({ show: false, message: '', type: '' })}
  />
)}
```

## Interação

*   A notificação aparece quando o estado correspondente no componente pai é definido para exibi-la.
*   Ela desaparece automaticamente após 3 segundos, chamando a função `onClose`.
*   Não há interação direta do usuário com o toast para fechá-lo na implementação atual (por exemplo, um botão 'X').

## Observações

*   A prop `type` é recebida, mas não parece ser usada para variar o ícone ou aplicar classes CSS específicas de tipo diretamente no JSX do componente. O estilo pode ser global ou o `App.css` (ou `index.css`) pode ter regras mais específicas que dependem de classes adicionadas dinamicamente ao redor deste componente ou com base no `type` no componente pai. A documentação atual foca no que está explicitamente no arquivo `.jsx`.
*   O ícone `CheckCircle` é usado para todos os tipos de notificação. Para diferentes tipos (erro, aviso), ícones diferentes seriam mais apropriados.
