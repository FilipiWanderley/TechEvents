# 🚀 TechEvents - Plataforma de Gestão de Eventos Full Stack

![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green)
![Angular](https://img.shields.io/badge/Angular-17+-red)
![React](https://img.shields.io/badge/React-Vite-blue)
![Clean Architecture](https://img.shields.io/badge/Clean-Architecture-purple)

## 📋 Sobre o Projeto

O **TechEvents** é uma solução completa para gerenciamento de eventos de tecnologia, desenvolvida para demonstrar a aplicação de **Clean Architecture** e microsserviços em um ecossistema Full Stack.

O projeto destaca a capacidade de um único **Backend robusto em Java** servir dados simultaneamente para duas interfaces distintas:
1.  **Backoffice (Angular):** Painel administrativo para criação e gestão de eventos.
2.  **Portal Público (React):** Landing page performática para exibição de eventos aos usuários.

---

## 🛠️ Tecnologias Utilizadas

### ☕ Backend (API REST)
* **Linguagem:** Java 21
* **Framework:** Spring Boot 3
* **Arquitetura:** Clean Architecture (Hexagonal), separando Domínio, Casos de Uso e Adaptadores.
* **Banco de Dados:** H2 (In-memory para desenvolvimento rápido).
* **Destaques:** Validação de DTOs, Tratamento global de erros, Configuração avançada de CORS para múltiplos clientes.

### 🅰️ Frontend Admin (Backoffice)
* **Framework:** Angular (Latest)
* **Estilização:** Angular Material (Design System corporativo).
* **Funcionalidades:** Formulários reativos, comunicação HTTP com tratamento de erros, listagem dinâmica.

### ⚛️ Frontend Público (Portal)
* **Biblioteca:** React.js com Vite + TypeScript.
* **Estilização:** Tailwind CSS (Para alta performance e design moderno).
* **Funcionalidades:** Consumo de API via Hooks personalizados, Renderização de Cards responsivos.

---

## 🏗️ Arquitetura do Sistema

O projeto segue estritamente os princípios da **Clean Architecture**, garantindo que as regras de negócio (Domain) não dependam de frameworks ou bibliotecas externas.

```mermaid
graph TD
    User_React[Usuário (Portal React)] -->|HTTP GET| API
    Admin_Angular[Admin (Painel Angular)] -->|HTTP POST/GET| API
    subgraph Backend [Java Spring Boot]
        API[Controller / API] --> UseCases[Casos de Uso]
        UseCases --> Domain[Entidades de Domínio]
        UseCases --> Port[Portas de Saída]
        Port --> Database[(Banco de Dados H2)]
    end
```

## 📸 Screenshots

### 1. Painel Administrativo (Angular)
Interface focada em produtividade para criação de eventos.
![Admin Screen](./screenshots/admin-angular.png)

### 2. Portal Público (React)
Interface focada na experiência do usuário final.
![Portal Screen](./screenshots/portal-react.png)

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* Java 21 JDK
* Node.js & npm
* Maven

### 1️⃣ Rodando o Backend (Java)
```bash
# Na raiz do projeto (onde está o pom.xml)
mvn clean spring-boot:run
# O servidor iniciará em: http://localhost:8080
```

### 2️⃣ Rodando o Backoffice (Angular)
```bash
cd frontend-admin
npm install
npm start
# O painel abrirá em: http://localhost:4200
```

### 3️⃣ Rodando o Portal Público (React)
```bash
cd frontend-public
npm install
npm run dev
# O portal abrirá em: http://localhost:5173 (ou porta similar)
```

## 🧠 Desafios Superados & Aprendizados

* **Política de CORS:** Configuração de segurança no Spring Boot para permitir requisições de origens distintas (Angular na porta 4200 e React na 5173) simultaneamente.
* **Clean Architecture:** Implementação de Portas e Adaptadores para desacoplar o Core Business do Framework Web.
* **Gestão de Estado:** Manipulação de dados assíncronos tanto no Angular (RxJS) quanto no React (Hooks).

## 👨‍💻 Autor

Desenvolvido por **Filipi Moraes**
Full Stack Developer | Java & JavaScript Enthusiast

---

### 💡 Dica do Tech Lead:

Para deixar esse README matador no GitHub:
1.  **Crie uma pasta** chamada `screenshots` na raiz do projeto.
2.  Coloque as imagens que você me mandou lá (renomeie para `admin-angular.png` e `portal-react.png`).
3.  No README, onde escrevi "*(Insira aqui o print...)*", troque por:
    `![Admin Screen](./screenshots/admin-angular.png)`
