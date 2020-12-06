# 버튼 컴포넌트

## Button 컴포넌트
첫번째 버튼 컴포넌트를 만들어봅시다.

`src/components/button/index.tsx`
```typescript
import React from 'react';
import styled, { css as styledCss } from 'styled-components';
import { buttonColor } from './styles/buttonColor';
import { buttonSize } from './styles/buttonSize';
import "./styles/Button.module.scss";

export interface ButtonProps {
    size?: "small" | "medium" | "large";
    color?: "dark" | "white";
    children: string;
    [key: string]: any;
}

export default function Button({children, ...props}: ButtonProps) {
    return (
        <S.Button {...props}>
            {children}
        </S.Button>
    )
}

Button.defaultProps = {
    size: "medium",
    color: "white"
}

const S: any = {}

S.Button = styled.button<Pick<ButtonProps, "size" | "color">>`
    ${(props) => styledCss`
        ${buttonSize(props.size)}
        ${buttonColor(props.color)}
    `}
`;
```

<br /><br />

`src/components/Button/styles/Button.module.scss`
```scss
button {   
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
    outline: 0;
    border: none;
    border-radius: 50px;
    padding-top: 0;
    padding-bottom: 0;
}
```

<br /><br />

`src/components/Button/styles/buttonColor.ts`
```typescript
import palette from '../../../utils/palette';

const colorBreakPoints = {
    dark: `
        background: ${palette.gray2};
        color: ${palette.gray7};
        &:hover {
            background: ${palette.gray1};
        }
    `,
    white: `
        background: ${palette.gray6};
        color: ${palette.gray0};
        &:hover {
            background: ${palette.gray5};
        }
    `
};

export const buttonColor = (key: keyof typeof colorBreakPoints) => {
    return colorBreakPoints[key]
};
```

<br /><br />

`src/components/Button/styles/buttonSize.ts`
```typescript
const sizeBreakPoints = {
    small: `
            height: 1.5rem;
            padding-left: 1rem;
            padding-right: 1rem;
            font-size: 0.875rem;
      `,
    medium: `
            height: 2rem;
            padding-left: 1.25rem;
            padding-right: 1.25rem;
            font-size: 1rem;
      `,
    large: `
            height: 2.5rem;
            padding-left: 1.125rem;
            padding-right: 1.125rem;
            & + & {
            margin-left: 0.875rem;
            }
            font-size: 1.125rem;
      `,
};

export const buttonSize = (key: keyof typeof sizeBreakPoints) => {
    return sizeBreakPoints[key];
};
```

## storybook 작성하기
다음으로 스토리북을 작성해 봅시다

`src/components/Button/Button.stories.tsx`
```typescript
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from './';

storiesOf('Button', module)
  .add('with text', () => (
    <Button color="dark" onClick={action("클릭 이벤트")}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button color="white" onClick={action("클릭 이벤트")} aria-label="so cool">
        😀 😎 👍 💯
    </Button>
  ));
```

<br /><br />

## entry 파일 생성
마지막으로 작성한 파일을 entry파일에 추가합니다.
entry파일은 추후 npm에 배포했을 때 사용자들이 이 패키지를 다운받아 `import {Button} from '패키지명'`으로 접근하는 파일입니다.

`src/index.js`
```typescript
import Button  from "./components/Button";

export { Button };
```

<br /><br />

## Storybook 실행
이제 다시 storybook으로 실행하여 페이지를 봅니다.

```bash
$ npm run storybook
```

<br/><br/>

## 다음으로
0. 스토리북 세팅하기
1. 첫번째 컴포넌트 
2. **스토리북으로 docs작성하기** [이동하기](../2_storybook_docs/README.md)