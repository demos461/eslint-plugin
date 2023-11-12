const rule = require("../../../lib/rules/layer-imports"),
    RuleTester = require("eslint").RuleTester;

const aliasOptions = [
  {
    alias: '@'
  }
]
const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 6, sourceType: 'module' },
});
ruleTester.run("layer-imports", rule, {
  valid: [
    {
      filename: 'D:\\Projects\\blog\\src\\features\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/shared/Button.tsx'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'D:\\Projects\\blog\\src\\features\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'D:\\Projects\\blog\\src\\app\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Articl'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'D:\\Projects\\blog\\src\\widgets\\pages',
      code: "import { useLocation } from 'react-router-dom'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'D:\\Projects\\blog\\src\\app\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'redux'",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'D:\\Projects\\blog\\src\\index.tsx',
      code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
      errors: [],
      options: aliasOptions,
    },
    {
      filename: 'D:\\Projects\\blog\\src\\entities\\Article.tsx',
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      errors: [],
      options: [
        {
          alias: '@',
          ignoreImportPatterns: ['**/StoreProvider']
        }
      ],
    },
    {
      filename: 'D:\\Projects\\blog\\src\\entities\\Article.tsx',
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      errors: [],
      options: [
        {
          alias: '@',
          ignoreImportPatterns: ['**/StoreProvider']
        }
      ],
    },
  ],

  invalid: [
    {
      filename: 'D:\\Projects\\blog\\src\\entities\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Article'",
      errors: [{ message: "Layer can only interact with Layers strictly below"}],
      options: aliasOptions,
    },
    {
      filename: 'D:\\Projects\\blog\\src\\features\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [{ message: "Layer can only interact with Layers strictly below"}],
      options: aliasOptions,
    },
    {
      filename: 'D:\\Projects\\blog\\src\\entities\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [{ message: "Layer can only interact with Layers strictly below"}],
      options: aliasOptions,
    },
  ],
});
