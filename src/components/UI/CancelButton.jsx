import iconCancel from '../../img/icon_cancel.png';

export const CancelButton = ({ onClick = () => {}, text = 'Revert Changes' }) =>
    <button onClick={onClick}>
        <img src={iconCancel} role="presentation" alt=""/>{text}
    </button>
