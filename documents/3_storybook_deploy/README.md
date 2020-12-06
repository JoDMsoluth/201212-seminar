# 스토리북 배포하기

## 첫 배포하기

1. 배포 패키지 설치
`npm i -D @storybook/storybook-deployer`

2. `package.json` 수정
```json
{
  // ...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "deploy-storybook": "storybook-to-ghpages",
  },
  // ...
  "storybook-deployer": {
     "gitUsername": "github name", // 자신의 깃허브 이름
     "gitEmail": "github email", // 자신의 깃허브 이메일
     "commitMessage": "Deploy Storybook"
  },
}
```

3. 스토리북 배포하기
   `npm run deploy-storybook`


## git actions을 이용한 ci

1. 먼저 Git Actions 파일을 만들어줍니다.

- github의 해당 repository에 들어가면 actions 탭이 있습니다.
- 그럼 다음과 같이 초기 파일이 만들어지는데 이를 다음과 같이 수정해 줍니다.

```yaml
# This workflow will run tests using node and then publish a package to GitHub Packages when a release is created
# For more information see: https://help.github.com/actions/language-and-framework-guides/publishing-nodejs-packages

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
                  GH_TOKEN: JoDMsoluth:${{ secrets.GH_TOKEN }}
```

- 여기서 중요한 부분은 마지막 부분인데
```yml
 name: Deploy Storybook
    run: npm run deploy-storybook -- --ci
    env:
        GH_TOKEN: JoDMsoluth:${{ secrets.GH_TOKEN }}
```

