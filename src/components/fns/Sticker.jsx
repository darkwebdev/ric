export const Sticker = ({ line }) => {
    const { id, text, x, y, alignment, size, width, delay, duration } = line;

    return <div className="dialog-sticker">
        <p>{text}</p>
    </div>;
}
