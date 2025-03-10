import iconConfirm from '../../img/icon_confirm.png';

export const SaveButton = ({ onClick = () => {}, text = 'Confirm Changes' }) =>
    <button onClick={onClick}>
        <img src={iconConfirm} role="presentation" alt=""/>{text}
    </button>
