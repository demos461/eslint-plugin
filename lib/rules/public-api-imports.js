const {isPathRelative} = require('../helpers/index')
const micromatch = require('micromatch')

const PUBLIC_ERROR = 'PUBLIC_ERROR';
const TESTING_PUBLIC_ERROR = 'TESTING_PUBLIC_ERROR';

module.exports = {
    meta: {
        type: null,
        docs: {
            description: "checking imports to public API rules",
            recommended: false,
            url: null,
        },
        fixable: 'code',
        messages: {
            [PUBLIC_ERROR]: 'Absolute import is only allowed from Public API (index.ts)',
            [TESTING_PUBLIC_ERROR]: 'Testing data should be import from Public API (testing.ts)',
        },
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string'
                    },
                    testFilesPatterns: {
                        type: 'array'
                    }
                }
            }
        ],
    },

    create(context) {

        const {alias = '', testFilesPatterns = []} = context.options[0] ?? {};

        const checkingLayers = {
            'entities': 'entities',
            'features': 'features',
            'pages': 'pages',
            'widgets': 'widgets',
        };

        return {
            ImportDeclaration(node) {
                const value = node.source.value;
                const importTo = alias ? value.replace(`${alias}/`, '') : value;

                if (isPathRelative(importTo)) {
                    return;
                }

                // [entities, article, model, types]
                const segments = importTo.split('/');
                const layer = segments[0];
                const slice = segments[1]

                if (!checkingLayers[layer]) {
                    return;
                }

                const isImportNotFromPublicApi = segments.length > 2;

                // [entities, article, testing]
                const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4;


                if (isImportNotFromPublicApi && !isTestingPublicApi) {
                    context.report({
                        node,
                        messageId: PUBLIC_ERROR,
                        fix: (fixer) => {
                            return fixer.replaceText(node.source, `'${alias}/${layer}/${slice}'`)
                        }
                    });
                }

                if (isTestingPublicApi) {
                    const currentFilePath = context.getFilename();

                    const isCurrentFileTesting = testFilesPatterns.some(
                        pattern => micromatch.isMatch(currentFilePath, pattern)
                    )

                    if (!isCurrentFileTesting) {
                        context.report({
                            node,
                            messageId: TESTING_PUBLIC_ERROR,
                        });
                    }
                }
            }
        };
    },
};
