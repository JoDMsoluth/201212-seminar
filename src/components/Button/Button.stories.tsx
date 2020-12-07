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