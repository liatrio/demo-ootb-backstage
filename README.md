# [Backstage w/ Autogov plugin](https://backstage.io)

## Prerequisites

You will need [Node v20 installed](https://nodejs.org/en/download/package-manager) on your machine.

You will need [yarn v4 installed](https://yarnpkg.com/getting-started/install) on your machine.

## Setup GitHub

To use the Github APIs, a basic Github Auth token is required. It does not need access to any specific repositories, just basic read-access to public repositories.

### GitHub Auth

#### GitHub Token

1. create a .env
1. create GITHUB_TOKEN and add to .env (for [retrieving release assets](https://docs.github.com/en/rest/releases/assets?apiVersion=2022-11-28#get-a-release-asset))

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

- To start the app, run:

```sh
yarn install
yarn dev
```

## Autogov Plugins

The following outlines what changes were made to a new Backstage instance to enable the Autogov Plugins. These changes are already done in this repo. The changes listed here are for informational purposes.

### enable dotenv

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

#### Autogov Plug-in Release Card Backend

- Update `packages/backend/src/index.ts` with:

```diff
+  backend.add(
+    import('@liatrio/backstage-plugin-autogov-releases-backend'),
+  );
backend.start();
```

#### Autogov Plug-in Release Card Frontend

1. Update `packages/app/src/components/catalog/EntityPage.tsx` with:

   ```diff
   + import { AutogovReleasesCard } from '@liatrio/backstage-plugin-autogov-releases-card';
   ```

1. Further down, find the following block of code:

   ```diff
   const overviewContent = (
     <Grid container spacing={3} alignItems="stretch">
       {entityWarningContent}
       <Grid item md={6}>
         <EntityAboutCard variant="gridItem" />
       </Grid>
       <Grid item md={6} xs={12}>
         <EntityCatalogGraphCard variant="gridItem" height={400} />
       </Grid>

       <Grid item md={4} xs={12}>
         <EntityLinksCard />
       </Grid>
       <Grid item md={8} xs={12}>
         <EntityHasSubcomponentsCard variant="gridItem" />
       </Grid>
   +    <EntitySwitch>
   +      <EntitySwitch.Case
   +        if={isKind('component') && isComponentType(['website', 'service'])}
   +      >
   +        <Grid item md={8} xs={12}>
   +          <AutogovReleasesCard />
   +        </Grid>
   +      </EntitySwitch.Case>
   +    </EntitySwitch>
     </Grid>
   );
   ```

#### Autogov Plug-in Latest Release Autogov Status Catalog Processor

- Update `packages/backend/src/index.ts` with:

```diff
+  backend.add(
+    import('@liatrio/backstage-plugin-backend-module-autogov-processor'),
+  );
backend.start();
```

#### Autogov Plug-in Latest Release Autogov Status Catalog Column

1. Update `packages/app/App.tsx`:

   ```diff
   +  import {
   +    defaultColumnsWithAutogovStatusRightOf,
   +    AutogovLatestReleaseStatusPicker,
   +  } from '@liatrio/backstage-plugin-autogov-status-catalog-column';
   +  import { DefaultFilters } from '@backstage/plugin-catalog-react';

   const app = createApp({
   ```

1. Further down, find the following code block and update:

   ```diff
   -      <Route path="/catalog" element={<CatalogIndexPage />} />
   +      <Route
   +        path="/catalog"
   +        element={
   +          <CatalogIndexPage
   +            columns={context =>
   +              defaultColumnsWithAutogovStatusRightOf('Description', context)
   +            }
   +            filters={
   +              <>
   +                <DefaultFilters />
   +                <AutogovLatestReleaseStatusPicker />
   +              </>
   +            }
   +          />
   +        }
   +      />
   ```

## Contributing

See [Contributing](./CONTRIBUTING) to Backstage GitHub Releases Autogov Plugin
