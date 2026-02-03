# 🚀 TechEvents - Plataforma de Eventos Full Stack (Dockerized)

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Docker Compose](https://img.shields.io/badge/Docker-Compose-2496ED)
![Angular](https://img.shields.io/badge/Angular-17+-red)
![React](https://img.shields.io/badge/React-Vite-61DAFB)

## 📋 Sobre o Projeto

O **TechEvents** é uma solução completa para gestão de eventos, projetada para demonstrar **Arquitetura de Software Sênior**.

O sistema implementa uma **Clean Architecture** no Backend, persistência robusta com **PostgreSQL via Docker**, e serve duas interfaces distintas simultaneamente, ambas **100% Responsivas (Mobile-First)**:

1.  **Backoffice (Angular):** Painel administrativo moderno estilo SaaS com Dashboard, KPIs e navegação adaptável.
2.  **Portal Público (React):** Interface de alta performance para o usuário final com UX refinada e design system "Eventure".

---

## 🏗️ Arquitetura e Infraestrutura

O projeto foi evoluído de um banco em memória para uma infraestrutura containerizada, garantindo persistência e consistência de dados.

```mermaid
graph TD
    User[Usuário Final] -->|React Portal (Mobile/Desktop)| API
    Admin[Administrador] -->|Angular Admin (Responsive)| API
    subgraph Infrastructure [Docker & Backend]
        API[Java Spring Boot API] -->|JPA/Hibernate| DB[(PostgreSQL Container)]
    end
```

### 🛠️ Tech Stack
*   **Core:** Java 21, Spring Boot 3
*   **Database:** PostgreSQL 16 (Imagem Alpine rodando no Docker)
*   **Admin Frontend:** Angular 17+ (Material Design, Router SPA, Responsive Sidenav, KPIs)
*   **Public Frontend:** React + Tailwind CSS (Responsive Grid, Mobile Menu, Modern UI Kit)
*   **DevOps:** Docker Compose para orquestração de ambiente

---

## 🚀 Como Rodar o Projeto (Setup Profissional)

### Pré-requisitos
*   Docker Desktop instalado e rodando.
*   Java 21 e Maven.
*   Node.js.

### 1️⃣ Subindo a Infraestrutura (Banco de Dados)
Não é necessário instalar o PostgreSQL na sua máquina. O Docker resolve tudo. Na raiz do projeto, execute:

```bash
docker compose up -d
# Isso baixará a imagem do Postgres e iniciará o banco na porta 5432.
```

### 2️⃣ Rodando o Backend (API)

```bash
# Na raiz do projeto (onde está o pom.xml)
mvn clean spring-boot:run
# O sistema conectará automaticamente ao Docker e criará as tabelas.
# API disponível em: http://localhost:8080
```

### 3️⃣ Rodando os Frontends

**Admin (Angular):**

```bash
cd frontend-admin
npm start
# Acesso: http://localhost:4200
```

**Portal (React):**

```bash
cd frontend-public
npm run dev
# Acesso: http://localhost:5173
```

---

## 🌟 Diferenciais e Funcionalidades

### 📱 Responsividade & Mobile-First (Novo!)
*   **React Portal:** 
    *   Navbar adaptável com **Menu Hambúrguer** para dispositivos móveis.
    *   Grid de eventos fluido (1 coluna no mobile, 2 no tablet, 3-4 no desktop).
*   **Angular Admin:**
    *   **Sidebar Inteligente:** Fixa no desktop, transformando-se em Drawer (menu lateral deslizante) no mobile.
    *   **Toolbar Dinâmica:** Botão de menu exclusivo para telas pequenas.
    *   **Layout Flexível:** Tabelas com scroll horizontal e KPIs que se empilham verticalmente.

### 🎨 Frontend Público (React)
*   **Design System Moderno:** Interface estilo SaaS ("Eventure") focada em conversão.
*   **UX Aprimorada:** Feedback visual nos botões, sombras suaves e layout responsivo.
*   **Integração Visual:** Renderização de cards com imagens de capa via URL.

### 💼 Backoffice (Angular)
*   **Dashboard Executivo:** Visão geral com Cards de Métricas (KPIs) e status do sistema.
*   **Navegação SPA:** Roteamento fluido via **Angular Router** (sem recarregar a página) entre Dashboard, Gestão de Eventos e Configurações.
*   **Fluxo de Navegação Completo:** Integração bidirecional com o Portal Público (Login/Logout).
*   **Sidebar Dinâmica:** Menu lateral com indicação de rota ativa (`routerLinkActive`).
*   **CRUD Completo:** Criação e listagem de eventos integrada ao Backend.

### ⚙️ Backend & Infraestrutura
*   **Persistência Real:** Migração de H2 para PostgreSQL para garantir integridade de dados.
*   **Containerização:** Uso de Docker Compose para setup de ambiente em um comando.
*   **Clean Code:** Arquitetura Hexagonal com separação clara de responsabilidades (Domain, Infrastructure, Application).
*   **Segurança:** Estratégia CORS configurada para permitir múltiplos clientes simultâneos.

---

## 👨‍💻 Autor
Desenvolvido por **Filipi Moraes**
Engenheiro de Software | Java Full Stack