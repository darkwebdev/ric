import { avatarImageSrc } from '../../asset-sources';
import { Rarity } from '../UI/Rarity';
import './style.css';

export const OperatorAvatar = ({ avatarId, name, rarity, ...rest }) =>
    <div {...rest} className="operator-avatar">
        <img
            src={avatarImageSrc(avatarId)}
            alt={name}
            className="operator-avatar-img"
        />
        <Rarity rarity={rarity} />
        <span className="operator-avatar-name">{name}</span>
    </div>
