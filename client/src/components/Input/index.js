import React from 'react'
import styles from './styles.module.css'

const Input = ({type, name, label, value, onChange, error, onBlur}) => {
    return (
        <div className={styles.wrapper}>
            <label className={styles.label} htmlFor={name}>
                <input 
                className={styles.input}
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required
                />
                <span className={styles.placeholder}>{label}</span>
            </label>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Input
