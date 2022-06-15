import * as React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextField from '@mui/material/TextField';

interface FormikActionTextProps {
  name: string;
  label: string;
  type: string;
  required: boolean;
  variant: string;
  multiline: boolean;
  rows: number;
  [key: string]: any;
}

const FormikActionText: FormikActionTextProps = ({
  name,
  label,
  type,
  required,
  variant,
  multiline,
  rows,
  ...other
}) => (
  <Field
    required={required}
    autoComplete="off"
    as={TextField}
    label={label}
    name={name}
    multiline
    fullWidth
    type={type}
    rows={rows}
    helperText={<ErrorMessage name={name} className="error-msg" />}
    variant={variant}
    {...other}
  />
);

export default FormikActionText;
