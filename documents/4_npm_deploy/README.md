
`package.json`
```json
{
  "name": "npm에 배포할 파일명(중복불가)",
  "version": "v0.0.1", // npm에 배포할 버전명(중복불가)
  "main": "lib/index.js",
  "module": "lib/index.esm.js", // 사용자가 패키지 다운받아 사용할 때 접근하는 entry파일
  "types": "lib/index.d.ts",
  "files": [
      "lib"
  ],
  // npm에서 사용할 keywords와 description도 수정해주자 (선택)
  // ...
  "license": "MIT",
  // ...
  "scripts": {
    "build": "rollup -c",
    // ...
  }
  // ...
}
```
   
<br/><br/>

3. rollup 설정 파일 만들기
   
`rollup.config.js`
```javascript
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import sass from 'rollup-plugin-sass';
import commonjs from '@rollup/plugin-commonjs';

import packageJson from './package.json';

export default {
    input: 'src/index.tsx',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        nodeResolve({
            browser: true,
        }),

        typescript({ objectHashIgnoreUnknownHack: true }),
        commonjs(),
        sass({
            insert: true,
        })
    ],
};
```

<br/><br/>

4. `npm run build`

5. .npmignore 파일 추가
   
```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Grunt intermediate storage (http://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Typescript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# Only apps should have lockfiles
npm-shrinkwrap.json
package-lock.json
yarn.lock
```
   
6. npm 배포하기

```bash
$ npm login
$ npm whoami
$ npm publish --access=public
```

<br />
<br />

## npm 배포 자동화
이제 semantic-release 패키지를 이용하여 위의 활동들을 자동화 합니다.
> semantic-release는 npm 배포를 자동화 하는 패키지입니다.

<br />

[참고](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/github-actions.md)

<br />

1. `npm i -D semantic-release`

2. npm access token 발급받기
   [토큰 발급](https://www.npmjs.com/settings/nodelab/tokens) > Generate New Token > Automation 체크 > 발급받은 토큰을 git actions secrects 변수에 추가(환경변수 명은 NPM_TOKEN)
   
   > 최종적으로 두개의 secret key를 발급 받았습니다.

   ![](./images/screenshot-1.png)

3. package.json 수정
배포할때마다 버전명이 달라져야 하므로 아래와 같이 수정

```json
{
  "version": "0.0.0-semantically-released",
}
```

1. git actions yml 수정

```yml
name: Node.js Package

on:
    push:
        branches: [master]

jobs:
    publish-gpr:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v2
            - name: Set up Python
              uses: actions/setup-python@v1
              with:
                  python-version: '3.8'
            - uses: actions/setup-node@v1
              with:
                  node-version: 12
                  registry-url: https://npm.pkg.github.com/

            - run: npm install
            - name: Deploy Storybook
              run: npm run deploy-storybook -- --ci
              env:
                  GH_TOKEN: 여러분의 계정명:${{ secrets.GH_TOKEN }}
            - name: Release
              run: npx semantic-release
              env:
                  GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
                  NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```





## 마무리
0. 스토리북 세팅하기
1. 첫번째 컴포넌트 
2. 스토리북으로 docs작성하기
3. 스토리북 배포하기
4. **NPM에 배포하기**