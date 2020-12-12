# 버튼 컴포넌트

## Button 컴포넌트
자, 이제 설정은 완료되었습니다. 이제는 첫번째 버튼 컴포넌트를 만들어봅시다. 😆😆

<br />

딱히 코드에 대한 설명은 하지 않겠습니다.
각자 자신만의 코드로 버튼 컴포넌트를 만들어주세요.

<br />

`src/components/Button/index.tsx`
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
const palette = {
    gray0: '#F8F9FA',
    gray1: '#F1F3F5',
    gray2: '#E9ECEF',
    gray3: '#DEE2E6',
    gray4: '#CED4DA',
    gray5: '#ADB5BD',
    gray6: '#868E96',
    gray7: '#495057',
    gray8: '#343A40',
    gray9: '#212529',
};

const colorBreakPoints = {
    white: `
        background: ${palette.gray2};
        color: ${palette.gray7};
        &:hover {
            background: ${palette.gray1};
        }
    `,
    dark: `
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

<br /><br />

## storybook 작성하기
다음으로 스토리북을 작성해 봅시다. Storybook은 크게 Component Storybook Format(CSF) 방식과 Markdown + JSX를 합친 (MDX) 방식을 사용하여 작성할 수 있습니다.

<br />

결국 MDX 방식이 -> CSF 방식으로 트랜스코딩 되기 때문에 서로간에 퍼포먼스 차이는 없으며 둘 다 섞어서 쓰셔도 상관 없습니다만 저는 MDX 방식을 선호합니다.

<br />

우선 맛보기로 CSF 방식으로 스토리북을 작성해봅니다.

<br />

`src/components/Button/Button.stories.tsx`
```typescript
import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select } from '@storybook/addon-knobs';

import Button from './';

export default {
  title: 'CSF/Button', // 스토리북에서 보여질 그룹과 경로를 명시
  component: Button, // 어떤 컴포넌트를 문서화 할지 명시
  decorators: [withKnobs], // 애드온 적용
   parameters: {
     componentSubtitle: `첫번째 컴포넌트입니다.`
  },
};

export const button = () => {
  const size = select('size', ['small', 'medium', 'large'], 'medium');
  const color = select('color', ['dark', 'white'], 'white');
    return <Button color={color} size={size} onClick={action("클릭 이벤트")} aria-label="so cool">
      😀 😎 👍 💯
    </Button>
}

button.story = {
  name: 'Button'
};
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

<br />

**짜잔!** 멋진 문서가 완성되었네요.

<br />

![](./images/screenshot-q.png)


<br/><br/>

## 다음으로
0. 스토리북 세팅하기
1. 첫번째 컴포넌트 
2. **스토리북으로 docs작성하기** [이동하기](../2_storybook_docs/README.md)
3. 스토리북 배포하기
4. NPM에 배포하기