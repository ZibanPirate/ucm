# UCM (Used Cars Market)

## Get Started

### Perquisites

Make sure you have:

- [Git](https://git-scm.com/)
- [Nodejs](https://nodejs.org/) version 14 or higher (we recommend using [nvm](https://github.com/nvm-sh/nvm))
- [Yarn](https://yarnpkg.com/) version 1.4.2 or higher

### Run it locally

- Open terminal and clone the repo:

```sh
 git clone https://github.com/ZibanPirate/ucm.git
```

- Make **sure** you are in the project **root**:

```sh
 cd ucm
```

- Install dependencies:

```sh
yarn
```

- Run it locally by either:

```sh
yarn dev:web
```

```sh
yarn dev:all
```

- For web server go to <http://localhost:3000>

## Developing

If you use VSCode, please make sure to have a `.vscode/settings.json` file with the content:

```json
{
  "prettier.configPath": "packages/tooling/.prettierrc",
  "eslint.options": {
    "overrideConfigFile": "packages/tooling/.eslintrc.json"
  },
  "eslint.packageManager": "yarn"
}
```

## Linting and Code Quality

for linting JS/TS files, i'm using [Eslint](https://eslint.org/) configured with [Typescript](https://www.typescriptlang.org/), for the rest of the files i'm using [prettier](https://prettier.io/)

to lint all files run:

```sh
yarn lint
```

to apply possible fixes, run:

```sh
yarn lint:fix
```

when committing, the code will be fixed automatically before it gets committed, thanks to [husky](https://typicode.github.io/husky) and [lint-staged](https://github.com/okonet/lint-staged).

### Tests and Test Coverage:

i'm using [Jest](https://jestjs.io/) for unit tests and code coverage.

to run tests, run

```sh
yarn test
```

to run tests with coverage, run

```sh
yarn test --coverage
```

coverage data is stored in `./{packages,apps}/*/coverage` directories
