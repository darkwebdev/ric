import { useState, useRef, Children, cloneElement, isValidElement } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside.js';
import './style.css';

export const Dropdown = ({ selectText = 'Select an option', value, onChange = () => {}, className, children }) => {
  const [isOpen, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useClickOutside(dropdownRef, () => setOpen(false));

  const items = Children.toArray(children)
    .filter(isValidElement)
    .map(child => ({
      value: child.props.value,
      element: child
    }));

  const selectedItem = items.find(option => option.value === value);

  return (
    <div ref={dropdownRef} className={`dropdown ${className || ''}`}>
      <div className="dropdown-selected" onClick={() => setOpen(!isOpen)}>
        {selectedItem ?
          cloneElement(selectedItem.element, { selected: true }) :
          selectText}
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {items.map(item => cloneElement(item.element, {
              ...item.props,
              key: item.value,
              onClick: () => {
                onChange(item.value);
                setOpen(false);
              }
          }))}
        </div>
      )}
    </div>
  );
};
