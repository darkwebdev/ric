import { avatarImageSrc } from '../../network.js';
import { Rarity } from '../UI/Rarity.jsx';

export const AssistantAvatar = ({ avatarId, name, rarity }) =>
    <div className="operator-option">
        <img
            src={avatarImageSrc(avatarId)}
            alt={name}
            className="operator-avatar"
        />
        <Rarity rarity={rarity}/>
        <span className="operator-name">{name}</span>
    </div>
