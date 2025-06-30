import { backgroundSrc } from '../../asset-sources';

export const Background = ({ line }) => {
    const { image } = line;

    return <>
        {image && <img
            className="dialog-image dialog-background"
            src={backgroundSrc(image)}
            role="presentation"
            alt=""
        />}
    </>;
}
