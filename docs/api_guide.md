# Guia da API

Este documento fornece detalhes sobre os endpoints da API utilizados pela aplicação Gestor de Horários PSIS. A URL base da API é `https://lista-psis-api.onrender.com`. Todas as requisições documentadas aqui são prefixadas com `/api/horarios`.

## Endpoints Principais

### 1. Buscar Todos os Horários

*   **Endpoint:** `GET /api/horarios`
*   **Descrição:** Retorna uma lista de todas as psicólogas cadastradas e seus respectivos horários disponíveis.
*   **Corpo da Requisição:** N/A
*   **Resposta de Sucesso (200 OK):**
    Um array de objetos, onde cada objeto representa uma psicóloga.
    ```json
    [
      {
        "psicologa_id": 1,
        "nome": "Dra. Ana Silva",
        "horarios_disponiveis": {
          "seg": ["09:00", "10:00", "14:00"],
          "ter": ["11:00"],
          "qua": [],
          "qui": ["15:00", "16:00"],
          "sex": ["08:00"],
          "sab": []
        }
      },
      // ... outros psicólogos
    ]
    ```
*   **Possíveis Erros:**
    *   `500 Internal Server Error`: Se ocorrer um erro no servidor ao buscar os dados.
*   **Usado em:**
    *   `App.jsx` na função `fetchSchedules` para popular a lista inicial de horários e atualizar após modificações.

### 2. Criar Nova Psicóloga

*   **Endpoint:** `POST /api/horarios/criar`
*   **Descrição:** Cria um novo registro de psicóloga no sistema. Os horários iniciais são vazios por padrão e devem ser definidos através do endpoint de edição.
*   **Corpo da Requisição (JSON):**
    ```json
    {
      "id": 123,        // Integer, ID único para a nova psicóloga
      "nome": "Nova Psicóloga", // String, Nome da psicóloga
      "senha": "senhaSegura123" // String, Senha para futuras edições
    }
    ```
*   **Resposta de Sucesso (geralmente 201 Created ou 200 OK com a entidade criada):**
    A API pode retornar o objeto da psicóloga criada ou uma mensagem de sucesso.
    Exemplo (pode variar dependendo da implementação da API):
    ```json
    {
      "message": "Psicóloga criada com sucesso!",
      "psicologa": {
        "psicologa_id": 123,
        "nome": "Nova Psicóloga",
        "horarios_disponiveis": { "seg": [], "ter": [], "qua": [], "qui": [], "sex": [], "sab": [] }
      }
    }
    ```
*   **Possíveis Erros:**
    *   `400 Bad Request`: Se os dados enviados forem inválidos (ex: ID já existe, campos faltando). A resposta pode conter uma mensagem específica.
        ```json
        { "message": "ID de psicóloga já existente." }
        ```
    *   `500 Internal Server Error`: Erro no servidor.
*   **Usado em:**
    *   `App.jsx` na função `handleCreateSubmit`.
    *   `DevToolsView.jsx` para envio manual.

### 3. Editar Horários/Senha da Psicóloga

*   **Endpoint:** `POST /api/horarios/editar`
*   **Descrição:** Atualiza os horários disponíveis e/ou a senha de uma psicóloga existente. A senha fornecida no corpo da requisição é usada para autenticar a alteração.
*   **Corpo da Requisição (JSON):**
    ```json
    {
      "id": 123,        // Integer, ID da psicóloga a ser editada
      "senha": "senhaAntigaOuNova", // String, Senha atual para autenticar OU nova senha se for para alterar
      "horarios": {     // Objeto, horários disponíveis atualizados
        "seg": ["09:00", "10:00"],
        "ter": [],
        // ... outros dias
      }
      // Opcional: "nova_senha": "novaSenha123" // Se a API suportar alteração de senha desta forma
    }
    ```
    *Nota: A forma como a API lida com a alteração de senha (se `senha` é a antiga para autenticar e `nova_senha` para definir, ou se `senha` já é a nova senha e a API valida a antiga de outra forma) depende da sua implementação. A UI atual sugere que `senha` é usada para autenticar a operação.*
*   **Resposta de Sucesso (geralmente 200 OK):**
    A API pode retornar o objeto da psicóloga atualizado ou uma mensagem de sucesso.
    Exemplo:
    ```json
    {
      "message": "Horários atualizados com sucesso!",
      "psicologa": {
        "psicologa_id": 123,
        "nome": "Nome da Psicóloga", // O nome não é alterado por este endpoint na UI
        "horarios_disponiveis": {
          "seg": ["09:00", "10:00"],
          "ter": []
          // ...
        }
      }
    }
    ```
*   **Possíveis Erros:**
    *   `400 Bad Request`: Dados inválidos (ex: formato de horários incorreto).
    *   `401 Unauthorized` ou `403 Forbidden`: Senha incorreta.
        ```json
        { "message": "Senha incorreta." }
        ```
    *   `404 Not Found`: Psicóloga com o ID fornecido não encontrada.
        ```json
        { "message": "Psicóloga não encontrada." }
        ```
    *   `500 Internal Server Error`: Erro no servidor.
*   **Usado em:**
    *   `App.jsx` na função `handleEditSubmit`.
    *   `DevToolsView.jsx` para envio manual.

## Considerações Gerais da API

*   **Formato de Dados:** A API utiliza JSON para corpos de requisição e respostas.
*   **Autenticação:** A autenticação para operações de escrita (criar, editar) parece ser feita por meio de uma senha específica para cada psicóloga, enviada no corpo da requisição de edição. Não há um sistema de token global ou sessão de usuário visível na interação do frontend.
*   **Tratamento de Erros:** O frontend espera que a API retorne códigos de status HTTP apropriados e, idealmente, um corpo de resposta JSON com uma chave `message` para erros.
*   **Disponibilidade:** A API está hospedada no `onrender.com`, e sua disponibilidade é crucial para o funcionamento da aplicação.

Este guia cobre os endpoints explicitamente usados pela interface do frontend. A API pode ter outros endpoints (ex: para exclusão) que não são diretamente acessíveis pela UI principal, mas poderiam ser usados através do `DevToolsView`.
