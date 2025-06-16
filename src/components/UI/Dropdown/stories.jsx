import { action } from '@storybook/addon-actions';
import { Dropdown } from './index';
import { useState } from 'react';
import { OperatorAvatar } from '../../OperatorAvatar/index.jsx';

export default {
    title: 'UI/Dropdown',
    component: Dropdown,
    argTypes: {
        selectText: { control: 'text' },
    },
    parameters: {
        // layout: 'centered',
    },
};

export const Default = args => {
    const [value, setValue] = useState();

    return <Dropdown {...args} value={value} onChange={v => {setValue(v);action('onChange')(v);}}>
        <Dropdown.Item value="1">item 1</Dropdown.Item>
        <Dropdown.Item value="2">item 2</Dropdown.Item>
        <Dropdown.Item value="3">item 3</Dropdown.Item>
    </Dropdown>;
};

export const Selected = args => {
    const [value, setValue] = useState('2');

    return <Dropdown {...args} value={value} onChange={v => {setValue(v);action('onChange')(v);}}>
        <Dropdown.Item value="1">item 1</Dropdown.Item>
        <Dropdown.Item value="2">item 2</Dropdown.Item>
        <Dropdown.Item value="3">item 3</Dropdown.Item>
    </Dropdown>;
};

export const Horizontal = args => {
    const [value, setValue] = useState('2');

    return <Dropdown
        {...args}
        value={value}
        onChange={v => {setValue(v);action('onChange')(v);}}
        mode="horizontal"
        renderSelected={item => <span>Selected: item {item.value}</span>}
        style={{ width: '90vw' }}
    >
        <Dropdown.Item value="1" style={{ width: '10em' }}>item 1</Dropdown.Item>
        <Dropdown.Item value="2" style={{ width: '10em' }}>item 2</Dropdown.Item>
        <Dropdown.Item value="3" style={{ width: '10em' }}>item 3</Dropdown.Item>
    </Dropdown>;
};

export const HorizontalWithButtons = args => {
    const [savedValue, setSavedValue] = useState('2');
    const [value, setValue] = useState(savedValue);

    return <Dropdown
        {...args}
        value={value}
        onChange={v => {setValue(v); action('onChange')(v);}}
        mode="horizontal"
        closeOnClick={false}
        onCancel={() => {setValue(savedValue); action('onCancel')(savedValue);}}
        onConfirm={() => {setSavedValue(value); action('onConfirm')(value);}}
        renderSelected={item => <span>Selected: item {item.value}</span>}
        style={{ width: '90vw' }}
    >
        <Dropdown.Item value="1" style={{ width: '10em' }}>item 1</Dropdown.Item>
        <Dropdown.Item value="2" style={{ width: '10em' }}>item 2</Dropdown.Item>
        <Dropdown.Item value="3" style={{ width: '10em' }}>item 3</Dropdown.Item>
    </Dropdown>;
};

export const WithImages = args => {
    const url = 'https://raw.githubusercontent.com/akgcc/arkdata/main/assets/torappu/dynamicassets/arts/charavatars/';
    const [value, setValue] = useState();

    return <Dropdown
        {...args}
        value={value}
        onChange={v => {setValue(v);action('onChange')(v);}}
        renderSelected={item => <img src={`${url}${item.value}.png`} />}
    >
        <Dropdown.Item value="char_1040_blaze2"><img src={`${url}char_1040_blaze2.png`} /></Dropdown.Item>
        <Dropdown.Item value="char_1013_chen2"><img src={`${url}char_1013_chen2.png`} /></Dropdown.Item>
        <Dropdown.Item value="char_222_bpipe"><img src={`${url}char_222_bpipe.png`} /></Dropdown.Item>
    </Dropdown>;
};

export const HorizontalWithImages = args => {
    const url = 'https://raw.githubusercontent.com/akgcc/arkdata/main/assets/torappu/dynamicassets/arts/charavatars/';
    const [value, setValue] = useState();

    return <Dropdown
        {...args}
        value={value}
        mode="horizontal"
        onChange={v => {setValue(v);action('onChange')(v);}}
        renderSelected={item => <img src={`${url}${item.value}.png`} />}
        style={{ width: '90vw' }}
    >
        <Dropdown.Item value="char_1040_blaze2"><img src={`${url}char_1040_blaze2.png`} /></Dropdown.Item>
        <Dropdown.Item value="char_1013_chen2"><img src={`${url}char_1013_chen2.png`} /></Dropdown.Item>
        <Dropdown.Item value="char_222_bpipe"><img src={`${url}char_222_bpipe.png`} /></Dropdown.Item>
        <Dropdown.Item value="char_1040_blaze2"><img src={`${url}char_1040_blaze2.png`} /></Dropdown.Item>
        <Dropdown.Item value="char_1013_chen2"><img src={`${url}char_1013_chen2.png`} /></Dropdown.Item>
        <Dropdown.Item value="char_222_bpipe"><img src={`${url}char_222_bpipe.png`} /></Dropdown.Item>
    </Dropdown>;
};

export const HorizontalWithImagesAndTextAndButtons = args => {
    const [savedValue, setSavedValue] = useState('char_301_cutter');
    const [value, setValue] = useState(savedValue);

    return <Dropdown
        {...args}
        mode="horizontal"
        closeOnClick={false}
        value={value}
        style={{ width: '90vw' }}
        onChange={v => {setValue(v); action('onChange')(v);}}
        onCancel={() => {setValue(savedValue); action('onCancel')(savedValue);}}
        onConfirm={() => {setSavedValue(value); action('onConfirm')(value);}}
    >
        <Dropdown.Item value="char_301_cutter">
            <OperatorAvatar rarity="TIER_4" avatarId="char_301_cutter" name="Cutter" />
        </Dropdown.Item>
        <Dropdown.Item value="char_4177_brigid">
            <OperatorAvatar rarity="TIER_5" avatarId="char_4177_brigid" name="Brigid" />
        </Dropdown.Item>
        <Dropdown.Item value="char_4010_etlchi">
            <OperatorAvatar rarity="TIER_6" avatarId="char_4010_etlchi" name="Entelechia" />
        </Dropdown.Item>
        <Dropdown.Item value="char_1040_blaze2">
            <OperatorAvatar rarity="TIER_6" avatarId="char_1040_blaze2" name="Blaze" />
        </Dropdown.Item>
        <Dropdown.Item value="char_222_bpipe">
            <OperatorAvatar rarity="TIER_6" avatarId="char_222_bpipe" name="Bagpipe" />
        </Dropdown.Item>
        <Dropdown.Item value="char_1013_chen2">
            <OperatorAvatar rarity="TIER_6" avatarId="char_1013_chen2" name="Ch'en" />
        </Dropdown.Item>
    </Dropdown>;
};
