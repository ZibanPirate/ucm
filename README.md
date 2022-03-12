# UCM (Used Cars Market)

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
