# Vue3 typescript starter

## env 的相關設定

```code
VITE_CRYPTO_IV="密碼加解密所用的IV(32碼的HexString)"
VITE_CRYPTO_SALT="密碼加解密所用的(無長度限制)"
VITE_CRYPTO_ISSUER="API Token發行者(需對應後端的設定)"

VITE_API_PROXY="API的位置"

VITE_SERVER_PORT="開發階段所使用的port"

```

## Build Setup

```bash
# setup vite-env
$ copy .env.example .env

# install dependencies
$ npm install

# development
$ npm run dev                   # running as development
$ npm run format                # use pritter to format all files
$ npm run lint                  # use eslint to fix all file with invalid rule
$ npm run analyze:rollup        # run rollup to see each file sizing when build

# production
$ npm run build                 # compile as production
$ npm run production:preview    # serve with dist folder if builded

```

## 實作功能

|   功能項   |     機制來源 |
| :--------: | -----------: |
|  授權相關  | vuex & axios |
|  頁面呈現  | element-plus |
| 密碼加解密 |    crypto-js |

## 第三方套件

| Package                  |        Version | Link                             |
| ------------------------ | -------------: | -------------------------------- |
| vite                     |         ^2.1.5 | [Docs][vite]                     |
| vue                      |         ^3.0.5 | [Docs][vue]                      |
| vue-i18n                 |         ^9.1.6 | [Docs][vue-i18n]                 |
| vue-router               |         ^4.0.6 | [Docs][vue-router]               |
| vuex                     |         ^4.0.0 | [Docs][vuex]                     |
| typescript               |         ^4.1.3 | [Docs][typescript]               |
| sass                     |       ^1.32.12 | [Docs][sass]                     |
| element-plus             | ^1.0.2-beta.36 | [Docs][element-plus]             |
| vue-fontawesome          |       ^3.0.0-3 | [Docs][vue-fontawesome]          |
| axios                    |        ^0.21.1 | [Docs][axios]                    |
| crypto-js                |         ^4.0.1 | [Docs][crypto-js]                |
| lodash                   |      ^4.14.168 | [Docs][lodash]                   |
| eslint                   |        ^7.24.0 | [Docs][eslint]                   |
| prettier                 |         ^2.2.1 | [Docs][prettier]                 |
| rollup-plugin-visualizer |         ^5.5.0 | [Docs][rollup-plugin-visualizer] |

[//]: # "reference links"
[vite]: https://github.com/vitejs/vite#readme
[vue]: https://v3.vuejs.org/guide/introduction.html
[vue-i18n]: https://vue-i18n.intlify.dev/guide/
[vue-router]: https://next.router.vuejs.org/guide/
[vuex]: https://next.vuex.vuejs.org/guide/
[typescript]: https://www.typescriptlang.org/docs/
[sass]: https://sass-lang.com/documentation/syntax
[element-plus]: https://element-plus.org/#/en-US/component/quickstart
[vue-fontawesome]: https://github.com/FortAwesome/vue-fontawesome#readme
[axios]: https://axios-http.com/docs/intro
[crypto-js]: https://cryptojs.gitbook.io/docs/
[lodash]: https://lodash.com/docs/4.17.15
[eslint]: https://eslint.org/docs/user-guide/getting-started
[prettier]: https://prettier.io/docs/en/
[rollup-plugin-visualizer]: https://github.com/btd/rollup-plugin-visualizer#readme
