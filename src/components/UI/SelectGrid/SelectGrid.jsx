import { Children, cloneElement, isValidElement } from 'react';
import { Button, ButtonTypes, ButtonVariants, IconTypes } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import './style.css';

export const SelectGrid = ({
  value,
  className = '',
  onChange = () => {},
  onConfirm = () => {},
  onCancel = () => {},
  children,
  ...rest
}) => {
  const items = Children.toArray(children)
    .filter(isValidElement)
    .map(child => ({
      value: child.props.value,
      element: child
    }));

  return (
    <div {...rest} className={`select-grid ${className}`}>
      <ul>
        {items.map(item => cloneElement(item.element, {
          ...item.props,
          key: item.value,
          onClick: () => {
            onChange(item.value);
          }
        }))}
      </ul>
      <ButtonGroup className="select-grid-footer">
        <Button
          type={ButtonTypes.Secondary}
          icon={IconTypes.Cancel}
          variant={ButtonVariants.Liquid}
          onClick={onCancel}
          text="Cancel"
        />
        <Button
          type={ButtonTypes.Primary}
          icon={IconTypes.Confirm}
          variant={ButtonVariants.Liquid}
          onClick={onConfirm}
          text="Confirm"
        />
      </ButtonGroup>
    </div>
  )
}
