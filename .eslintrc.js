module.exports = {
    root: true,
    env: {
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        'plugin:vue/recommended',
        'eslint:recommended',
    ],
    rules: {
        'vue/script-indent': ['error', 4, { baseIndent: 0 }],
        'vue/html-indent': ['error', 4, { baseIndent: 0 }],
        'vue/multiline-html-element-content-newline': ['error', {"allowEmptyLines": true}]
    },
    plugins: [
        'vue'
    ]
}
