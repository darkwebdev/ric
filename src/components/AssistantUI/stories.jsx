import { action } from '@storybook/addon-actions';
import { AssistantContext } from '../Assistant';
import { Modes } from '../Home';
import { AssistantUI } from './index';

export default {
    title: 'Assistant/UI',
    component: AssistantUI,
    argTypes: {
        opId: { control: 'text' },
        skin: { control: 'text' },
        scale: { control: 'range', min: 0, max: 100 },
        position: { control: 'object' },
    },
};

export const Default = args =>
    <AssistantContext.Provider value={{
        position: { x: 0, y: 0 },
        scale: 50,
        nextTalkTitle: action('onClick'),
        ...args
    }}>
        <AssistantUI mode={Modes.Default} />
    </AssistantContext.Provider>

export const WithText = args =>
    <AssistantContext.Provider value={{
        opId: 'char_4134_cetsyr',
        position: { x: 0, y: 0 },
        scale: 50,
        nextTalkTitle: action('onClick'),
        ...args
    }}>
        <AssistantUI mode={Modes.Default} />
    </AssistantContext.Provider>

export const EditMode = args =>
    <AssistantContext.Provider value={{
        position: { x: 0, y: 0 },
        scale: 50,
        setScale: action('setScale'),
        nextTalkTitle: action('onClick'),
        saveAssistant: action('saveAssistant'),
        ...args
    }}>
        <AssistantUI
          mode={Modes.Edit}
          setMode={action('setMode')}
          onSave={action('onSave')}
          onCancel={action('onCancel')}
        />
    </AssistantContext.Provider>

export const SelectMode = args =>
    <AssistantContext.Provider value={{
        position: { x: 0, y: 0 },
        scale: 50,
        setScale: action('setScale'),
        nextTalkTitle: action('onClick'),
        saveAssistant: action('saveAssistant'),
        setOpId: action('setOpId'),
        setSkin: action('setSkin'),
        ...args
    }}>
        <AssistantUI
          mode={Modes.Select}
          setMode={action('setMode')}
          onSave={action('onSave')}
          onCancel={action('onCancel')}
        />
    </AssistantContext.Provider>
