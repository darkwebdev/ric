export const Item = ({
    children,
    selected,
    className = '',
    ...rest
}) => (
    <li
        {...rest}
        className={`grid-item ${className} ${selected ? 'selected' : ''}`}
    >
        {children}
    </li>
);
