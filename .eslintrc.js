module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        mocha: true
    },
    globals: {
        expect: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:vue/recommended',
        'eslint:recommended',
    ],
    rules: {
        'vue/script-indent': ['error', 4, { baseIndent: 1, switchCase: 1 }],
        'vue/html-indent': ['error', 4, { baseIndent: 1 }],
        'vue/multiline-html-element-content-newline': 0,
        'vue/singleline-html-element-content-newline': ['error', {"ignores": ["pre", "span", "label", "textarea", "router-link", "button"]}],
        'vue/max-attributes-per-line': ['error', { singleline: 4 }]
    },
    plugins: [
        'vue'
    ]
}
