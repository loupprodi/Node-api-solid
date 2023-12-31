# App

GymPass style app.

# comandos:
Obs: tsup faz a conversão do arquivo ts em js, pois o node nao executa codigos nativamente em typescript
> npm i typescript @types/node tsx tsup -D

Cria o tsconfig: onde target foi atualizado para o ECMAScript 2020
> npx tsc --init

bibliteca responsavel pelo Ambiente.
> npm i dotenv

biblioteca para validação de schemas e dados
> npm i zod
site: -[zod documentation](https://zod.dev/)

biblioteca prisma depdencia de desenvolvimento
> npm i prisma -D

short handle para executar o prisma
> npx prisma

inicializando o prisma
> npx prisma init

gerar a tipagem do typescript criando a model
> npx prisma generate

dependencia de produção para acessar o banco de dados, prisma cliente
> npm i @prisma/client

gera o controle de versão do prisma, roda as migrations
> npx prisma migrate dev

gera o controle de versão do prisma, roda as migrations produção
> npx prisma migrate deploy

comando para rodar o studio prisma
> npx prisma studio

install biblioteca de dias do Javascript
> npm i dayjs


```sh
 docker run --name api-solid-pg -e POSTGRESQL_USERNAME=root -e POSTGRESQL_PASSWORD=root1234 -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
 ```
 instalar biblioteca responsal pela criptação da senha
> npm i bcryptjs

typescript da biblioteca 
> npm i -D @types/bcryptjs

### Testes
biblioteca de testes junto com a biblioteca para entender os paths criado no tsconfig
> npm i vitest vite-tsconfig-paths -D

biblioteca para visualização dos teste
> npm i -D @vitest/ui

## TDD -> Test-driven development

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o numero de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuario buscar academias próxima;
- [ ] Deve ser possível o usuário buscar academia pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] o Usuário não deve poder se cadastrar com e-mail duplicado;
- [x] o Usuário nao pode fazer 2 check-ins no mesmo dia;
- [ ] o Usuário nao pode fazer check-in se não estiver perto (100m) da academia;
- [ ] o Check-in só pode ser validado até 20 minutos após criado;
- [ ] o Check-in so pode ser validado por administradores; (autorização)
- [ ] a Academia so pode ser cadastrada por administradores;

## RFs (Requisitos não-funcionais)

- [x] a senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistido em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por paginas;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);

## Tecnologias utilizada

### front-end

### Back-end

-Biblioteca  NodeJs

### Desenvolvido por

Luiz Prosdoskimi
