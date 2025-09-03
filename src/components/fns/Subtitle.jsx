import { parseContent } from '../../parse';

export const Subtitle = ({ line }) => {
    const { text, x, y, alignment, size, width, delay } = line;

    return <div className="dialog-subtitle">
        <p dangerouslySetInnerHTML={{ __html: parseContent(text) }}></p>
    </div>;
}
