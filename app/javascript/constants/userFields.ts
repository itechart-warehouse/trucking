import { v4 as uuidv4 } from 'uuid';

export const userFields = [
  {
    id: uuidv4(),
    title: 'First Name',
    model: 'first_name',
    required: true,
    placeholder: 'Enter First Name',
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Middle name',
    model: 'middle_name',
    placeholder: 'Enter Middle Name',
    required: true,
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Last name',
    model: 'second_name',
    placeholder: 'Enter Last Name',
    required: true,
    type: 'text',
  },
  {
    id: uuidv4(),
    model: 'birthday',
    required: true,
    type: 'date',
  },
  {
    id: uuidv4(),
    title: 'Passport',
    model: 'passport',
    required: true,
    placeholder: 'Enter passport id',
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Login',
    model: 'login',
    placeholder: 'Login',
    required: true,
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Email',
    model: 'email',
    placeholder: 'Enter email',
    required: true,
    type: 'text',
  },
];

export const userFirstFields = [
  {
    id: uuidv4(),
    title: 'Town',
    model: 'town',
    placeholder: 'Town',
    required: true,
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Building',
    model: 'building',
    placeholder: 'Building',
    required: true,
    type: 'number',
  },
];

export const userSecondFields = [
  {
    id: uuidv4(),
    title: 'Street',
    model: 'street',
    placeholder: 'Street',
    required: true,
    type: 'text',
  },
  {
    id: uuidv4(),
    title: 'Apartment',
    model: 'apartment',
    placeholder: 'Apartment',
    required: true,
    type: 'number',
  },
];
