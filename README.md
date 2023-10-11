# ATAP MARKET PLACE
this project based on next.js, Redux Toolkit, Redux Saga, Material UI and emotion

# FEATURES
- Through documentation: Written with the same care as Next.js docs
- Guaranteed consistency: Opinionated linting for React and Javascript/JSON integrated into Visual Studio Code and run against staged files on pre-commit.

## TABLE OF CONTENT
- [Getting Started](#getting-started)
- [Environment](#environment)
- [Available Script](#available-scripts)
- [Architecture](#architecture)
- [State Management](#state-management)
- [Linting & Formating](#linting-and-formating)
- [Editor Integration](#editor-integration)
## Getting Started
make sure you have the following installed
- Node (at least the latest LTS)
- ESlint (at least the latest)

```bash
# 1. Clone the repository.
git clone https://github.com/GusnaRWX/marketplace-good-moves

# 2. Enter your clone project
cd marketplace-good-moves

# 3. Install dependencies. Make sure npm installed: https://www.npmjs.com/get-npm
npm install

# 4. Run on your local.
# This command is a default to run development mode,
# and wil be listen http://localhost:3000
npm run dev
```

## Environment
For the first time you must create environment in root directory. this list environment must be create in this project:
- `.env` or `.env.local`

All of examples `env` located in `/environment`

## Available Scripts
In the project directory, you can run:

```bash
# 1. Run in Development Mode
npm run dev

# 2. Run in Production Server
npm run start

# 3. Build (note: make sure the env is correct for build)
npm run build

# 4. Check lint all files
npm run lint
```

## Architecture
```
|-- src/ # this is current Next JS Directory
  |-- auth/ # component for authentication
  |-- components/ # where the most of the components in our app will live, including our global base components.
    |-- core/ # All of core component used in this project
    |-- _shared/ # All of shared componentd used in this project
    |-- form/ # All component form
  |-- containers/ # where most of the containers in our app will live
  |-- hooks/ # Includes custom hooks used in this project
  |-- pages/
  |-- props
    |-- server
      |-- authProps.js # context for checking access token
  |-- public/ # Includes asset for icon, images and font
  |-- store/ # The redux store directory
    |-- reducers/ # All of the reducers to manage apps state
    |-- sagas/ # All of sagas middleware
    |-- index.js # Initialize redux store
  |-- styles/
  |-- utils/
    |-- assets # for assets constant
    |-- interceptors.js # Axios interceptors
    |-- logger.js # Logger All action axios
    |-- storage.js # All action for get and post token saving token to local storage
    |-- createEmotionCache # to caching emotion css material ui
    |-- helpers.js # include all global function
    |-- siteSettings.js # include all harcode data dummy
    |-- theme.js # include all theme for material ui
  |-- .editorconfig # this file will help you development and make your code clean
  |-- .eslintrc.json # all setup eslint and rules
  |-- jsconfig.json
  |-- next.config.json
  |-- postcss.config.js # all setup inject css for bottom sheet
```

### Pages
In Next.js, a page is a react component export from a `.js`, `.jsx`, `ts` or `tsx` file in the pages directory. each page is associated with route based on this file name.

See the section about [Static File Serving](https://nextjs.org/docs/basic-features/static-file-serving) for more information.

## State Management
this project used `Redux Tookit` for state management and `redux-saga` for middleware.

See the section about [Redux](https://redux-toolkit.js.org/introduction/getting-started)

See the section about [Redux-saga](https://redux-saga.js.org/docs/introduction/GettingStarted)

## Linting & Formating
- [Languages](#languages)
- [Scripts](#scripts)
    - [Terminal](#terminal)
    - [Editor](#editor)
- [Configuration Eslint](#configuration-eslint)

This project uses ESLint to catch errors and avoid bikeshedding by enforcing a common code style.

### Languages
- **Javascript** is linted by ESLint.

### Scripts
There are a few different contexts in which the linters run.

### Terminal
```bash
# Lint all files
npm run lint

# Lint all files, fixing many violations automatically
npm run lint:fix
```

### Editor
In supported editors, all files will be linted and formatted on-save. See [Editor Integration](#editor-integration) for details.

### Configuration ESLint
This projects with opinionated defaults, but you can edit each tools configuration in the following config files:

- [ESLint](https://eslint.org/docs/user-guide/configuring/)
- `.eslintrc.json`
- `.eslintignore`

## Editor integration
- [Visual Studio Code](#visual-studio-code)
    - [Configuration](#configuration-vscode)

### Visual Studio Code
This project is best developed in VS Code. With the [recommended extensions](https://code.visualstudio.com/docs/editor/extension-gallery#_workspace-recommended-extensions) and setting in your VS Code, you get:

- Syntax highlighting for all files
- Intellisense for all files
- Lint-on-save for all files
- In-editor results on save for unit tests

Recommended for this project:
- EditorConfig
- ESLint
- HTML Snippets
- Javascript (ES6) code snippets
- ES7 React/Redux/GraphQL/React-Native snippets

### Configuration VSCode
To Configure extendsions in your VS Code enter command:

For Windows and Linux.
```
CRTL + X
```

For Mac.
```
COMMAND + X
```

To Configure Lint-on-save.
In your local VS Code Create User Setting or edit in Json file and will be automatically generated setting.json. And enter this code.

```json
{
    "emmet.includeLanguages": {
        "javascript": "javascriptreact",
        "typescript": "typescriptreact"
    },
    "typescript.updateImportsOnFileMove.enabled": "always",
    "javascript.updateImportsOnFileMove.enabled": "always",
    "extensions.ignoreRecommendations": false,
    "eslint.validate": [
        "typscript",
        "javascript"
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

### Customize configuration
See [Next.js Documentation](https://nextjs.org/docs).

