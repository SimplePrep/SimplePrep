import React, { useState, FocusEvent } from 'react';

interface InputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  validate?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const FloatingLabelInput: React.FC<InputProps> = ({
  id,
  label,
  type,
  value,
  setValue,
  validate = true,
  inputProps = {},
}) => {
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsDirty(true);
    
    if (validate && touched) {
      const errorMessage = type === 'password'
        ? validatePassword(newValue)
        : type === 'email'
        ? validateEmail(newValue)
        : '';
      setError(errorMessage);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    if (validate) {
      const errorMessage = type === 'password'
        ? validatePassword(value)
        : type === 'email'
        ? validateEmail(value)
        : '';
      setError(errorMessage);
    }
  };

  const getInputClassName = () => {
    const baseClasses = "peer w-full px-4 py-3 rounded-lg border-2 placeholder-transparent focus:outline-none transition-colors";
    
    if (error && (touched || isDirty)) {
      return `${baseClasses} border-red-500 focus:border-red-500`;
    }
    
    if (touched && !error && value) {
      return `${baseClasses} border-green-500 focus:border-green-500`;
    }
    
    return `${baseClasses} border-gray-200 focus:border-green-500`;
  };

  const getLabelClassName = () => {
    const baseClasses = "absolute left-4 -top-2.5 bg-white/70 px-1 text-sm transition-all " +
      "peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 " +
      "peer-focus:-top-2.5 peer-focus:text-sm";

    if (error && (touched || isDirty)) {
      return `${baseClasses} text-red-500 peer-placeholder-shown:text-red-400 peer-focus:text-red-500`;
    }
    
    if (touched && !error && value) {
      return `${baseClasses} text-green-600 peer-placeholder-shown:text-gray-400 peer-focus:text-green-600`;
    }
    
    return `${baseClasses} text-gray-600 peer-placeholder-shown:text-gray-400 peer-focus:text-green-600`;
  };

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder=" "
        className={getInputClassName()}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        {...inputProps}
      />
      <label
        htmlFor={id}
        className={getLabelClassName()}
      >
        {label}*
      </label>
      {error && (touched || isDirty) && (
        <p className="mt-1 text-red-500 text-xs italic">{error}</p>
      )}
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
  if (!/[\^$*.[\]{}()?"!@#%&/,><':;|_~`]/.test(password)) {
    return 'Password must include at least one special character.';
  }
  return '';
}

function validateEmail(email: string): string {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email) ? '' : 'Please enter a valid email address.';
}

export default FloatingLabelInput;