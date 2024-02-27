import React from 'react';
import DatePicker from 'react-datepicker';
import { getMonth, getYear } from 'date-fns';
import range from 'lodash/range';
import 'react-datepicker/dist/react-datepicker.css';

interface IBDatepicker {
    label: string;
    date: Date | null;
    setDate: (date: Date) => void;
    style?: React.CSSProperties;
}

const BDatepicker = (props: IBDatepicker) => {
    const { label, date, setDate, style } = props;

    const years = range(1800, getYear(new Date()) + 1, 1);
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
            <label>{label}</label>
            <DatePicker
                renderCustomHeader={({
                    date,
                    changeYear,
                    changeMonth,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div
                        style={{
                            margin: 10,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <button disabled={prevMonthButtonDisabled} onClick={decreaseMonth}>
                            {'<'}
                        </button>
                        {/* eslint-disable */}
						<select
							value={getYear(date)}
							onChange={({ target: { value } }: { target: { value: any } }) =>
								changeYear(value)
							}
						>
							{years.map((option: any) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
						{/* eslint-enable */}
                        <select
                            value={months[getMonth(date)]}
                            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                        >
                            {months.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <button disabled={nextMonthButtonDisabled} onClick={increaseMonth}>
                            {'>'}
                        </button>
                    </div>
                )}
                selected={date}
                onChange={(date: Date) => setDate(date)}
            />
        </div>
    );
};

export default BDatepicker;
