import { useState, useRef, Children, cloneElement, isValidElement, useEffect } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside.js';
import { Button, ButtonTypes, ButtonVariants, IconTypes } from '../Button';
import './style.css';
import { ButtonGroup } from '../ButtonGroup';

export const Dropdown = ({
  mode = 'vertical',
  selectText = 'Select an option',
  value,
  onOpen = () => {},
  onClose = () => {},
  onChange = () => {},
  onConfirm = () => {},
  onCancel = () => {},
  closeOnClick = true,
  renderSelected = item => item.value,
  className,
  children,
  ...rest
}) => {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setOpen(false));

  useEffect(() => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [isOpen]);

  const items = Children.toArray(children)
    .filter(isValidElement)
    .map(child => ({
      value: child.props.value,
      element: child
    }));

  const selectedItem = items.find(option => option.value === value);
  const selectedItemLabel = selectedItem ? renderSelected(selectedItem) : selectText;

  return (
    <div
      {...rest}
      ref={dropdownRef}
      className={`dropdown ${className || ''} dropdown-${mode}`}
    >
      {selectedItemLabel &&
        <div className="dropdown-selected" onClick={() => setOpen(!isOpen)}>
          {selectedItemLabel}
        </div>
      }
      {isOpen &&
        <div className="dropdown-menu">
          <ul>
            {items.map(item => cloneElement(item.element, {
                ...item.props,
                key: item.value,
                onClick: () => {
                  onChange(item.value);
                  if (closeOnClick) setOpen(false);
                }
            }))}
          </ul>
          {!closeOnClick && (
            <ButtonGroup>
              <Button
                type={ButtonTypes.Secondary}
                icon={IconTypes.Cancel}
                variant={ButtonVariants.Liquid}
                onClick={() => {
                  onCancel();
                  setOpen(false);
                }}
                text="Cancel"
              />
              <Button
                type={ButtonTypes.Primary}
                icon={IconTypes.Confirm}
                variant={ButtonVariants.Liquid}
                onClick={() => {
                  onConfirm();
                  setOpen(false);
                }}
                text="Confirm"
              />
            </ButtonGroup>
          )}
        </div>
      }
    </div>
  );
};
