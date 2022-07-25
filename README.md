# <p align = "center"> RepoProvas API </p>

<p align="center">
   <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f5c3-fe0f.svg" alt="RepoProvas API" width="300" />
</p>

## :pick: Ferramentas
<div>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" height="30px"/>
</div>

---

## :clipboard: Descrição

O RepoProvas é um sistema de compartilhamento de provas entre estudantes. Onde é possivel adicionar provas separadas por disciplinas, professores e períodos.

---

## :computer: Tecnologias e Conceitos

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- Postgres and Prisma

---

## :rocket: Rotas

```yml
POST /sign-up
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body:{
        "email": "lorem@gmail.com",
        "password": "loremipsumloremipsum",
        "confirmPassword": "loremipsumloremipsum"
}
```

```yml
POST /sign-in
    - Rota para fazer login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "senha": "loremipsumloremipsum"
    }
```

```yml
POST /post-exam
    - Rota para cadastrar uma nova prova
    - headers: {
        "Authorization": "Bearer <token>"
    }
    - body: {
        "name": "Prova de Matemática",
        "pdfUrl": "https://www.linkdopdf.com/arquivo.pdf",
        "categoryId": 1,
        "teacherId": 1,
        "disciplineId": 1
    }
```

```yml
GET /exams-disciplines
    - Rota para listar todas as provas agrupados por período e disciplinas
    - headers: {
        "Authorization": "Bearer <token>"
    }
```

```yml
GET /exams-teachers
    - Rota para listar todas as provas agrupados por pessoa instrutora
    - headers: {
        "Authorization": "Bearer <token>"
    }
```

---

## 🏁 Rodando a aplicação

Primeiro, faça o clone desse repositório na sua maquina:

```
git clone https://github.com/matheuslnmoura/projeto20-repoprovas
```

Depois, dentro da pasta, rode o seguinte comando para instalar as dependencias.

```
npm install
```

Depois, dentro da pasta, rode o seguinte comando para instalar criar e popular o banco de dados.

```
npx prisma migrate dev
```

Finalizado o processo, é só inicializar o servidor

```
npm run dev
```
