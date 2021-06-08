import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import {ReactComponent as Login} from '../../assets/login.svg'
import {ReactComponent as Register} from '../../assets/register.svg'
import {ReactComponent as Logout} from '../../assets/logout.svg'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/auth'


const NavPerfil = () => {

    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    return (
        <section className={styles.subHeader}>
            <nav className={styles.options}>
                {!auth.data?.authToken && <> <Link to="/user"><Login />Login</Link>
                <Link to="/user/register"><Register />Register</Link> </>}
                {auth.data?.authToken && <button onClick={() => dispatch(logout())}><Logout/>Logout</button>}
            </nav>
        </section>
    )
}

export default NavPerfil
