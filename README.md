# 🚀 TechEvents - Plataforma de Gestão de Eventos Full Stack

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-17-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🎯 Sobre o Projeto

**TechEvents** é uma solução corporativa de ponta a ponta para gestão de eventos tecnológicos. Projetada com foco em escalabilidade e experiência do usuário, a plataforma integra um **Portal Público** de alta performance (React) para descoberta de eventos e um **Painel Administrativo** robusto (Angular) para gestão estratégica.

Tudo isso é orquestrado por um **Backend** construído sobre os princípios de **Clean Architecture** (Spring Boot), garantindo desacoplamento, testabilidade e fácil manutenção, com persistência de dados segura e containerizada (Docker/PostgreSQL).

---

## 🏗️ Arquitetura do Sistema

```mermaid
graph TD
    User[👤 Usuário Público] -->|Acessa| React[⚛️ Portal Público (React)]
    Admin[👔 Administrador] -->|Gerencia| Angular[🅰️ Painel Admin (Angular)]
    
    React -->|Consome JSON| API[☕ Backend API (Spring Boot)]
    Angular -->|Consome JSON| API
    
    API -->|Persiste Dados| DB[(🐘 PostgreSQL)]
    
    subgraph Docker Infrastructure
        DB
    end
```

---

## ✨ Principais Funcionalidades (Key Features)

### ☕ Backend (Core)
*   **Clean Architecture:** Separação clara entre Domínio, Aplicação e Infraestrutura.
*   **API RESTful:** Endpoints padronizados para CRUD de eventos.
*   **Data Persistence:** PostgreSQL 16 rodando via Docker Compose.
*   **Segurança & Configuração:** CORS configurado para múltiplos ambientes.
*   **Qualidade & CI/CD:** Testes Unitários (JUnit 5 + Mockito) e Pipeline automatizada (GitHub Actions).

### ⚛️ Frontend Público (React)
*   **Design System Moderno:** Interface inspirada em plataformas SaaS/Luma.
*   **Mobile-First:** Layout 100% responsivo com Menu Hambúrguer e Grids adaptáveis.
*   **Integração Robusta:** Tratamento de erros de API e integração de imagens.
*   **UX Aprimorada:** Feedback visual com Toastify e Skeleton Loaders.

### 🅰️ Frontend Admin (Angular)
*   **Dashboard Executivo:** Visualização rápida de KPIs e métricas.
*   **Gestão Completa:** Tabelas estilizadas com paginação e ações de CRUD.
*   **Navegação SPA:** Roteamento fluido com Lazy Loading e Sidebar responsiva.
*   **Feedback Visual:** Loading Interceptors (Barra de progresso global), Validação de Formulários e SnackBars.

---

## 🚀 Como Executar (Getting Started)

Siga os passos abaixo para rodar a aplicação completa em seu ambiente local.

### Pré-requisitos
*   Docker & Docker Compose
*   Java JDK 21
*   Node.js 20+

### Passo 1: Infraestrutura (Banco de Dados)
Suba o container do PostgreSQL:
```bash
docker compose up -d
```

### Passo 2: Backend (API)
Inicie o servidor Spring Boot:
```bash
mvn spring-boot:run
```
*O servidor iniciará em `http://localhost:8080`*

### Passo 3: Frontends
Em terminais separados, inicie as interfaces:

**Portal Público (React):**
```bash
cd frontend-public
npm install
npm run dev
```
*Acesse em `http://localhost:5173`*

**Painel Admin (Angular):**
```bash
cd frontend-admin
npm install
npm start
```
*Acesse em `http://localhost:4200`*

---

## 📸 Galeria

### 🖥️ Dashboard Administrativo
![Dashboard Screenshot](https://via.placeholder.com/800x450?text=Screenshot+Dashboard+Admin)

### 🌐 Portal de Eventos
![Portal Screenshot](https://via.placeholder.com/800x450?text=Screenshot+Portal+Publico)

### 📱 Responsividade Mobile
![Mobile Screenshot](https://via.placeholder.com/300x600?text=Mobile+View)
