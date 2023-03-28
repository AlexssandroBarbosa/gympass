# App

Gympass style app.

## RFs (Requisitos Funcionais)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [] Deve ser possível obter o numero de check-ins realizados pelo usuário
- [] Deve ser possível o usuário obter o historico de check-ins;
- [] Deve ser possível o usuário buscar academias proximas
- [] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário relizar check-in em uma academia
- [] Deve ser possível o usuário validar o check-in de um usuário
- [x] Deve ser possível cadastrar uma academia.



## RNs (Regras de Negócio)

- [x] O usuário não pode se cadastrar com emails duplicados
- [x] O usuário não pode fazer 2 check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver a 100 metros da academia
- [] O check-in so pode ser validado apos 20 minutos apos criado
- [] O check-in so pode ser validado por admministradores
- [] A academia so pode ser cadastrada por administradores


## RNFs (Requisitos não-funcionais)

- [] A senha do usuario precisa estar criptografadas
- [] Os dados da aplicacao precisam estar persistidas em um banco PG
- [] Todas as listas de dados precisam estar paginadas com 20 items por página
- [] O usuário deve ser identificado por um JWT (JSON Web Token)

