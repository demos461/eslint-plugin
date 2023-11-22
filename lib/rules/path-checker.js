const path = require('path')
const {isPathRelative} = require('../helpers/index')


module.exports = {
    meta: {
        type: null,
        docs: {
            description: "feature sliced relative path checker",
            recommended: false,
            url: null,
        },
        fixable: 'code',
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
        return {
            ImportDeclaration(node) {
                // example app/entities/Article
                const value = node.source.value
                const importTo = alias ? value.replace(`${alias}/`, '') : value;

                // example D:\Projects\blog\src\entities\Article
                const fromFilename = context.getFilename();

                if (shouldBeRelative(fromFilename, importTo)) {
                    context.report({
                        node,
                        message: 'Within one slice, all paths must be relative',
                        fix: (fixer) => {
                            const normalizedPath = getNormalizedCurrentPath(fromFilename)
                                .split('/').slice(0,-1).join('/'); // entities/Article/Article.tsx

                            let relativePath = path.relative(normalizedPath, `/${importTo}`)
                                .split('\\')
                                .join('/')

                            if(!relativePath.startsWith('.')) {
                                relativePath = './' + relativePath
                            }

                            return fixer.replaceText(node.source, `'${relativePath}'`)
                        }
                    });
                }
            }
        };
    },
};


const layers = {
    'entities': 'entities',
    'features': 'features',
    'shared': 'shared',
    'pages': 'pages',
    'widgets': 'widgets',
}

function getNormalizedCurrentPath(currentFilePath) {
    const normalizedPath = path.toNamespacedPath(currentFilePath);
    const projectFrom = normalizedPath.split('src')[1];

    return projectFrom.split('\\').join('/')
}

function shouldBeRelative(from, to) {
    if (isPathRelative(to)) {
        return false;
    }

    // example app/entities/Article
    const toArray = to.split('/');
    const toLayer = toArray[0]; // entities
    const toSlice = toArray[1]; // Article

    if (!toLayer || !toSlice || !layers[toLayer]) {
        return false;
    }

    const projectFrom = getNormalizedCurrentPath(from)
    const fromArray = projectFrom.split('/');

    const fromLayer = fromArray[1];
    const fromSlice = fromArray[2];

    if (!fromLayer || !fromSlice || !layers[fromLayer]) {
        return false;
    }

    return fromSlice === toSlice && toLayer === fromLayer;

    // example D:\Projects\blog\src\entities\Article
}
