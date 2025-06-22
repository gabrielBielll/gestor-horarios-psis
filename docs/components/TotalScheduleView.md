# Componente `TotalScheduleView.jsx`

`TotalScheduleView` é responsável por exibir uma grade consolidada mostrando a disponibilidade de todas as psicólogas cadastradas para cada horário de trabalho ao longo da semana.

## Responsabilidades

*   Receber a lista completa de `schedules` (horários das psicólogas).
*   Processar e agregar esses dados para determinar quais psicólogas estão disponíveis em cada combinação de dia da semana e horário.
*   Renderizar uma tabela ou grade onde as colunas representam os dias da semana e as linhas (ou seções dentro de cada dia) representam os horários de trabalho.
*   Em cada célula (dia/hora), listar os nomes das psicólogas disponíveis ou indicar indisponibilidade.

## Props Recebidas

*   `schedules`: `Array` - Lista de objetos, onde cada objeto representa uma psicóloga e contém `psicologa_id`, `nome`, e `horarios_disponiveis`. `horarios_disponiveis` é um objeto com chaves para os dias da semana e valores como arrays de horários.

## Estrutura Interna e Lógica

*   **Constantes:** `DIAS_SEMANA` e `HORAS_TRABALHO` (definidas no próprio componente) são usadas para estruturar a grade e iterar sobre os dias e horários.
*   **`useMemo` para `totalSchedule`:**
    *   Os dados dos `schedules` são processados dentro de um hook `useMemo` para calcular o `totalSchedule`. Isso garante que a agregação custosa só seja refeita se a prop `schedules` mudar.
    *   `totalSchedule` é um objeto estruturado da seguinte forma:
        ```javascript
        {
          seg: {
            "08:00": [{id: 1, nome: "Ana"}, {id: 2, nome: "Clara"}],
            "09:00": [{id: 1, nome: "Ana"}],
            // ... outros horários
          },
          ter: {
            "08:00": [],
            // ... outros horários
          },
          // ... outros dias
        }
        ```
    *   A lógica de agregação itera sobre cada psicóloga, depois sobre cada dia da semana e cada horário disponível para ela, adicionando seu ID e nome à lista correspondente em `totalSchedule[dia.key][hora]`.
*   **Renderização:**
    *   A visualização principal é um `div` com a classe `total-schedule-grid`.
    *   Itera sobre `DIAS_SEMANA` para criar uma coluna (`total-day-column`) para cada dia.
        *   Cada coluna de dia tem um título (`total-day-title`) com o nome do dia.
        *   Dentro de cada coluna de dia, itera sobre `HORAS_TRABALHO` para criar um slot de tempo (`total-time-slot`) para cada hora.
            *   Cada slot de tempo exibe a hora em negrito.
            *   Dentro de cada slot, acessa `totalSchedule[dia.key][hora]` para obter a lista de psicólogas disponíveis.
            *   Se houver psicólogas disponíveis, mapeia a lista para exibir cada nome como um `span` com a classe `psi-badge`.
            *   Se não houver psicólogas disponíveis, exibe um `span` com a classe `no-psis` e o texto "Indisponível".

## Interação

Este componente é puramente para visualização. Não há interações diretas do usuário que alterem seu estado ou o estado da aplicação. Ele reage a mudanças na prop `schedules` (por exemplo, após uma edição ou criação de psicóloga no `App.jsx`).

As constantes `DIAS_SEMANA` e `HORAS_TRABALHO` são duplicadas aqui. Considerar centralizá-las se o projeto crescer.
