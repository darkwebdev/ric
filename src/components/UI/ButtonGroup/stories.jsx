import { action } from '@storybook/addon-actions';
import { ButtonGroup } from './index';
import { Button, ButtonTypes, ButtonVariants, IconTypes } from '../Button';

export default {
  title: 'UI/ButtonGroup',
  component: ButtonGroup,
};

export const Default = {
  args: {
    children: [
      <Button type={ButtonTypes.Primary} variant={ButtonVariants.Liquid} icon={IconTypes.Confirm} text="Yes" onClick={action('onClick')}/>,
      <Button type={ButtonTypes.Secondary} variant={ButtonVariants.Liquid} text="No" onClick={action('onClick')}/>,
      <Button type={ButtonTypes.Secondary} variant={ButtonVariants.Liquid} text="Cancel" onClick={action('onClick')}/>
    ]
  },
};
