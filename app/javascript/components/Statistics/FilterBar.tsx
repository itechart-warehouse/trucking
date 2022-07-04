import * as React from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SearchPanel } from '../../utils/style';
import { BasicDateRangePickerProps } from '../../common/interfaces_types';
import httpClient from '../../api/httpClient';
import { useDebouncedEffect } from './hook/useDebounceEffect';

const BasicDateRangePicker
  : React.FC<BasicDateRangePickerProps> = (props: BasicDateRangePickerProps) => {
    const {
      setUserLogs,
    } = props;
    const [debounced, setDebounced] = React.useState('');
    const [searchName, setSearchName] = React.useState('');
    const [actionData, setActionData] = React.useState('');
    const [startDate, setStartDate] = React.useState<Date | string>('');
    const [endDate, setEndDate] = React.useState<Date | string>(new Date());
    const [filters, setFilters] = React.useState({
      name: searchName,
      action: actionData,
    });

    useDebouncedEffect(() => {
      setDebounced(searchName);
    }, [searchName], 500);

    React.useEffect(() => {
      if (debounced || actionData !== '' || startDate !== '') {
        httpClient.statistics
          .dataFilter(filters, String(startDate), String(endDate))
          .then((res) => { setUserLogs(res.data); });
      }
    }, [actionData, startDate, endDate, debounced]);

    const handleInput = (field) => (event) => {
      const { value } = event.target;

      setFilters({
        ...filters,
        [field]: value,
      });

      switch (field) {
        case 'name':
          setSearchName(value);
          break;
        case 'action':
          setActionData(value);
          break;
        default:
          break;
      }
    };

    const handlerCancelBtn = () => {
      filters.name = '';
      filters.action = '';
      setEndDate(new Date());
      setStartDate(String(''));
    };

    return (
      <SearchPanel>
        <TextField
          id="name"
          name="name"
          label="Name"
          value={filters.name}
          color="success"
          onChange={handleInput('name')}
        />

        <FormControl
          sx={{ width: '235px' }}
          color="success"
        >
          <InputLabel id="demo-simple-select-label">Action</InputLabel>
          <Select
            name="action"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filters.action}
            label="Action"
            onChange={handleInput('action')}
          >
            <MenuItem value="create">create</MenuItem>
            <MenuItem value="update">update</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          sx={{ display: 'flex', alignItems: 'center', mb: 3 }}
        >
          <DatePicker
            disableFuture
            label="from"
            openTo="day"
            views={['year', 'month', 'day']}
            value={startDate}
            onChange={(newDate: string) => setStartDate(String(newDate))}
            renderInput={(params) => <TextField {...params} color="success" />}
          />
          <DatePicker
            disableFuture
            label="to"
            openTo="day"
            views={['year', 'month', 'day']}
            value={endDate}
            onChange={(newDate: Date) => setEndDate(newDate)}
            renderInput={(params) => <TextField {...params} color="success" />}
          />
        </LocalizationProvider>

        <Button
          variant="outlined"
          color="error"
          sx={{ height: '56px' }}
          size="large"
          onClick={handlerCancelBtn}
        >
          Cancel
        </Button>
      </SearchPanel>
    );
  };

export default BasicDateRangePicker;
