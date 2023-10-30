# App


GymPass style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o numero de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuario buscar academias próxima;
- [ ] Deve ser possível o usuário buscar academia pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] o Usuário não deve poder se cadastrar com e-mail duplicado;
- [ ] o Usuário nao pode fazer 2 check-ins no mesmo dia;
- [ ] o Usuário nao pode fazer check-in se não estiver perto (100m) da academia;
- [ ] o Check-in só pode ser validado até 20 minutos após criado;
- [ ] o Check-in so pode ser validado por administradores; (autorização)
- [ ] a Academia so pode ser cadastrada por administradores;

## RFs (Requisitos não-funcionais)

- [ ] a senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistido em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por paginas;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
