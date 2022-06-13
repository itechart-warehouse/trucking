import * as React from 'react';
import { ErrorMessage, Field } from 'formik';
import TextField from '@mui/material/TextField';

interface FormikActionTextProps {
  name: string;
  label: string;
  type: string;
  required: boolean;
  variant: string;
  [key: string]: any;
}

const FormikActionText: React.FC<FormikActionTextProps> = ({
  name, label, type, required, variant, multiline, rows, ...other
}) => (
  <div>
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

  </div>
);

export default FormikActionText;
