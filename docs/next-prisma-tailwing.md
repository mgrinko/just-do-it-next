# Setup Next.js with Tailwind, Prisma and Google Auth

## Create Next App

Create a [new Next.js App](https://nextjs.org/)

```shell
npx create-next-app@latest your-project-name
```

- use Typescript
- use Eslint
- use Tailwind CSS (if you need it)
- don't use `src` directory
- use App Router
- don't use custom import alias

## Setup deploy to Vercel.com

- create a new GH repo
- push the project to github
- create an account on [Vercel.com](https://vercel.com/)
- Connect your GH to Vercel
- Add a [new Vercel project](https://vercel.com/new)
- Import your GH repo
- Press the `Deploy` button
- Wait until it is finished
- Check the deployed page

## Setup prettier

- install [prettier](https://prettier.io/docs/en/install.html)
- install [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier#installation)
- update `.eslintrc.json`
  ```json
  {
    "extends": ["next", "prettier"]
  }
  ```
- install [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss#installation)
- install [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- install [prettier-vscode](https://github.com/prettier/prettier-vscode)
- make prettier default formatter
  ```json
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  ```
- create `.prettierrc.json`
  ```shell
  touch .prettierrc.json
  ```
- add the [prettier config](https://prettier.io/docs/en/options)
  ```json
  {
    "trailingComma": "all",
    "semi": false,
    "tabWidth": 2,
    "singleQuote": true,
    "jsxSingleQuote": false,
    "arrowParens": "avoid",
    "plugins": ["prettier-plugin-tailwindcss"]
  }
  ```
- add scripts to `package.json`
  ```json
  "scripts": {
    "format": "prettier --check --ignore-path .gitignore .",
    "format:fix": "prettier --write --ignore-path .gitignore ."
  }
  ```

Commit and push the changes to GH.

## Add PostgreSQL
- Open Vercel project
- Choose `Storage` -> `Postgres` -> `Create`
- Install [Prisma](https://www.prisma.io/docs/getting-started/quickstart)
  ```shell
  npm install prisma --save-dev 
  ```
- Init prisma config
  ```shell
  npx prisma init --datasource-provider postgresql
  ```
- Install [Prisma Extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
- Copy `.env.local` snippet from Postgress project on Vercel
- and copy the Prisma config to `./prisma/schema.prisma`
  ```prisma
  datasource db {
    provider = "postgresql"
    url = env("POSTGRES_PRISMA_URL") // uses connection pooling
    directUrl = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
  }
  ```
- Add models to the `./prisma/schema.prisma`
  ```prisma
  model User {
    id    Int     @id @default(autoincrement())
    email String  @unique
    name  String?
    todos Todo[]
  }

  model Todo {
    id        Int     @id @default(autoincrement())
    title     String
    completed Boolean @default(false)
    user      User    @relation(fields: [userId], references: [id])
    userId    Int
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
  }
  ```
- Run migration to prepare the DB
  ```shell
  npx prisma migrate dev --name init
  ```
- Fix [Hot reload issue](https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices)
- To fix types issue when building on Vercel run `prisma generate` before `next build`

## Add Google Auth
Install [Next Auth](https://next-auth.js.org/getting-started/example)

Setup Image Domains
```js
const nextConfig = {
  ...
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
    ],
  },
}
```

Enable [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations#convention) 

```js
const nextConfig = {
  ...
  experimental: {
    serverActions: true,
  },
}
```

