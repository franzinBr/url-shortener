import React from 'react'

const types = {
    email: {
        regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'enter a valid email',
      },
    password: {
        regex: new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'),
        message: 'the password must contain at least 8 characters, with at least one digit, one lowercase letter, one uppercase letter and one special character',
    },
    url: {
        regex: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
        message: "Invalid URL",
    }
    
}

const useForm = (type) => {
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(null);

    const validate = (value) => {
        if(type === false) return true;
        if(value.length === 0)
        {
            setError("this fields is required")
            return false;
        }
        if(types[type] && !types[type].regex.test(value))
        {
            setError(types[type].message);
            return false;
        }
        setError(null);
        return true;

    }

    function onChange({target})
    {
        if(error) validate(target.value);
        setValue(target.value)
    }

    return {
        value,
        setValue,
        onChange,
        error,
        validate: () => validate(value),
        onBlur: () => validate(value),
    }
}

export default useForm
