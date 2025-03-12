import { action } from '@storybook/addon-actions';
import { Dropdown } from './index';
import { useState } from 'react';
import { Rarity } from '../Rarity.jsx';

export default {
    title: 'Dropdown',
    component: Dropdown,
    argTypes: {
        selectText: { control: 'text' },
    },
    parameters: {
        layout: 'centered',
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

export const WithImages = args => {
    const url = 'https://raw.githubusercontent.com/akgcc/arkdata/main/assets/torappu/dynamicassets/arts/charavatars/';
    const [value, setValue] = useState();

    return <Dropdown {...args} value={value} onChange={v => {setValue(v);action('onChange')(v);}}>
        <Dropdown.Item value="char_1040_blaze2"><img src={`${url}char_1040_blaze2.png`} /></Dropdown.Item>
        <Dropdown.Item value="char_1013_chen2"><img src={`${url}char_1013_chen2.png`} /></Dropdown.Item>
        <Dropdown.Item value="char_222_bpipe"><img src={`${url}char_222_bpipe.png`} /></Dropdown.Item>
    </Dropdown>;
};

export const WithImagesAndText = args => {
    const url = 'https://raw.githubusercontent.com/akgcc/arkdata/main/assets/torappu/dynamicassets/arts/charavatars/';
    const [value, setValue] = useState();

    return <Dropdown {...args} value={value} onChange={v => {setValue(v);action('onChange')(v);}}>
        <Dropdown.Item value="char_301_cutter">
            <img src={`${url}char_301_cutter.png`} />
            <Rarity rarity="TIER_4" />
            <p>Cutter</p>
        </Dropdown.Item>
        <Dropdown.Item value="char_4177_brigid">
            <img src={`${url}char_4177_brigid.png`} />
            <Rarity rarity="TIER_5" />
            <p>Brigid</p>
        </Dropdown.Item>
        <Dropdown.Item value="char_4010_etlchi">
            <img src={`${url}char_4010_etlchi.png`} />
            <Rarity rarity="TIER_6" />
            <p>Entelechia</p>
        </Dropdown.Item>
    </Dropdown>;
};
