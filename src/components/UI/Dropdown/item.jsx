export const Item = ({ children, selected, ...props }) => (
    <div className={`dropdown-item ${selected ? 'selected' : ''}`} {...props}>
        {children}
    </div>
);
