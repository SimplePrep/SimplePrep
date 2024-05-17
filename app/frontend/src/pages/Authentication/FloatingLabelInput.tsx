import React, {useState, FocusEvent} from 'react';

interface InputProps {
    id: string;
    label: string;
    type: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    validate?: boolean;
}

const FloatingLabelInput: React.FC<InputProps> = ({id, label, type, value, setValue, validate=true}) => {

    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState('');

    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        if (!e.target.value) {
          setIsFocused(false);
        }
        let error = '';
        if (validate) {
            error = type === 'password' ? validatePassword(e.target.value) : type === 'email' ? validateEmail(e.target.value) : '';
          }
        setError(error);
      };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        const error = type === 'password' ? validatePassword(e.target.value) : type === 'email' ? validateEmail(e.target.value) : '';
        setError(error);
      };

    return (
        <div className='relative'>
            <input 
                id={id} 
                type={type} 
                placeholder=' '
                className='w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={value}
                onChange={e=> setValue(e.target.value)}
                onFocus={handleFocus}
                onBlur = {handleBlur}
                required
            />
            <label
                htmlFor={id}
                className={`absolute text-md duration-150 disabled:cursor-not-allowed transform -translate-y-3 top-5 z-5 origin-[0] left-4 peer-placeholder-shown:scale-200 peer-placeholder-shown:translate-y-0 ${
                isFocused || value ? 'scale-75 -translate-y-4' : 'scale-200 translate-y-0'
                }`}
            >
                {label}*
            </label>
            {error && <p className='text-red-500 text-xs italic'>{error}</p>}
        </div>
    )
}


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
  
  // Helper function to validate email format
  function validateEmail(email: string): string {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email) ? '' : 'Please enter a valid email address.';
  }
export default FloatingLabelInput;
