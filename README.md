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

| Name                                       | Description                          |
| :----------------------------------------- | :----------------------------------- |
| [path-checker](docs/rules/path-checker.md) | feature sliced relative path checker |

<!-- end auto-generated rules list -->



