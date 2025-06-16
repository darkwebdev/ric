import './style.css';

export const ButtonGroup = ({
    className = '',
    children,
    ...rest
}) =>
    <div {...rest} className={`button-group ${className}`}>
      {children}
    </div>
