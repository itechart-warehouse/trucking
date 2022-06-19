import * as React from "react";
import { ErrorMessage, Field } from "formik";
import RichTextEditor from "../components/RichTextEditor";

interface FormikActionTextProps {
  name: string;
  label: string;
  type: string;
  required: boolean;
  variant: string;
}

const FormikActionText: React.FC<FormikActionTextProps> = ({
  name,
  label,
  type,
  required,
  variant,
  ...other
}) => (
  <Field
    required={required}
    autoComplete="off"
    as={RichTextEditor}
    label={label}
    name={name}
    type={type}
    helperText={<ErrorMessage name={name} className="error-msg" />}
    variant={variant}
    {...other}
  />
);

export default FormikActionText;
