import React, { useState, FocusEvent } from 'react';

interface InputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  validate?: boolean;
}

const FloatingLabelInput: React.FC<InputProps> = ({ id, label, type, value, setValue, validate = true }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsFocused(false);
    }
    let errorMessage = '';
    if (validate) {
      errorMessage = type === 'password' ? validatePassword(e.target.value) : type === 'email' ? validateEmail(e.target.value) : '';
    }
    setError(errorMessage);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (validate) {
      const errorMessage = type === 'password' ? validatePassword(e.target.value) : type === 'email' ? validateEmail(e.target.value) : '';
      setError(errorMessage);
    }
  };

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder=" "
        className={`w-full p-2 pt-5 bg-slate-100 border-2 rounded-2xl outline-none transition ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:border-blue-500`}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required
      />
      <label
        htmlFor={id}
        className={`absolute text-md duration-150 transform -translate-y-3 top-4 left-4 origin-[0] ${
          isFocused || value ? 'scale-75 -translate-y-4' : 'scale-100 translate-y-0'
        }`}
      >
        {label}*
      </label>
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

function validatePassword(password: string): string {
  if (password.length < 8) {
    return 'Password must be at least 8 characters.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must include at least one uppercase letter.';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must include at least one lowercase letter.';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must include at least one number.';
  }
  if (!/[\^$*.[\]{}()?“!@#%&/,><’:;|_~`]/.test(password)) {
    return 'Password must include at least one special character.';
  }
  return '';
}

function validateEmail(email: string): string {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email) ? '' : 'Please enter a valid email address.';
}

export default FloatingLabelInput;
