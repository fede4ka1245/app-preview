import { InputStyle } from './InputStyle';
import { Option } from '../../models/types/Option';
import { InputType } from './InputType';
import React from 'react';

export type InputProps = {
  type?: string,
  placeholder?: string,
  inputType?: InputType,
  onChange?: (value: string) => any,
  value?: string | number,
  isSelect?: boolean,
  options?: Array<Option>
  setTargetOption?: (props: any) => any,
  targetOption?: Option,
  disablePast?: boolean,
  shouldDisableTime?: () => any,
  inputStyle?: InputStyle,
  width?: string,
  height?: string,
  disabled?: boolean,
  isError?: boolean,
  textError?: string,
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}
