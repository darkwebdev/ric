import iconCancel from '../../../img/icon_cancel_32.png';
import iconChange from '../../../img/icon_change_45.png';
import iconConfirm from '../../../img/icon_confirm_32.png';
import iconSkin from '../../../img/icon_skin_40.png';
import iconHide from '../../../img/icon_hide_ui.png';
import './style.css';

export const ButtonTypes = {
    Primary: 'primary',
    Secondary: 'secondary',
    Danger: 'danger',
    Icon: 'icon',
    // Link: 'link',
};

const typeClasses = {
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
    Skin: 'skin',
    Hide: 'hide',
};

export const ButtonVariants = {
    Liquid: 'liquid',
};

const variantClasses = {
    [ButtonVariants.Liquid]: 'button-liquid',
};

const icons = {
    [IconTypes.Cancel]: iconCancel,
    [IconTypes.Change]: iconChange,
    [IconTypes.Confirm]: iconConfirm,
    [IconTypes.Skin]: iconSkin,
    [IconTypes.Hide]: iconHide,
};

export const Button = ({
    type = ButtonTypes.Secondary,
    variant,
    onClick = () => {},
    text,
    icon,
    className = '',
    ...rest
}) => {
    const classNames = `button ${className} ${typeClasses[type] || ''} ${variantClasses[variant] || ''}`;

    return <button
      {...rest}
      onClick={onClick}
      className={classNames}
      type="button"
    >
        {icon && <img src={icons[icon]} role="presentation" alt=""/>}
        {text && <span>{text}</span>}
        {!icon && !text && <>&nbsp;</>}
    </button>;
}
