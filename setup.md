# 設計模式與程式架構 - 環境建置

## TypeScript

### 何謂 TypeScript

Typescript 是 Microsoft 定義、作為 **Javascript 的擴展**的*程式語言*。

- Reference: [TypeScript Documentation](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

特點有以下幾項：
- 程式中的`variable`, `function`, `return value`... etc 都可以**明確定義型別**。
- 具有 `interface`, `implement`, `extends`, `enum`, ...等等，甚至更多的擴充語法，對於 OOP 的支援更加完善。
- VSCode 自動支援型別檢查，使程式碼更加穩健。
- 完整支援 Javascript 語法，對於學過 Javascript 的使用者來說相對友善。

### 如何安裝

推薦使用 [ts-node](https://github.com/TypeStrong/ts-node) 進行環境建置。

#### 環境需求
- NodeJs 環境 ([安裝教學](https://nodejs.org/en/))
  - 具有 node 指令
  - 具有 npm 或者 yarn (yarn：安裝教學 https://oranwind.org/node-js-yarn-install/)

#### 安裝步驟
0. 環境建置 ts-node 執行環境
```shell
$ npm install -g ts-node    # 全域安裝 ts-node 命令

```

1. 建立一個專案資料夾，並近入
```shell
$ mkdir design-pattern ; cd design-pattern
```

2. 使用 npm 建立 node 專案
```shell
$ npm init
```

> Hint: 期間 npm 會詢問你一些問題，這部分可以視個人情況自行回答。

完成之後應該會在資料夾中看到 `package.json` 檔案，此為 nodeJs 管理依賴套件的設置文件。

3. 安裝 ts-node 相關套件
```shell
# 在本專案安裝 typescript 相關套件， -D 代表只裝在 develop 環境
$ npm install -D typescript
$ npm install -D tslib @types/node

# 安裝 nodeJs version 16 的基礎設定
$ npm install -D @tsconfig/node16
```

4. 我們建立一個 `tsconfig.json`，去擴充剛剛安裝的 tsconfig
```json

{ //node16的寫法
 "extends": "@tsconfig/node16/tsconfig.json",
 "compilerOptions": {
   "module": "Node16",
   "noImplicitAny": true,
   "preserveConstEnums": true,
   "sourceMap": true,
   "rootDir": "./src",
   "outDir": "./dist"
 },
 "include": ["src/**/*"],
 "exclude": ["node_modules", "**/*.spec.ts"]
}


{ //node12的
  "extends": "@tsconfig/node12/tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitAny": true,
    "removeComments": true,
    "preserveConstEnums": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}

```
5. 大公告成！ 我們建立一個 `index.ts` 檔案來試試看。

在其中加入 `console.log('hello world')`。

並且在 `package.json` 中增加執行用的指令。

```json
scripts: {
  // ...,
  "start": "NODE_OPTIONS='--trace-deprecation --abort-on-uncaught-exception' ts-node ./index.ts"
}
```

使用 `npm run start` 來跑看看。

```shell
$ npm run start
```



