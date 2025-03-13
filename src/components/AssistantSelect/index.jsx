import { charArtSrc } from '../../network.js';
import { Dropdown } from '../UI/Dropdown';
import { AssistantAvatar } from '../Assistant/AssistantAvatar.jsx';
import './style.css';

export const AssistantSelect = ({ operators, operator, skin, onSkinChange, onOpChange }) => {
    console.log('AssistantSelect', operators, operator, skin);

    const operatorItems = operators?.map(op => ({
        value: op.charId,
        label: op.name,
        data: op
    })) || [];

    const skinOptions = operator?.skins.map((skinData, i) => ({
        value: skinData.portraitId,
        label: skinName(skinData.displaySkin, i),
        data: skinData
    })) || [];

    return operators && (
        <div className="assistant-skin-selector">
            <Dropdown
                className="assistant-select"
                value={operator?.charId}
                onChange={onOpChange}
            >
                {operatorItems.map(item =>
                    <Dropdown.Item value={item.value} key={item.value}>
                        <AssistantAvatar avatarId={item.value} rarity={item.data.rarity} name={item.label} />
                    </Dropdown.Item>
                )}
            </Dropdown>

            {operator && (
                <Dropdown
                    className="skin-select"
                    value={skin}
                    onChange={onSkinChange}
                >
                    {skinOptions.map(item =>
                        <Dropdown.Item value={item.value} key={item.value}>
                            <div className="skin-option">
                                <img
                                    src={charArtSrc(item.data.skinId)}
                                    alt={item.label}
                                    className="skin-image"
                                />
                                <span>{item.label}</span>
                            </div>
                        </Dropdown.Item>
                    )}
                </Dropdown>
            )}
        </div>
    );
};

const skinName = (skin, i) =>
    skin.skinGroupName === 'Default Outfit' ? `Elite ${i + 1}` : skin.skinGroupName;
