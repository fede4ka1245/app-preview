import React from 'react';
import InputMask from 'react-input-mask';

// eslint-disable-next-line react/prop-types
const InputTime = ({ value, onChange, onBlur, onFocus, ...props }) => {
  const _onFocus = () => {
    if (onFocus) {
      onFocus();
    }
  };

  const _onBlur = () => {
    if (onBlur) {
      onBlur();
    }
  };

  const onInputChange = (event) => {
    onChange(event.target.value.replace(/[^\d]/g, ''));
  };

  return (
    <>
      <InputMask
        onChange={onInputChange}
        mask="+7 999 999-99-99"
        className="form__input"
        id="reg_phone"
        type="tel"
        name="phone_number"
        value={value}
        {...props}
        maskChar={null}
        onFocus={_onFocus}
        onBlur={_onBlur}
      />
    </>
  );
};

export default InputTime;
