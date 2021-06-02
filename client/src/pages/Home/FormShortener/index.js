import React from 'react'
import styles from './styles.module.css'
import { ReactComponent as Enviar } from '../../../assets/compress.svg';
import {ReactComponent as People} from '../../../assets/people.svg'

const FormShortener = () => {

    function handleSubmit(event) 
    {
        event.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <People className={styles.people} /> 
            <input type="text" />
            <button><Enviar className={styles.svg} /> </button>
        </form>
    )
}

export default FormShortener