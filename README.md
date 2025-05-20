# Webservices Starter Project (Metronic 9)

# Configuration:
1. update the web.config file in the public directory:

    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <configuration>
        <system.webServer>
            <httpErrors errorMode="DetailedLocalOnly">
                <remove statusCode="404" subStatusCode="-1" />
                <error statusCode="404" prefixLanguageFilePath="" path="/metronic9/index.html" responseMode="ExecuteURL" />
            </httpErrors>
        </system.webServer>
    </configuration>

    ```
    update 
    ```
    path="/metronic9/index.html"
    ```

2. inside src/main.tsx update the basename with that same path.
3. inside vite.config.ts update the base path
4. inside App.tsx update the document title in the useEffect

# Build Process
1. Run 'npm install'
2. Run 'npm run build' while developing
3. Run 'npm run prod' to enable code splitting improving performance for production


## updating drawers:
documentation for drawers in Metronic 9 can be found at https://keenthemes.com/metronic/tailwind/docs/components/drawer#sidebar_menu

Creating a drawer relies on a drawer-toggle and an id. We maintain a list of drawers and their attributes in:
```
/Metronic9/src/components/drawers/drawerInfo.ts
```
to make a new drawer, update the appDrawers object within this file and import the getDrawers function into your page. Look at the 'App Switcher' drawer in the navbar for an example of this configuration.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
