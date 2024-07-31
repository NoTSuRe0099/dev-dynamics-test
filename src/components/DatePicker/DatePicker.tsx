import React, { useState } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { MdOutlineDateRange } from 'react-icons/md';

interface IDatePickerProps {
  minDate: Date;
  maxDate: Date;
  dateRange: Range[];
  handleRangeChange: (e: any) => void;
}

const DatePicker: React.FC<IDatePickerProps> = (props) => {
  const { minDate, maxDate, dateRange, handleRangeChange } = props;
  const handleSelect = (e: RangeKeyDict) => {
    handleRangeChange(e?.selection);
  };
  const [isDateRangeOpened, setIsDateRangeOpened] = useState(false);

  return (
    <div className="flex justify-end relative gap-2">
      <button
        onClick={() => setIsDateRangeOpened((prevState) => !prevState)}
        className="py-[7px] px-2.5 inline-flex items-center gap-1 font-medium text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
      >
        {isDateRangeOpened ? 'Close' : 'All Time'} <MdOutlineDateRange />
      </button>
      {isDateRangeOpened && (
        <div className="absolute right-0 top-12 z-10 bg-white border shadow-sm rounded-xl p-4">
          <DateRange
            // focusedRange={[0, 0]}
            minDate={new Date(minDate)}
            maxDate={new Date(maxDate)}
            ranges={dateRange}
            onChange={handleSelect}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;
