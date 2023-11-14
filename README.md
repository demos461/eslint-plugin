# eslint-plugin-eliasxlii-plugin

plugin for production project

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-eliasxlii-plugin`:

```sh
npm install eslint-plugin-eliasxlii-plugin --save-dev
```

## Usage

Add `eliasxlii-plugin` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "eliasxlii-plugin"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "eliasxlii-plugin/rule-name": 2
    }
}
```

## Rules
<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                   | Description                                   | 🔧 |
| :----------------------------------------------------- | :-------------------------------------------- | :- |
| [layer-imports](docs/rules/layer-imports.md)           | checking feature sliced design layers imports |    |
| [path-checker](docs/rules/path-checker.md)             | feature sliced relative path checker          |    |
| [public-api-imports](docs/rules/public-api-imports.md) | checking imports to public API rules          | 🔧 |

<!-- end auto-generated rules list -->



