# [Backstage w/ AutoGov plugin](https://backstage.io)

## Setup GitHub

[Code Insights](https://www.npmjs.com/package/@roadiehq/backstage-plugin-github-insights) for GitHub require GitHub auth provider whether the entity viewed is a public repo or not.

### GitHub Auth

#### GitHub Token

- create a .env
- create GITHUB_TOKEN and add to .env (for [retrieving release assets](https://docs.github.com/en/rest/releases/assets?apiVersion=2022-11-28#get-a-release-asset))

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

#### GitHub Auth Provider

- Create a GitHub OAuth App
- Add GitHub client id & client secret to .env

example .env

```.env
GITHUB_TOKEN=<GitHub-token-with-contents-read-access>
AUTH_GITHUB_CLIENT_ID=<github-client-id>
AUTH_GITHUB_CLIENT_SECRET=<github-client-secret>
```

- add user to `examples/org.yaml`
https://backstage.io/docs/getting-started/config/authentication#adding-a-user

```.yaml
---
apiVersion: backstage.io/v1alpha1
kind: User
metadata:
  name: <github-username>
spec:
  memberOf: [guests]
```

- update `packages/app/src/App.tsx` with:

```packages/app/src/App.tsx
import { githubAuthApiRef } from '@backstage/core-plugin-api';
```

## Run the App

To start the app, run:

```sh
yarn install
yarn dev
```

## AutoGov Plugin

The following outlines what changes were made to a new Backstage instance to enable the AutoGov Plugin. These changes are already done in this repo. The changes listed here are for informational purposes.


### enable dotenv

```package.json
"scripts": {
    "dev": "concurrently \"yarn start\" \"yarn start-backend\"",
    "start": "dotenv -e .env yarn workspace app start",
    "start-backend": "dotenv -e .env yarn workspace backend start",
```

add dependencies:
```zsh
yarn add concurrently
yarn add dotenv
yarn add dotenv-cli
```

### Add AutoGov Plugin

```zsh
# from root
cd packages/app
yarn add liatrio/backstage-plugin-github-releases-autogov
```

- update `packages/app/src/components/catalog/EntityPage.tsx` with:

```packages/app/src/components/catalog/EntityPage.tsx
import { GithubReleasesAutogovPage } from '@liatrio/backstage-plugin-github-releases-autogov';
...

<EntityLayout.Route
      path="/code-insights"
      title="Code Insights">
      <GithubReleasesAutogovPage />
 </EntityLayout.Route>
```

```zsh
# from root
cd packages/backend
yarn add @liatrio/backstage-plugin-github-releases-assets-backend
```

- update `packages/backend/src/index.ts` with:

```packages/backend/src/index.ts
backend.add(
  import('@liatrio/backstage-plugin-github-releases-assets-backend'),
);
```
