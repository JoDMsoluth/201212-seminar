# 스토리북 문서 작성하기

`src/components/Button/Button.stories.tsx` 파일처럼 우리가 여러가지 addon을 사용하여 CSF 방식으로 스토리북을 작성했습니다. 하지만 저는 mdx를 이용해서 스토리북을 작성하는 것을 선호하는데요. 그 이유는 짱짱 편하기 때문입니다.

<br />

MDX를 사용하기 위에서는 약간의 설정이 필요합니다.
[참고](https://www.npmjs.com/package/@storybook/addon-docs)

<br />

@storybook/addon-docs을 설치했고 해당 addon에 대한 main.js 설정을 추가하였기 때문에 `preview.js`만 추가하면 됩니다.

<br />

`./storybook/preview.js`
```javascript
// see : https://github.com/storybookjs/storybook/tree/master/addons/docs#installation

import { addParameters } from '@storybook/react';
import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});
```

<br />

그 다음 `src/components/Button/Button.stories.mdx`파일을 작성해줍니다.

> vscode에서 mdx extention을 깔아주면 더 이쁩니다.

<br />

`src/components/Button/Button.stories.mdx`
```jsx
import { Meta, Story, Preview, Props } from '@storybook/addon-docs/blocks';
import { action } from '@storybook/addon-actions';
import Button from "./";

<Meta title="Button" component={Button} />

# Button Component

첫번째 컴포넌트입니다.
테마와 사이즈를 이용해서 버튼을 만들 수 있습니다.
커스터마이징 해서 확장성을 높여보세요

# Props

<Props of={Button} />

## Dark usage

<Preview>  
  <Story name="Dark Button">
      <Button size="small" color="dark" onClick={action("클릭 이벤트")}>스몰</Button>
      <Button color="dark" onClick={action("클릭 이벤트")}>미디엄</Button>
      <Button size="large" color="dark" onClick={action("클릭 이벤트")}>라지</Button>
  </Story>
</Preview>

## White usage

<Preview>  
  <Story name="White Button">
      <Button size="small" color="white" onClick={action("클릭 이벤트")}>스몰</Button>
      <Button color="white" onClick={action("클릭 이벤트")}>미디엄</Button>
      <Button size="large" color="white" onClick={action("클릭 이벤트")}>라지</Button>
  </Story>
</Preview>

```

<br />

> 직접 확인해보세요 엄청 이쁩니다.

<br /><br />

## 다음으로
0. 스토리북 세팅하기
1. 첫번째 컴포넌트 
2. 스토리북으로 docs작성하기
3. **스토리북 배포하기** [이동하기](../3_storybook_deploy/README.md)
4. NPM에 배포하기