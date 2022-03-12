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
  "prettier.configPath": "./packages/tooling/.prettierrc",
  "eslint.options": {
    "overrideConfigFile": "./packages/tooling/.eslintrc.json"
  }
}
```

### Before You Create a Pull Request

- Please make sure your code follows the style guideline defined in this repo, for that simply run `yarn lint:fix` to ensure the conformity. This process should happen automatically whenever you commit your changes, but you can always do it manually when your Pull Request checks are failing due to linting errors.
