import { Rarities } from '../../const.js';

export const AssistantSelect = ({ operators, operator, skin, onSkinChange, onOpChange }) => {
    console.log('AssistantSelect', operators, operator, skin);
    return operators && <>
        <select
            className="assistant-select"
            defaultValue={operator.charId}
            onChange={onOpChange}
        >
            {operators.map(op => (
                <option key={op.charId} value={op.charId}>
                    {Rarities.indexOf(op.rarity)+1}* {op.name}
                </option>
            ))}
        </select>
        {operator &&
            <select
                className="assistant-skin-select"
                defaultValue={skin}
                onChange={onSkinChange}
            >
                {operator.skins.map(({ skinId, portraitId, displaySkin }, i) => (
                    <option key={skinId} value={portraitId}>
                        {skinName(displaySkin, i)}
                    </option>
                ))}
            </select>
        }
    </>
}

const skinName = (skin, i) =>
    skin.skinGroupName === 'Default Outfit' ? `Elite ${i + 1}` : skin.skinGroupName;
