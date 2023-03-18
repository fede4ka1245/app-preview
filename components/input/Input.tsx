import React, { ForwardedRef, useCallback, useEffect, useState } from 'react';
import styles from './Input.module.scss';
import { InputProps } from './InputProps';
import classNames from 'classnames';
import { InputStyle } from './InputStyle';
import { InputType } from './InputType';
import InputDate from './components/inputDate/InputDate';
import InputTime from './components/inputTime/InputTime';
import InputPhone from './components/inputPhone/InputPhone';
import { Grid } from '@mui/material';
import arrowImage from './assets/arrow.svg';
// @ts-ignore
import InputMask from 'react-input-mask';
import Image from "next/image";

const Input = (props : InputProps, ref: ForwardedRef<any>) => {
  const { placeholder, textError, isError, inputType, onChange, inputProps, value, setTargetOption, targetOption, options, disablePast, shouldDisableTime, inputStyle, width, height, disabled, type } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [inputLabel, setInputLabel] = useState(value);
  const [isOptionsActive, setIsOptionsActive] = useState(false);
  const [option, setOption] = useState(targetOption);

  const [isOptionsInputOpen, setIsOptionsInputOpen] = useState(false);

  const toggleIsOptionsInputOpen = useCallback(() => {
    setIsOptionsInputOpen(prevState => !prevState);
  }, []);

  const toggleIsOptionActive = () => {
    if (inputType === InputType.optionsInput && !isOptionsInputOpen) {
      toggleIsOptionsInputOpen();
      return;
    }

    if (inputType !== InputType.options) {
      return;
    }

    if (isOptionsActive) {
      setIsOptionsActive(false);
    } else {
      setIsOptionsActive(true);
    }
  };

  useEffect(() => {
    setInputLabel(value);
  }, [value]);

  const onInputChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
    setInputLabel(value);
  };

  const isBottom = () => {
    return !(!!value || !!targetOption?.label || !!option?.label || !!inputLabel || isFocused);
  };

  return (
    <section
      onClick={toggleIsOptionActive}
      className={classNames(
        { [styles.textarea]: inputType === InputType.textarea },
        { [styles.input]: inputType !== InputType.textarea },
        { [styles.filled]: inputStyle !== InputStyle.outlined || !isBottom() },
        { [styles.outlined]: inputStyle === InputStyle.outlined && isBottom() },
        { [styles.disabled]: disabled && inputStyle !== InputStyle.outlined },
        { [styles.outlinedDisabled]: disabled && inputStyle === InputStyle.outlined }
      )}
      style={{ width, height }}
    >
      {isError && <div className={styles.textError}>
        {textError || '* Пусто'}
      </div>}
      {inputType === InputType.date && <InputDate
        disablePast={disablePast}
        value={inputLabel}
        onChange={onInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={classNames(styles.input)}
      />}
      {inputType === InputType.time && <InputTime
        shouldDisableTime={shouldDisableTime}
        value={inputLabel}
        onChange={onInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={classNames(styles.input)}
      />}
      {inputType === InputType.phone && <InputPhone
        value={value}
        onChange={onInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={classNames(styles.input)}
      />}
      {inputType === InputType.textarea && <textarea
        value={value}
        onChange={(event) => onInputChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={classNames(styles.textarea)}
        autoComplete="new-password"
      />}
      {inputType === InputType.coordinates && <InputMask
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => onInputChange(event.target.value)}
        mask="99.99"
        type="tel"
        value={value}
      />}
      {!inputType && <input
        onChange={(event) => onInputChange(event.target.value)}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={ref}
        {...inputProps}
        autoComplete="new-password"
        type={type}
      />}
      {(inputType === InputType.options || inputType === InputType.optionsInput) && (<>
        <Grid container display={'flex'} alignItems={'center'} wrap={'nowrap'} height={'50px'}>
          <Grid item flex={1} className={styles.selectLabel}>
            {targetOption ? targetOption.label : option?.label}
          </Grid>
          <Grid item pl={'5px'} pr={'18px'}>
            <Image alt='' src={arrowImage}/>
          </Grid>
        </Grid>
      </>)}
      <label className={classNames(styles.placeholder, { [styles.bottom]: isBottom() }, { [styles.top]: !isBottom() })}>
        {placeholder}
      </label>
    </section>
  );
};

export default React.forwardRef(Input);
