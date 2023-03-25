# EVA - UNI

>EVA -> Entorno Virtual de Aprendizaje *(Virtual Learning Environment)*

A kind of LMS for my university, inspired by the university's current "EVA".

# Why?

Although my university uses Moodle as LMS, I didn't care and wanted to reinvent the wheel, so here it is, a project for me to spend time on.

# Screenshot
![Main page](https://media.discordapp.net/attachments/982436046056857620/1053187774393634856/image.png?width=936&height=454)

# Made with
These are the technologies used to develop this project

## Programming language and runtime
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

## Backend / Server
### Web server
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)



### Data management
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

### Authentication
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### Cache layer
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)

### Unit testing
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

### Linting
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

### Environment preparation
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

## Frontend
### JS framework
![React](https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
### CSS framework
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Answering about tech stack
### Why Fastify?
Fastify is one of the fastest web servers for Node.js, and it's also very easy to use. It's also very lightweight, which is a good thing for a server that will be running 24/7.

### Why NestJS?
NestJS is one of the best frameworks for Node.js for building scalable and maintainable backend applications. It's have a lot of features to make life easier and i like its DI system.

### Why Prisma?
IDK, i just like it. It's very easy to use and strong typed.

### Why NextJS and TailwindCSS?
Well, i select Nextjs since it's the most popular framework for React (it's used by Big companies like Netflix, Vercel, etc) for building fast, scalable and maintainable frontend applications. TailwindCSS is a utility-first CSS framework for rapidly building custom designs and i dont select bootstrap since i dont like write a lot of CSS for simple comoponents.

## Setup

### Prerequisites
- Docker
- Node.js

### Installation
1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Install docker containers
```bash
docker-compose up -d
```
4. Push changes to database
```bash
npx prisma migrate dev --name init
```
5. Run the backend
```bash
npx moon run server:dev
```
6. Run the frontend (in another terminal)
```bash
npx moon run client:dev
```

and you're done! The frontend will be running on http://localhost:3000 and the backend on http://localhost:3001

## Future plans

- [ ] Add a notification system (for example, when a new assignment is published)
- [ ] Maybe add a chat system
- [ ] Unit testing for the backend (I'm thinking how to do it)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.