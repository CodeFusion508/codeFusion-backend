module.exports = {
    "env": {
        "browser" : true,
        "es2021"  : true,
        "node"    : true
    },
    "extends"       : "eslint:recommended",
    "parserOptions" : {
        "ecmaVersion" : "latest",
        "sourceType"  : "commonjs"
    },
    "rules": {
        "key-spacing": [
            "error",
            {
                "align": {
                    "afterColon"  : true,
                    "beforeColon" : true,
                    "on"          : "colon"
                }
            }
        ],
        "no-console"           : "warn",
        "no-debugger"          : "error",
        "no-dupe-keys"         : "error",
        "no-duplicate-imports" : "error",
        "no-trailing-spaces"   : "error",
        "no-unused-vars"       : "warn",
        "no-var"               : "error",
        "quotes"               : [
            "error",
            "double",
            {
                "allowTemplateLiterals" : true,
                "avoidEscape"           : true
            }
        ],
        "semi": [
            "error",
            "always"
        ],
        "sort-keys": [
            "error",
            "asc",
            { "caseSensitive": true }
        ]
    }
};