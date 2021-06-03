import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'

const ChangeForm = ({title, to, message, button}) => {
    return (
        <div className={styles.change}>
            <h2 className={styles.title}>{title}</h2>
            <p>{message}</p>
            <Link className={styles.link} to={to}>{button}</Link>
        </div>
    )
}

export default ChangeForm
