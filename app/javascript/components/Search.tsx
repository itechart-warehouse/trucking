import * as React from 'react';
import { Form, Formik } from 'formik';

import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { SearchProps } from '../common/interfaces_types';
import FormikField from '../UI/FormikField';
import { SearchPanel } from '../utils/style';

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const { handleSubmit, label } = props;

  const normalize = (text: any) => {
    handleSubmit(text.text.replace('\t', ' '));
  };

  return (
    <SearchPanel>
      <Formik
        initialValues={{ text: '' }}
        onSubmit={normalize}
      >
        <Form style={{ display: 'flex', alignItems: 'center', padding: '0 0 0 15px' }}>
          <FormikField
            name="text"
            label={label}
            required={false}
            type="text"
            color="success"
            variant="standard"
          />
          <IconButton size="large" aria-label="search" type="submit">
            <SearchIcon />
          </IconButton>
        </Form>
      </Formik>
    </SearchPanel>
  );
};

export default Search;
