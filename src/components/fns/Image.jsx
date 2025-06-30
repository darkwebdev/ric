import { imageSrc } from '../../asset-sources';

export const Image = ({ line }) => {
    const { image } = line;


    return image && <img
        className="dialog-image"
        src={imageSrc(image)}
        role="presentation"
        alt=""
    />;
};
