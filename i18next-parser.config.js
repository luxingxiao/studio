// i18next-parser configuration
// https://github.com/i18next/i18next-parser

module.exports = {
    // 上下文分隔符
    contextSeparator: '_',

    // 创建旧目录来存储已删除的key
    createOldCatalogs: false,

    // 默认命名空间
    defaultNamespace: 'common',

    // 默认值
    defaultValue: '',

    // 缩进
    indentation: 4,

    // 保留key的顺序
    keepRemoved: false,

    // key分隔符
    keySeparator: '.',

    // 行结束符
    lineEnding: 'auto',

    // 支持的语言
    locales: ['en', 'zh-CN'],

    // 命名空间分隔符
    namespaceSeparator: ':',

    // 输出路径
    output: 'packages/locales/$LOCALE/$NAMESPACE.json',

    // 复数分隔符
    pluralSeparator: '_',

    // 输入文件 - 扫描所有 tsx 和 ts 文件
    input: [
        'packages/home/**/*.{ts,tsx}',
        'packages/eez-studio-ui/**/*.{ts,tsx}',
        'packages/eez-studio-shared/**/*.{ts,tsx}',
        'packages/project-editor/**/*.{ts,tsx}',
        'packages/instrument/**/*.{ts,tsx}',
        'packages/shortcuts/**/*.{ts,tsx}',
        'packages/main/**/*.{ts,tsx}',
    ],

    // 排除的文件
    ignore: [
        '**/node_modules/**',
        '**/build/**',
        '**/dist/**',
    ],

    // 排序
    sort: true,

    // 详细输出
    verbose: true,

    // 失败时不退出
    failOnWarnings: false,

    // 自定义值处理函数
    customValueTemplate: null,

    // i18next 函数名
    lexers: {
        ts: [
            {
                lexer: 'JavascriptLexer',
                functions: ['t', 'i18n.t'],
                functionsNamespace: ['useTranslation', 'withTranslation'],
            }
        ],
        tsx: [
            {
                lexer: 'JsxLexer',
                functions: ['t', 'i18n.t'],
                functionsNamespace: ['useTranslation', 'withTranslation'],
                attr: 'i18nKey',
            }
        ],
        default: ['JavascriptLexer'],
    },

    // 使用默认值作为翻译（对于英文）
    useKeysAsDefaultValue: function(locale) {
        return locale === 'en';
    },

    // 不跳过默认值
    skipDefaultValues: false,
};
