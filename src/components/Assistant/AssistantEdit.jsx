import { AssistantSelect } from './AssistantSelect.jsx';
import { SaveButton } from '../UI/SaveButton.jsx';
import { CancelButton } from '../UI/CancelButton.jsx';
import { Slider } from '../UI/Slider.jsx';

export const AssistantEdit = ({
    operators,
    operator,
    skin,
    onSkinChange,
    scale,
    setScale,
    onOpChange,
    onSave,
    onCancel
}) => {
    return <>
        <AssistantSelect
            operators={operators}
            operator={operator}
            skin={skin}
            onSkinChange={e => onSkinChange(e.target?.value)}
            onOpChange={onOpChange}
        />
        <Slider value={scale} onChange={setScale} />
        <SaveButton onClick={onSave} />
        <CancelButton onClick={onCancel} />
    </>;
};
