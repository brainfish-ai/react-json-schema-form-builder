import React, { FC } from 'react';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  checkbox: {
    '& input[type="checkbox"]': {
      height: 0,
      width: 0,
      margin: 0,
      display: 'none',
    },
    '& label': {
      cursor: 'pointer',
      textIndent: '46px',
      width: '42px',
      height: '25px',
      background: 'transparent',
      display: 'block',
      borderRadius: '25px',
      position: 'relative',
      border: '2px solid black', // Added black border
      '&:after': {
        content: '""',
        position: 'absolute',
        top: '1px',
        left: '3px',
        width: '19px',
        height: '19px',
        background: '#000', // Changed to black
        borderRadius: '19px',
        transition: '0.3s',
      },
    },
    '& input:checked + .checkbox-overlay label': {
      background: '#A3E635',
      '&:after': {
        left: 'calc(100% - 3px)',
        transform: 'translateX(-100%)',
      },
    },
    '& input:disabled + .checkbox-overlay label': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
});
interface FBCheckboxProps {
  onChangeValue: (_arg0: { [key: string]: any }) => void;
  isChecked: boolean;
  id?: string;
  label?: string;
  use?: string;
  value?: string;
  disabled?: boolean;
  dataTest?: string;
  labelClassName?: string;
}

const FBCheckbox: FC<FBCheckboxProps> = ({
  onChangeValue,
  value = '',
  isChecked = false,
  label = '',
  use = 'action',
  disabled = false,
  id = '',
  dataTest = '',
  labelClassName = '',
}) => {
  const classjss = useStyles();
  const classes = classnames('fb-checkbox', {
    'edit-checkbox': !disabled && use === 'edit',
    'action-checkbox': !disabled && use === 'action',
    'disabled-checked-checkbox': disabled && isChecked,
    'disabled-unchecked-checkbox': disabled && !isChecked,
  });
  const potentialCheckboxId = id !== '' ? id : label;
  const checkboxId =
    potentialCheckboxId !== '' ? potentialCheckboxId : undefined;
  return (
    <div data-test='checkbox' className={`${classes} ${classjss.checkbox}`}>
      <input
        type='checkbox'
        id={checkboxId}
        data-test={dataTest || undefined}
        onChange={(event) => {
          if (!disabled) {
            onChangeValue(event);
          }
        }}
        value={value}
        disabled={disabled}
        checked={isChecked}
      />
      <div className='checkbox-overlay'>
        {label && (
          <label htmlFor={checkboxId} className={labelClassName || undefined}>
            {label}
          </label>
        )}
      </div>
    </div>
  );
};

export default FBCheckbox;
