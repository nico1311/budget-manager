// from https://gist.github.com/baumandm/8665a34bc418574737847f7394f98bd9
import React, { HTMLAttributes } from 'react';
import ReactDatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

interface Props {
  isClearable?: boolean;
  onChange: (date: Date) => any;
  selectedDate: Date | undefined;
  showPopperArrow?: boolean;
}

const DatePicker = ({
  selectedDate,
  onChange,
  isClearable = false,
  showPopperArrow = false,
  ...props
}: Props & HTMLAttributes<HTMLElement>) => {
  return (
    <ReactDatePicker
      dateFormat="MM/dd/yyyy hh:mm aa"
      selected={selectedDate}
      onChange={onChange}
      isClearable={isClearable}
      showPopperArrow={showPopperArrow}
      showTimeInput
      {...props}
    />
  );
};

export default DatePicker;
