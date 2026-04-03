import React from 'react';
import { FC } from 'react';

interface SelectProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  value: string;
}

const Select: FC<SelectProps> = ({ options, onChange, value }) => {
  return (
    <select
      className="pt-1 rounded"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option className="text-2xl" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
