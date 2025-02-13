import image from '../img/loading.jpg';

export const Loading = ({ text }) => <div className="loading">
    <img src={image} role="presentation" alt="" />
    <p>{text}</p>
</div>;
