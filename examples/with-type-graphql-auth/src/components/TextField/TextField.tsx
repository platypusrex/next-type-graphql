import React from 'react';
import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from '@chakra-ui/react';

type TextFieldProps = FormControlProps &
  Pick<InputProps, 'isFullWidth' | 'value' | 'type' | 'name' | 'onChange' | 'placeholder'> & {
    errorText?: string;
    helperText?: string;
  };

export const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  type,
  label,
  name,
  helperText,
  errorText,
  onChange,
  ...rest
}) => (
  <FormControl {...rest}>
    <FormLabel>{label}</FormLabel>
    <Input name={name} type={type} placeholder={placeholder} onChange={onChange} />
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
    <FormErrorMessage>{errorText}</FormErrorMessage>
  </FormControl>
);
