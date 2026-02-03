# PRD: TechEvents Enterprise Ecosystem

## 1. Visão Geral e Objetivo Estratégico
Este projeto consiste no desenvolvimento de uma arquitetura de referência para gestão de eventos técnicos ("TechEvents"). O objetivo principal é demonstrar a implementação de padrões de Engenharia de Software de Alto Nível, focando em três pilares:

*   **Robustez de Backend:** Implementação de uma API Java Enterprise agnóstica, escalável e testável.
*   **Arquitetura Limpa:** Aplicação estrita de Arquitetura Hexagonal (Ports & Adapters) para desacoplamento de regras de negócio e infraestrutura.
*   **Interoperabilidade de Clientes:** Orquestração de múltiplos frontends (Angular para Backoffice Corporativo e React para Portal Público) consumindo uma única fonte de verdade, simulando um ambiente corporativo heterogêneo.

## 2. Stack Tecnológica
A escolha das tecnologias visa refletir um ambiente de produção moderno, unindo estabilidade corporativa e performance moderna.

### Backend
*   **Linguagem:** Java 17 (LTS)
*   **Framework:** Spring Boot 3.2+
*   **Persistência:** Spring Data JPA, H2 Database (Dev)
*   **Containerização:** Docker

### Frontend Administrativo (Backoffice)
*   **Framework:** Angular 17+ (Standalone Components, Signals)
*   **UI Library:** Angular Material (Padrão Enterprise para acessibilidade e consistência)
*   **Ícones:** Material Symbols

### Frontend Público (Portal)
*   **Framework:** React 18+ (Vite, TypeScript)
*   **Estilização:** TailwindCSS com componentes estilo Shadcn/ui
*   **Ícones:** Lucide React

### Documentação & Qualidade
*   Swagger (OpenAPI 3.0)
*   JUnit 5
*   Mockito

## 3. Especificações do Backend (Core)
O Backend é o componente crítico e deve operar como uma API Rest pura e desacoplada.

### 3.1. Arquitetura e Organização
*   **Padrão:** Arquitetura Hexagonal (Ports & Adapters).
*   **Restrição Crítica (Domain Isolation):** O pacote `domain` **NÃO** deve conter dependências de frameworks externos (proibido anotações do Spring, JPA ou Jackson nas entidades de domínio).
*   **Portas e Adaptadores:**
    *   Interfaces (`Ports`) definem contratos.
    *   Implementações (`Adapters`) residem na camada de infraestrutura.

### 3.2. Estrutura de Diretórios Obrigatória
```plaintext
src/main/java/com/techevents
├── domain                 # Núcleo da Aplicação (Regra de Negócio Pura)
│   ├── model              # Entidades Puras (POJOs)
│   ├── port               # Interfaces (In/Out)
│   │   ├── in             # Use Cases (ex: CreateEventUseCase)
│   │   └── out            # Portas de Saída (ex: EventRepositoryPort, StoragePort)
│   └── service            # Implementação das Regras de Negócio
├── application            # Camada de Aplicação (Opcional/Orquestração)
├── infrastructure         # Camada de Detalhes Técnicos (Frameworks)
│   ├── config             # Configurações (Beans, Swagger, Security, CORS)
│   ├── in                 # Adaptadores de Entrada
│   │   └── api            # RestControllers, DTOs (Request/Response), Mappers
│   └── out                # Adaptadores de Saída
│       ├── persistence    # Entidades JPA, Spring Data Repositories
│       └── storage        # Implementação de Upload (Local/S3)
```

### 3.3. Requisitos Funcionais e Técnicos (Backend)
*   **API RESTful:** Endpoints devem retornar apenas DTOs (Records), nunca Entidades de Domínio ou JPA.
*   **Tratamento de Exceções:**
    *   Implementar `@ControllerAdvice` global.
    *   Padronização de respostas de erro conforme RFC 7807 (Problem Details).
*   **Configuração de CORS:**
    *   Configurar `WebMvcConfigurer` para permitir explicitamente as origens: `http://localhost:4200` (Angular) e `http://localhost:5173` (React).
*   **Preparação para Cloud (AWS):**
    *   Criar interface `StoragePort` no domínio.
    *   Implementar `LocalFileStorageAdapter` para o ambiente de desenvolvimento.
    *   Deixar classe placeholder `S3StorageAdapter` comentada para demonstrar prontidão para nuvem.

## 4. Especificações do Frontend 1: Backoffice (Angular)
*   **Contexto:** Painel Administrativo Corporativo. Foco em segurança e formulários robustos.
*   **Arquitetura:** Baseada em Services injetáveis e Standalone Components.
*   **UX/UI System:**
    *   **Angular Material:** Utilizar componentes nativos (`MatInput`, `MatSelect`, `MatDatepicker`, `MatCard`).
    *   **Feedback:** Utilizar `MatSnackBar` para notificações de sucesso/erro.
    *   **Listagem:** Utilizar `MatTable` com cabeçalho e estilização padrão.
*   **Funcionalidades:**
    *   **Dashboard:** Tabela de eventos cadastrados.
    *   **Cadastro:** Formulário reativo (`ReactiveFormsModule`) com validações estritas.
*   **Destaque Técnico:**
    *   Uso de `Signals` para gerenciamento de estado reativo.
    *   Interceptors HTTP para tratamento global de erros.

## 5. Especificações do Frontend 2: Portal Público (React)
*   **Contexto:** Vitrine de eventos para o usuário final. Foco em design moderno e performance.
*   **Arquitetura:** Functional Components com Hooks customizados.
*   **UX/UI System:**
    *   **TailwindCSS:** Para layout e responsividade rápida.
    *   **Shadcn-like Components:** Componentes modulares com visual clean (bordas arredondadas, sombras suaves, tipografia Inter/Sans).
    *   **Lucide React:** Ícones SVG otimizados.
    *   **Loading States:** Uso de `Skeleton Screens` (esqueletos de carregamento) durante o fetch de dados.
*   **Funcionalidades:**
    *   **Vitrine:** Grid responsivo de Cards (`<EventCard />`).
    *   **Detalhes:** Modal ou página dedicada para visualização.
*   **Destaque Técnico:**
    *   Criação de Custom Hook `useFetchEvents()` para abstrair a lógica de API.

## 6. Fluxo de Validação e Critérios de Aceite
*   **Build:** O projeto deve compilar sem erros (Maven para Java, NPM para Frontends).
*   **Integração:** Um evento criado no painel Angular deve aparecer imediatamente no portal React após atualização.
*   **Documentação:** A URL `/swagger-ui.html` deve expor a documentação interativa da API.
*   **Qualidade de Código:** O código deve conter comentários explicativos sobre decisões arquiteturais (ex: "Isolamento de domínio", "Injeção de Dependência via Construtor").

## 7. Diretrizes de Desenvolvimento
*   **Comentários:** Devem ser diretos e profissionais, focados no "Porquê" da decisão arquitetural.
*   **Variáveis:** Em inglês (`eventRepository`, `uploadService`).
*   **Commits:** Seguir padrão Conventional Commits (ex: `feat: implement hexagonal architecture structure`).
