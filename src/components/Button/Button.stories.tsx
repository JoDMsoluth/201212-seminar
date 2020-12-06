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