const {isPathRelative} = require('../helpers/index')

module.exports = {
    meta: {
        type: null,
        docs: {
            description: "checking imports to public API rules",
            recommended: false,
            url: null,
        },
        fixable: null,
        schema: [
            {
                type: 'object',
                properties: {
                    alias: {
                        type: 'string'
                    }
                }
            }
        ],
    },

    create(context) {

        const alias = context.options[0]?.alias || '';

        const checkingLayers = {
            'entities': 'entities',
            'features': 'features',
            'pages': 'pages',
            'widgets': 'widgets',
        }

        return {
            ImportDeclaration(node) {
                const value = node.source.value
                const importTo = alias ? value.replace(`${alias}/`, '') : value;

                if (isPathRelative(importTo)) {
                    return;
                }

                // [entities, article, model, types]
                const segments = importTo.split('/')
                const isImportNotFromPublicApi = segments.length > 2;

                const layer = segments[0];

                if (!checkingLayers[layer]) {
                    return;
                }

                if (isImportNotFromPublicApi) {
                    context.report(node, 'Absolute import is only allowed from Public API (index.ts)')
                }
            }
        };
    },
};
