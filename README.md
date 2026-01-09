# CRUD Todo (React + Vite + Tailwind)

Aplicação de lista de tarefas (“to-do”) com **CRUD completo**, separação entre **lógica de negócio (Context API)** e **componentes de UI**, e **persistência simples em `localStorage`**. O objetivo deste README é permitir que outro(a) dev assuma o projeto rapidamente, entendendo decisões, fluxo de dados e trade-offs.

---

## Sumário

- [1. Visão Geral do Projeto](#1-visão-geral-do-projeto)
- [2. Persistência de Dados](#2-persistência-de-dados)
- [3. Gerenciamento Global de Estado (Context API)](#3-gerenciamento-global-de-estado-context-api)
  - [3.1 TaskProvider](#31-taskprovider)
  - [3.2 ModalProvider](#32-modalprovider)
- [4. CRUD de Tarefas](#4-crud-de-tarefas)
- [5. Modos de Operação: Criação vs Edição](#5-modos-de-operação-criação-vs-edição)
- [6. Decisões Arquiteturais](#6-decisões-arquiteturais)
- [7. Melhorias Futuras](#7-melhorias-futuras)
- [8. Conclusão](#8-conclusão)

---

## Stack e Ferramentas

- **React 19** (UI)
- **Vite** (bundler/dev server)
- **Tailwind CSS v4** (estilização utilitária)
- **ESLint** (qualidade de código)

Estrutura principal:
- `src/main.jsx`: bootstrap de React + Providers
- `src/App.jsx`: layout e composição das seções
- `src/components/context/*`: Context API (Task + Modal)
- `src/components/ui/*`: componentes visuais reutilizáveis (Button, Typography, Modal etc.)

---

## 1. Visão Geral do Projeto

### Qual problema o projeto resolve
Centraliza o gerenciamento de tarefas do dia em uma interface simples, com separação clara entre:
- **estado e regras de negócio** (tarefas, modal, persistência),
- **componentes de apresentação** (UI).

### Proposta da aplicação
Um “todo app” de página única onde o usuário consegue:
- criar tarefas,
- marcar como concluídas,
- editar texto de tarefas existentes,
- excluir tarefas,
- visualizar tarefas separadas em **pendentes** e **concluídas**.

### Principais funcionalidades entregues
- **CRUD completo**:
  - Create: criar tarefa via modal
  - Read: listar tarefas em duas colunas (pending/completed)
  - Update: editar título e alternar conclusão
  - Delete: remover tarefa
- **Persistência local via `localStorage`**
- **Modal com dois modos (create/edit)** controlado globalmente
- **Empty State** quando não há tarefas

---

## 2. Persistência de Dados

### Uso de `localStorage` como persistência simples
A persistência é feita no `TaskProvider` usando `localStorage` com a chave:

- `STORAGE_KEY = "crud-todo:tasks"`

Isso permite que:
- tarefas sobrevivam a reload de página,
- não exista dependência de backend,
- o projeto permaneça simples (ótimo para estudo/prototipação).

**Trade-offs / limitações:**
- dados ficam no browser do usuário (não sincroniza entre dispositivos),
- suscetível a limpeza de cache/armazenamento,
- sem controle de concorrência/versão,
- não ideal para grandes volumes de dados (serialização JSON).

### Lazy initialization no `useState` e por quê
O estado `tasks` é inicializado com `useState(() => { ... })` (função inicializadora), em vez de `useState(valor)`.

**Motivo:** a função inicializadora roda **apenas na primeira renderização** do componente (mount). Isso evita:
- leituras repetidas do `localStorage` em re-renders normais,
- parsing JSON desnecessário,
- custo extra em performance (ainda que pequeno) e ruído de execução.

Exemplo (conceito já aplicado no código):
- `useState(() => { const raw = localStorage.getItem(...); return JSON.parse(raw) })`

### Fluxo de leitura e escrita (read/write)
**Leitura (uma vez, ao montar o provider):**
1. `useState` executa a função inicializadora.
2. Lê `localStorage.getItem(STORAGE_KEY)`.
3. Converte JSON → objeto/array (`JSON.parse`).
4. Garante que o resultado seja array (fallback para `[]`).
5. Se houver erro, retorna `[]`.

**Escrita (toda vez que `tasks` muda):**
1. `useEffect(..., [tasks])` reage à mudança no estado.
2. Serializa `tasks` com `JSON.stringify`.
3. Salva em `localStorage.setItem(STORAGE_KEY, ...)`.
4. Erros são ignorados (ex.: quota/privacidade).

---

## 3. Gerenciamento Global de Estado (Context API)

O projeto usa **dois contextos**:
- `TaskProvider` (dados e regras do domínio “tarefas”)
- `ModalProvider` (estado e regras do “modal”)

Isso reduz acoplamento: UI não “inventaria” regras; apenas invoca funções do provider.

Bootstrap:
- `src/main.jsx` envolve `<App />` com:
  - `<TaskProvider>`
    - `<ModalProvider>`
      - `<App />`

> Observação: o `ModalProvider` fica dentro do `TaskProvider`, mas não depende dele diretamente; eles são independentes.

---

### 3.1 TaskProvider

Arquivo: `src/components/context/TaskProvider.jsx`

#### Responsabilidade
Centralizar:
- estado global de tarefas,
- persistência em `localStorage`,
- funções de manipulação (CRUD + toggle),
- derivação de listas (pendentes/concluídas).

#### Estado global gerenciado
- `tasks`: lista de tarefas no formato:
  - `{ id: number, title: string, completed: boolean }`

Também expõe estados derivados (não armazenados separadamente):
- `pendingTasks = tasks.filter(!completed)`
- `completedTasks = tasks.filter(completed)`

**Trade-off:**
- derivar via `filter` em todo render do provider é simples e legível; com listas grandes, poderia ser memoizado (`useMemo`). Para o escopo atual, é adequado.

#### Funções expostas
- `addTask(task)`  
  Adiciona uma task já montada e gera `id` incremental (baseado no `maxId` atual).
- `createTask(title)`  
  Cria task com `{ title, completed: false }` e delega para `addTask`.
- `removeTask(taskId)`  
  Remove por `id`.
- `deleteTask(id)`  
  Alias semântico para `removeTask` (chamado pela UI).
- `toggleTaskCompletion(taskId)`  
  Inverte `completed` de uma tarefa específica.
- `updateTaskText(id, title)`  
  Atualiza o `title` (edição).

#### Como o contexto desacopla lógica de negócio da UI
Componentes de UI (ex.: `TaskItem`, `IconContainer`, `Form`) não precisam saber:
- como gerar id,
- como persistir,
- como atualizar um item específico,
- como calcular listas pendentes/concluídas.

Eles apenas chamam:
- `createTask(...)`, `updateTaskText(...)`, `deleteTask(...)`, `toggleTaskCompletion(...)`.

---

### 3.2 ModalProvider

Arquivo: `src/components/context/ModalProvider.jsx`

#### Responsabilidade
Gerenciar globalmente:
- abertura/fechamento do modal,
- modo atual do modal (`create` vs `edit`),
- task “em edição” (quando aplicável).

#### Estado global gerenciado
- `isOpen: boolean`  
  Se o modal está aberto.
- `mode: "create" | "edit"`  
  Determina comportamento e textos do formulário/modal.
- `editableTask: { id, title } | null`  
  Guarda referência mínima da task que está sendo editada.

#### Funções expostas
- `openCreateModal()`  
  Define `mode="create"`, limpa `editableTask`, abre modal.
- `openEditModal(task)`  
  Define `mode="edit"`, seta `editableTask`, abre modal.
- `closeModal()`  
  Fecha modal e reseta estado para o default (create + editableTask null).

#### Como o modal recebe e compartilha a task em edição
- Em cada item da lista existe um botão de edição (`IconContainer`).
- Ao clicar editar:
  - `openEditModal({ id: taskId, title: currentTitle })`
- O `Form` lê `mode` e `editableTask` via `useModal()`, e:
  - faz prefill do campo
  - decide se chama `updateTaskText` ou `createTask` no submit

---

## 4. CRUD de Tarefas

### Read (exibição e organização)
Arquivo: `src/components/TaskSection.jsx`

- Obtém `pendingTasks` e `completedTasks` do `TaskProvider`.
- Renderiza:
  - `EmptyState` se ambas listas estiverem vazias.
  - Caso contrário:
    - `SectionColumn title="pending" tasks={pendingTasks}`
    - `Divisor`
    - `SectionColumn title="completed" tasks={completedTasks}`

`SectionColumn`:
- Mostra título e contador (`{tasks.length} task(s)`).
- Mostra mensagem “no tasks available” quando a lista específica está vazia.
- Renderiza `TaskList`.

`TaskList`:
- Mapeia `tasks` e renderiza `TaskItem` por `task.id`.

### Create (criação de tarefas)
Fluxo de criação:
1. `OpenModalButton` chama `openCreateModal()`.
2. Modal abre em modo `create`.
3. `Form` exibe texto/placeholder de criação.
4. Ao submeter:
   - `createTask(trimmed)`
   - `closeModal()`
5. `TaskProvider` atualiza `tasks` e o `useEffect` persiste no `localStorage`.

### Update (edição de texto e toggle de conclusão)
**Toggle (completed):**
- Em `TaskItem`, o `Checkbox` chama:
  - `toggleTaskCompletion(task.id)`
- A UI atualiza o estilo:
  - `line-through text-gray-500` se `completed`.

**Edição do título:**
1. Clique no ícone de edição em `IconContainer`.
2. `openEditModal({ id, title })`.
3. `Form` entra em modo edit:
   - preenche o input com `editableTask.title`.
4. Submit:
   - `updateTaskText(editableTask.id, trimmed)`
   - `closeModal()`

### Delete (remoção)
- Em `IconContainer`, clique no ícone de lixeira:
  - `deleteTask(taskId)`
- `TaskProvider` filtra e remove do array.

### Ícones dinâmicos por task e conexão com estado global
Arquivo: `src/components/ui/IconContainer.jsx`

Cada `TaskItem` recebe:
- `task.id` e `task.title`
e repassa para `IconContainer`.

O `IconContainer` conecta ações ao estado global:
- delete → `useTasksContext().deleteTask(taskId)`
- edit → `useModal().openEditModal({ id, title })`

Isso mantém os ícones “burros”: são só disparadores de ações globais.

---

## 5. Modos de Operação: Criação vs Edição

### Coexistência dos modos
O modal opera em dois modos:
- **create**: adicionar nova tarefa
- **edit**: editar tarefa existente

O modo vive no `ModalProvider` (`mode`), garantindo que:
- qualquer componente possa abrir o modal no modo correto,
- o formulário não precisa ser duplicado.

### Como o mesmo formulário se adapta dinamicamente
Arquivo: `src/components/Form.jsx`

O `Form` lê:
- `mode`, `editableTask`, `isOpen`, `closeModal` do `ModalProvider`
- `createTask`, `updateTaskText` do `TaskProvider`

Adaptações:
- `helpText` muda conforme `mode`
- `placeholder` muda conforme `mode`
- lógica de `handleSubmit` muda:
  - `create` → `createTask`
  - `edit` → `updateTaskText`

### Como o estado do modal determina o comportamento do formulário
- Ao abrir modal:
  - `useEffect` decide preencher o input ou limpar
- Ao fechar modal:
  - `useEffect` limpa o input para evitar “vazamento” de estado para a próxima abertura

### Quais estados mudam entre os modos e por quê
- `mode` muda para controlar UI e comportamento
- `editableTask` só existe em edit para:
  - saber qual `id` atualizar
  - prefill do input com o título atual
- `isOpen` controla:
  - exibição do `<dialog>`
  - reset do formulário quando fecha

---

## 6. Decisões Arquiteturais

### EmptyState para ausência de tarefas
Arquivo: `src/components/ui/EmptyState.jsx`

Decisão: quando não existem tarefas, em vez de renderizar colunas vazias, mostra-se uma tela com mensagem e orientação.

**Benefícios:**
- UX mais clara (o usuário entende o que fazer)
- evita UI “morta” (colunas sem conteúdo)

**Trade-off:**
- lógica extra (checagem `isEmpty`), mas centralizada no `TaskSection`.

---

### Compound Components no Modal
Arquivo: `src/components/ui/Modal.jsx`

O modal é estruturado como:
- `Modal.Root`
- `Modal.Header`
- `Modal.Body`
- `Modal.Footer`

**Benefícios:**
- **encapsulamento**: estado e estrutura do modal ficam organizados
- **legibilidade**: a composição em `Toolbar` fica declarativa
- **flexibilidade**: permite rearranjar seções ou trocar conteúdo do body sem reimplementar o modal

**Trade-offs:**
- um pouco mais de “API de componentes” para entender
- exige disciplina para manter contratos (ex.: `form="task-form"` no botão de submit)

Detalhe importante:
- `ModalContent` usa `<dialog>` nativo e sincroniza abertura via `showModal()` / `close()` conforme `isOpen`.
- `onCancel` previne o comportamento padrão do browser para evitar dessincronia e fecha via `closeModal()`.

---

### Componentes de UI reutilizáveis

#### `Button` com variantes
Arquivo: `src/components/ui/Button.jsx`

- Aceita `variant` e aplica estilos via map `variantStyles`.
- Centraliza padrão visual (padding, foco, transições).

> Observação: o componente define `variant="primary"` dentro do `<button>`, o que não é um atributo HTML padrão. Isso não quebra a UI, mas é um “ruído” e poderia ser removido como melhoria.

#### `Typography` para padronização visual e semântica
Arquivo: `src/components/ui/Typography.jsx`

- Mapeia `variant` para uma tag semântica (`h1`, `h2`, `p`, etc.)
- Mapeia `variant` para classes Tailwind

**Benefícios:**
- consistência tipográfica
- semântica HTML mais previsível
- reduz repetição de classes

> Observação: há um provável typo: `vriantToClassName.body` (nome incorreto). Se esse caminho for executado (variant desconhecido), pode causar erro. Como o projeto usa variants existentes, pode não aparecer, mas vale corrigir.

---

### Como as abstrações ajudam na escalabilidade
- Context API isola regras de negócio → UI evolui sem “espalhar” lógica.
- UI components (Button, Input, Typography, Icon etc.) evitam duplicação.
- Modal como compound components facilita novas telas/fluxos com o mesmo container (ex.: confirmação, detalhes).

---

## 7. Melhorias Futuras

### Decomposição de `TaskProvider` e `ModalProvider`
Hoje, ambos providers concentram múltiplas responsabilidades:
- `TaskProvider`: estado + persistência + id generation + selectors (pending/completed)
- `ModalProvider`: estado do modal + modo + entidade editável

Sugestões de evolução:

#### 7.1 Separar persistência do domínio de tarefas
- Extrair um hook: `usePersistedState(key, initialValue)` ou `useLocalStorageState`.
- Benefício: o provider fica focado em regras de tarefas, e a persistência vira detalhe plugável.

#### 7.2 Criar “selectors” e “actions” separadas
- Ex.: `taskSelectors.js` para `pendingTasks/completedTasks`
- Ex.: `taskActions.js` para `create/update/delete/toggle`
- Ou `useTasks()` hook que encapsula tudo e o provider apenas injeta.

#### 7.3 Melhorar geração de ID
Hoje é `maxId + 1`, o que é simples e funcional, mas:
- ids podem crescer indefinidamente
- não lida com merge/concorrência (irrelevante sem backend)
Alternativas:
- `crypto.randomUUID()` (mais robusto, mas muda tipo do id para string).

#### 7.4 Modal: reduzir acoplamento do formulário ao provider
- Extrair hook `useTaskForm()` que:
  - controla input
  - aplica prefill baseado no modo
  - expõe `onSubmit`
- Mantém `Form` mais “presentational”.

#### 7.5 Melhorias de UX (sem inventar feature, apenas possibilidades)
- Confirmação antes de deletar
- Desabilitar submit se não houve mudanças no modo edit
- Feedback visual no toggle (animações/estados)

---

## 8. Conclusão

Este projeto implementa um CRUD de tarefas com:
- **persistência simples** via `localStorage` (+ lazy initialization para performance)
- **Context API** separando domínio (tarefas) e UI
- **modal global com modo create/edit**, reutilizando o mesmo formulário
- **arquitetura de UI madura** com EmptyState e compound components no modal

Pontos fortes:
- separação clara de responsabilidades entre providers e UI
- fluxo de dados fácil de seguir
- componentes reutilizáveis e consistentes

O projeto está bem posicionado para evoluir: com pequenas refatorações (hooks de persistência, decomposição de providers e correções pontuais), pode crescer mantendo previsibilidade e manutenibilidade.