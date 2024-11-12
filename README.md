# [Backstage w/ Autogov plugin](https://backstage.io)

## Prerequisites

You will need [Node v20 installed](https://nodejs.org/en/download/package-manager) on your machine.

You will need [yarn v4 installed](https://yarnpkg.com/getting-started/install) on your machine.

> **Note**: Make sure you have the correct versions of Node and Yarn installed. Using incorrect versions may lead to unexpected issues.

## Initial Setup

Before proceeding, verify your development environment:

```sh
node --version  # Should show v20.x.x
yarn --version  # Should show v4.x.x
```

## Setup GitHub

To use the Github APIs, a basic Github Auth token is required. It does not need access to any specific repositories, just basic read-access to public repositories.

### GitHub Auth

#### GitHub Token

1. Go to GitHub Settings > Developer Settings > Personal Access Tokens
2. Create a new token with "Contents" repository permissions (read)
3. Create a `.env` file in the root directory
4. Add your token as `GITHUB_TOKEN=your_token_here`

```md
For GITHUB_TOKEN:
Fine-grained access tokens for "Get a release asset"

This endpoint works with the following fine-grained token types:

GitHub App user access tokens
GitHub App installation access tokens
Fine-grained personal access tokens
The fine-grained token must have the following permission set:

"Contents" repository permissions (read)
```

## Run the App

1. Install dependencies:

   ```sh
   yarn install
   ```

1. Start the application:

   ```sh
   yarn dev
   ```

> **Note**: The application runs on `http://localhost:3000` by default. You should see the Backstage interface once it's running.

## Troubleshooting

Common issues and solutions:

- If `yarn install` fails, try clearing your yarn cache: `yarn cache clean`
- If the app doesn't start, check if all required environment variables are set in `.env`
- For plugin-related issues, ensure all plugin dependencies are correctly installed

## Autogov Plugins

The following outlines what changes were made to a new Backstage instance to enable the Autogov Plugins. These changes are already done in this repo. The changes listed here are for informational purposes.

### Enable dotenv

1. Modify the following scripts in the `package.json` file:

   ```json
   "scripts": {
     "dev": "concurrently \"yarn start\" \"yarn start-backend\"",
     "start": "dotenv -e .env yarn workspace app start",
     "start-backend": "dotenv -e .env yarn workspace backend start",
   ```

1. add dependencies:

   ```bash
   yarn add concurrently
   yarn add dotenv
   yarn add dotenv-cli
   ```

### Add Autogov Plugins

- To install to the Autogov Plugins to the appropriate place, run the following two commands:

  ```zsh
  # from root
  yarn --cwd packages/app add @liatrio/backstage-plugin-autogov-releases-card@^1.6.2 @liatrio/backstage-plugin-autogov-status-catalog-column@^1.6.2
  yarn --cwd packages/backend add @liatrio/backstage-plugin-autogov-releases-backend@^1.6.2 @liatrio/backstage-plugin-backend-module-autogov-processor@^1.6.2
  ```

> **Note**: After installing plugins, you may need to restart your development server for changes to take effect.

## Contributing

See [Contributing](./CONTRIBUTING) to Backstage GitHub Releases Autogov Plugin

> **Note**: First time contributors should review the Contributing guide carefully before submitting any changes.
