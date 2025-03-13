import iconCancel from '../../../img/icon_cancel_32.png';
import iconChange from '../../../img/icon_change_45.png';
import iconConfirm from '../../../img/icon_confirm_32.png';
import iconHide from '../../../img/icon_hide_ui.png';
import './style.css';

export const ButtonTypes = {
    Primary: 'primary',
    Secondary: 'secondary',
    Danger: 'danger',
    Icon: 'icon',
    // Link: 'link',
};

const classNames = {
    [ButtonTypes.Primary]: 'button-primary',
    [ButtonTypes.Secondary]: 'button-secondary',
    [ButtonTypes.Danger]: 'button-danger',
    [ButtonTypes.Icon]: 'button-icon',
    // [ButtonTypes.Link]: 'button-link',
};

export const IconTypes = {
    Cancel: 'cancel',
    Change: 'change',
    Confirm: 'confirm',
    Hide: 'hide',
};

const icons = {
    [IconTypes.Cancel]: iconCancel,
    [IconTypes.Change]: iconChange,
    [IconTypes.Confirm]: iconConfirm,
    [IconTypes.Hide]: iconHide,
};

export const Button = ({ type = ButtonTypes.Secondary, onClick = () => {}, text, icon }) =>
    <button onClick={onClick} className={`button ${classNames[type] || ''}`}>
        {icon && <img src={icons[icon]} role="presentation" alt=""/>}
        {text && <span>{text}</span>}
        {!icon && !text && <>&nbsp;</>}
    </button>
