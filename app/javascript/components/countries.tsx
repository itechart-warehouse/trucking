import * as React from 'react';

import { CountriesProps, Country } from '../common/interfaces_types';

const Countries: React.FC<CountriesProps> = (props: CountriesProps) => {
  const {
    countries, total_count,
  } = props;
  const [countriesCount, setCountriesCount] = React.useState<number>(total_count);
  const [country, setCountry] = React.useState<Country[]>(countries);

  return (
    <div className="wrapper" />
  );
};

export default Countries;
