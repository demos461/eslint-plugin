/**
 * @fileoverview feature sliced relative path checker
 * @author Ilya
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run("path-checker", rule, {
  valid: [
    {
      filename: 'D:\\Projects\\blog\\src\\entities\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '.../.../model/slice/addCommentFormSlice'",
      errors: [],
    },
  ],

  invalid: [
    {
      filename: 'D:\\Projects\\blog\\src\\entities\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article/model/slice/addCommentFormSlice'",
      errors: [{ message: "Within one slice, all paths must be relative"}],
      options: [
        {
          alias: '@'
        }
      ]
    },
    {
      filename: 'D:\\Projects\\blog\\src\\entities\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'entities/Article/model/slice/addCommentFormSlice'",
      errors: [{ message: "Within one slice, all paths must be relative"}],
    },
  ],
});
