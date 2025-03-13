import { AssistantSelect } from '../AssistantSelect';
import { Slider } from '../UI/Slider';
import { Button, ButtonTypes, IconTypes } from '../UI/Button';

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
            onSkinChange={onSkinChange}
            onOpChange={onOpChange}
        />
        <Slider value={scale} onChange={setScale} />
        <div className="assistant-edit-buttons">
            <Button
                type={ButtonTypes.Primary}
                icon={IconTypes.Confirm}
                text="Confirm"
                onClick={onSave}
            />
            <Button
                type={ButtonTypes.Secondary}
                icon={IconTypes.Cancel}
                text="Cancel"
                onClick={onCancel}
            />
        </div>
    </>;
};
