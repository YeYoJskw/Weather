import React, { FC, useState, useRef, useEffect } from 'react';

interface SelectProps {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  value: string;
}

const Select: FC<SelectProps> = ({ options, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center justify-between
          min-w-35 px-4 py-2
          bg-white/10 backdrop-blur-sm
          border border-white/20
          rounded-xl
          text-white text-lg font-medium
          cursor-pointer
          transition-all duration-200
          hover:bg-white/20 hover:border-white/40
          focus:outline-none focus:ring-2 focus:ring-white/50
        "
      >
        <span>{selectedOption?.label}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="
          absolute top-full left-0 mt-2
          min-w-full w-max
          bg-white/90 backdrop-blur-md
          rounded-xl
          shadow-lg
          overflow-hidden
          z-50
          animate-in fade-in duration-200
        "
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`
                block w-full text-left px-4 py-2.5
                text-gray-800 text-base
                transition-colors duration-150
                hover:bg-amber-100
                ${value === option.value ? 'bg-amber-50 text-amber-700 font-medium' : ''}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
