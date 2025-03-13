import { action } from '@storybook/addon-actions';
import { Button, ButtonTypes, IconTypes } from '.';

export default {
    title: 'UI/Button',
    component: Button,
    argTypes: {
        text: { control: 'text' },
        icon: { control: 'select', options: Object.values(IconTypes) },
    },
    parameters: {
        layout: 'centered',
    },
};

export const Default = {
    args: {
        onClick: action('onClick'),
    },
}

export const WithText = {
    args: {
        text: 'Text',
        onClick: action('onClick'),
    },
}

export const Primary = {
    args: {
        type: ButtonTypes.Primary,
        text: 'Primary',
        onClick: action('onClick'),
    },
}

export const WithIcon = () =>
    <div style={{ display: 'flex', gap: '1em' }}>
        <Button type={ButtonTypes.Primary} icon={IconTypes.Confirm} onClick={action('onClick')} />
        <Button type={ButtonTypes.Secondary} icon={IconTypes.Cancel} onClick={action('onClick')} />
    </div>

export const IconOnly = () =>
    <div style={{ display: 'flex', gap: '1em' }}>
        <Button type={ButtonTypes.Icon} icon={IconTypes.Hide} onClick={action('onClick')} />
        <Button type={ButtonTypes.Icon} icon={IconTypes.Change} onClick={action('onClick')} />
    </div>


// export const IconButtonDelete = {
//     args: {
//         type: ButtonTypes.Danger,
//         icon: IconTypes.IconCancel,
//         onClick: action('onClick'),
//     },
// }

export const WithIconAndText = () =>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
        <Button type={ButtonTypes.Primary} icon={IconTypes.Confirm} text="Confirm" onClick={action('onClick')} />
        <Button type={ButtonTypes.Secondary} icon={IconTypes.Cancel} text="Cancel" onClick={action('onClick')} />
    </div>
