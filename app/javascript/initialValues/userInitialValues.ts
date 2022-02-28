export interface userFormValues {
  first_name: string;
  middle_name: string;
  second_name: string;
  email: string;
  login: string;
  password: string;
  password_confirmation: string;
  birthday: string;
  apartment: string;
  building: string;
  street: string;
  town: string;
  role: string,
  passport: string,
  company: string,
}

const userInitialValues: userFormValues = {
  first_name: '',
  middle_name: '',
  second_name: '',
  birthday: '',
  login: '',
  email: '',
  password: '',
  password_confirmation: '',
  apartment: '',
  building: '',
  street: '',
  town: '',
  role: '',
  passport: '',
  company: '',
};

export interface FormikSelectItem {
  label: string;
  value: string;
}

export const roleItems: FormikSelectItem[] = [
  {
    label: 'Dispatcher',
    value: 'dispatcher',
  },
  {
    label: 'Manager',
    value: 'manager',
  },
  {
    label: 'Driver',
    value: 'driver',
  },
  {
    label: 'Owner',
    value: 'owner',
  },
];

export default userInitialValues;
