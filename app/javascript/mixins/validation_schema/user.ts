import * as Yup from 'yup';

const REGX_ONLY_LETTER = /^[A-Za-z]*$/;
const REGX_LOWER_UPPER_CASE = /^(?=.*?[A-Z])(?=.*?[a-z])/;
const REGEX_MIX_LETTERS_NUMBERS = /^(?=.*?[0-9])/;
const REGEX_SPECIAL_SYMBOL = /^(?=.*?[#?!@$%^&*-])/;
const REGX_ONLY_NUMBER = /^[\d]+$/;

const userValidation = Yup.object().shape({
  first_name: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Name must be alphabets only')
    .min(2, 'Too Short!')
    .required('Required'),

  second_name: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Name must be alphabets only')
    .min(2, 'Too Short!')
    .required('Required'),

  middle_name: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Name must be alphabets only')
    .min(2, 'Too Short!')
    .required('Required'),

  birthday: Yup.date()
    .required('Required'),

  email: Yup.string()
    .lowercase()
    .email('Must be a valid email!')
    .required('Required!'),

  login: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Login must be alphabets only')
    .min(2, 'Too Short!')
    .required('Required!'),

  apartment: Yup.string()
    .matches(REGX_ONLY_NUMBER, 'Apartment must be numbers only')
    .required('Required'),

  building: Yup.string()
    .matches(REGX_ONLY_NUMBER, 'building must be numbers only')
    .required('Required'),

  town: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Town must be alphabets only')
    .min(2, 'Must be of length 2 to 255')
    .required('Required'),

  street: Yup.string()
    .matches(REGX_ONLY_LETTER, 'Street must be alphabets only')
    .min(2, 'Must be of length 2 to 255')
    .required('Required'),

});

export default userValidation;
