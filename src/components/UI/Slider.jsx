export const Slider = ({ value, onChange = () => {} }) =>
    <input
        type="range"
        min="100"
        max="500"
        value={value}
        onChange={e => onChange(e.target?.value)}
    />
