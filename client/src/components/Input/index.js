import React from 'react'
import styles from './styles.module.css'
import {ReactComponent as Hide} from '../../assets/hide.svg'
import {ReactComponent as Show} from '../../assets/show.svg'

const Input = ({type, name, label, value, onChange, error, onBlur}) => {

    const [passwordType, setPasswordType] = React.useState('password')

    function swap()
    {
        if(passwordType === 'password') return setPasswordType('text')
        return setPasswordType('password')
    }

    return (
        <div className={`${styles.wrapper} ${type === "password" ? styles.password : ''}`}>
            <label className={styles.label} htmlFor={name}>

                <input 
                className={styles.input}
                id={name}
                name={name}
                type={type !== "password" ? type : passwordType}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required
                />
                <span className={styles.placeholder}>{label}</span>
            </label>
            {type === "password" && <span onClick={swap} className={styles.hide}>{passwordType === "password" ? <Show /> : <Hide />}</span>}
            {error && <p>{error}</p>}
        </div>
    )
}

export default Input
