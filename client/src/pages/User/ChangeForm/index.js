import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { resetAuthState } from '../../../store/slices/auth'
import styles from './styles.module.css'

const ChangeForm = ({title, to, message, button}) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(resetAuthState())
    }, [dispatch])

    return (
        <div className={styles.change}>
            <h2 className={styles.title}>{title}</h2>
            <p>{message}</p>
            <Link className={styles.link} to={to}>{button}</Link>
        </div>
    )
}

export default ChangeForm
