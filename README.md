## Tecnologias usadas

  <a href="https://go-skill-icons.vercel.app/">
    <img src="https://go-skill-icons.vercel.app/api/icons?i=typescript,nodejs,nestjs,git,yarn,jest,githubactions,swagger" alt="typescript,nodejs,nestjs,git,yarn,jest,githubactions,swagger" />
  </a>

<br>
<br>
<br>

# Setup do Projeto

## Configuração do Ambiente

1. Mude o arquivo `.env.example` para `.env`:

   ```bash
   cp .env.example .env
   ```

2. Preencha as variáveis de ambiente com os valores necessários:

   - `DATABASE_URL`: Caminho do banco de dados SQLite. Use o valor padrão `file:./dev.db`.
   - `APP_PORT`: Porta na qual a aplicação será executada. Exemplo: `3000`.
   - `JWT_SECRET`: Segredo do token JWT.
   - `JWT_EXPIRES_IN`: Dias de expiração do token JWT.
   - `NODE_ENV`: Ambiente na qual você está executando o código.
   - `OPEN_WEATHER_API_KEY`: API_KEY da OpenWeatherAPI.
   - `OPEN_WEATHER_API_BASE_URL`: URL base da OpenWeatherAPI.

3. Instale as dependências (Usei o yarn, mas, sinta-se livre para usar o npm):

   ```bash
   npm install
   ```

4. Execute as migrações do Prisma para configurar o banco de dados:

   ```bash
   npx prisma migrate dev
   ```

5. O servidor já está pronto para ser executado. Caso der o seguinte erro:

   PrismaClientInitializationError: error: Error validating datasource `db`: the URL must start with the protocol `file:`.
   --> schema.prisma:13
   |
   12 | provider = "sqlite"
   13 | url = env("DATABASE_URL")

   ## Execute esse Comando:

   ```
   export DATABASE_URL="file:./dev.db" && npm run start:dev
   ```

## Para ligar o servidor de desenvolvimento

```bash
# Servidor padrão
npm run start

# Escutando alterações dos arquivos
npm run start:dev
```

## Para rodar os testes

```bash
npm run test

# Escutando alterações dos arquivos
npm run test:watch
```

## Cobertura de testes

```bash
npm run test:cov
```

## Ver tabelas no prisma

```bash
npx prisma studio
```

## Documentação das rotas

```bash
open http://localhost:3000/api/
```
