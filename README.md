## Run project:

1. Open terminal and clone repository.
2. Create **.env** file in the root folder:

_The idea with .env file is to make sure the project depends on process variables which can be set by execution environment (e.g. containers)_

```
COMPOSE_PROJECT_NAME=vial
SERVICE_NAME=vial
DB_NAME=vial
DB_USER_NAME=vial-admin
DB_USER_PASSWORD=vial999999
DB_PORT=5432
API_VERSION=v1
API_SERVER_PORT=4500
TZ=UTC
WEB_SERVER_PORT=8000
WEB_API_URL=http://localhost:4500/v1
```

3. Run `docker compose up` command _please, make sure docker is running_. It will pull and start postgres database on port `5432`, create `vial_postgres` volume, create `vial_api` and `vial_web` images, and start API server on port `4500` and Web server on port `8000`.
4. Open new terminal, navigate to `api` folder where `package.json` is located.
5. Run `pnpm i` _please, install pnpm globally if not installed yet_
6. Run `pnpm init-db:dev`. This will create database schema.
7. Open browser and enter `http://localhost:8000`

## API project scripts in package.json

- `init-db:dev` - create database table;
- `start` - used by docker to start API server;
- `start:dev` - start API server locally outside of docker (for local development);
- `prettier` - prettify all files;
- `test` - run all tests;

## Web project scripts in package.json

- `dev` - run web server locally in dev mode;
- `build` - build web app and store in dist folder;
- `preview` - start web server on compiled version from dist folder;
- `prettier` - prettify all files;

## Stack

- Backend stack: `Docker Compose`, `PostgreSQL`, `pnpm`, `NodeJS 20+`, `ExpressJS`, `zod` schema validator, `xss` filter, `winston` logger, `TypeORM` framework, `TypeScript`, `tsx` transpiler, `jest`;
- Frontend stack: `Vite + SWC`, `React 18`, `Unocss`, `CSS Modules`, `Mantine UI`;

## Backend implementation details

- Feature sliced approach: code base is split on self sufficient high cohesive parts **features** which can be hidden behind `feature flags` and merged into main repo even when implementation is not completed. It simplifies development process and repository management (no need to rebase from outdated codebase).
- Follow **Clean Architecture** approach:
  - **Infrastructure** folder contains `framework | lib | database type  | data source | connection and other` implementation specific code. This can be changed without affecting business logic (i.e. use cases, domain model).
  - **Presentation** folder contains HTTP related code: route definitions and request validation code.
  - **Domain** contains DTOs, persistence entities, use cases, and domain models.
- Validating path params, query params, and `PUT/POST` request body.
- In order to get all benefits from TS (and path aliases in particular) the code is executed as TS in NodeJS under super fast `ESBuild` based **tsx** transpiler.

## Frontend implementation details

- Separation of concerns in components: presentation is separated from code via dedicated hooks. Components only receive props and handlers.
- Hooks follow SRP principle.
- Feature sliced design.
- View model concept:
  - View model contract defines what will be displayed in component;
  - View model may differ from DTO and contain formatted values (e.g. dates and numbers) to be presented to a customer;
  - DTO -> view model mappers;
  - Segregate presentation from backend contracts. It simplifies front end development when backend is not ready. Only mappers are subject to change.

## API Reference

### /subjects

#### Get all subjects:

- **GET** `http://localhost:4500/v1/subjects?take=100&skip=0&sortby=&sortorder=` where `take` and `skip` are used for paging. `take` max value is `1000`. `sortby` is column name to sort by. `sortorder` is sort direction (asc or desc).

#### Get subject by id:

- **GET** `http://localhost:4500/v1/subject/:id` where `:id` is subject id which can be found in database or in **POST** response. E.g. `http://localhost:4500/v1/subject/00138d06-d0e2-441d-8b84-083ee22b2c29`.

#### Create new subject:

- **POST** `http://localhost:4500/v1/subject`

Request example:

```
Header:
Content-Type: application/json

Request body:
{
    "name": "Some Name",
    "sex": "female",
    "status": "in_progress",
    "diagnosisDate": "2024-06-21T04:00:00.000Z"
}
```

#### Update existing subject:

- **PUT** `http://localhost:4500/v1/subject/:id` where `:id` is subject id which can be found in database or in **POST** response. E.g. `http://localhost:4500/v1/subject/00138d06-d0e2-441d-8b84-083ee22b2c29`

Request example:

```
Header:
Content-Type: application/json

Request body:
{
    "name": "Some Name",
    "sex": "female",
    "status": "in_progress",
    "diagnosisDate": "2024-06-21T04:00:00.000Z"
}
```

- **DELETE** `http://localhost:4500/v1/subject/:id` where `:id` is subject id which can be found in database or in **POST** response. E.g. `http://localhost:4500/v1/subject/00138d06-d0e2-441d-8b84-083ee22b2c29`

## API version

API urls have **version** prefix for seamless migration on newer versions when both old and new versions should be served together during API upgrade. The version is stored in `API_VERSION` environment.

## Considerations and limitations

- Authentication is not implemented for simplicity.

## Recommended IDE

It is recommended to use VSCode with the following plugins installed:

- **ESLint** `https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint`
- **Prettier** `https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode`
- **Trailing Spaces** `https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces`
- **Code Spell Checker** `https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker`
