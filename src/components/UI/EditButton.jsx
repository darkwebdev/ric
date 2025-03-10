import iconChange from '../../img/icon_rechange.png';

export const EditButton = ({ onClick }) =>
    <button className="icon-button" onClick={onClick}>
        <img src={iconChange} role="presentation" style={{ filter: 'invert(1)', width: '90%' }} alt="" />
    </button>;
