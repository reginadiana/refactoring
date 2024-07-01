📓 [Anotações sobre clean code e clean architecture](https://gist.github.com/reginadiana/331e3c0e9d688d45d40e0c2366803f60)

## refactoring

Projeto para explorar os conceitos de refatoração, clean architecture e TDD

## setup

```bash
yarn install
```

```bash
yarn build
```

Para iniciar o servidor:

```bash
yarn run dev
```

Para executar os testes, execute o comando abaixo com o servidor em execução:

```bash
yarn test
```

Para inicializar o banco de dados: 

```bash
docker-compose up
```

Para para o docker: 

```bash
docker-compose down
```

Para parar processos antigos:

```bash
sudo lsof -i :3000
```

```bash
kill -9 <PID>
```

--- 

### [28/06/2024] - Minhas decisões tecnicas

- Dividi as camadas de application, drive e resource em pastas separadas.
- Cada camada possui uma pasta de arquivos de teste, porém 2 testes de sucesso da camada de driver
dependendem da camada de resource. Acho que isso nao deveria acontecer, deveriamos mocar a camada de 
resource e ter um teste e2e ou integração com os dois. 
- A camada de resource foi divida em um arquivo de configuração que trata da conexão e desconexão com o banco, outro arquivo para as queries e outro para validar e chamar a query de criação.
- A camada de driver foi divida em um arquivo de configuração que abre a conexão e desconexão com o servidor, lida com as portas, ouve o servidor, etc.
- A camada de aplication valida os parametros e chama o serviço de `/sign-up` na camada de driver
- As validaçoes em todas as camadas foram lidadas com `throw new Error` e `try catch`.
- Removi os erros em números e os transformei e em mensagens descritivas para melhor entendimento do que
aconteceu.
- Movi as regex para um arquivo separado dentro de seu contexto para melhorar a legibilidade do código.
- Adicionei uma validação na tabela do banco tornando emails unicos, visto que essa validação estava 
sendo feita apenas nas regras de negocio.
- É uma hipotese, mas acredito que não precisamos dos parametros `isPassenger` e `isDriver`, podemos 
ter um ou outro.
--- 

### [01/07/2024] - Decisões técnicas do Branas/O que podemos melhorar

- Criar endpoint de GET para accounts p/ verificar se conta foi realmente criada, nao confiar no resultado da response. O mesmo vale para a camada de resource
- Separar os testes por camadas. Ex: na camada de `application`, nao faz sentido termos testes que envolvem servidor, resposta, axios, etc 
