import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.css'
import {ReactComponent as Login} from '../../assets/login.svg'
import {ReactComponent as Register} from '../../assets/register.svg'
import {ReactComponent as Logout} from '../../assets/logout.svg'
import {ReactComponent as User} from '../../assets/user.svg'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/slices/auth'


const NavPerfil = () => {

    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    return (
        <section className={styles.subHeader}>
            <nav className={styles.userMenu}>
                <ul className={styles.menuList}>
                    <li className={styles.dropdown}>
                        <span className={styles.spanName}><User /><p>Account</p></span>
                        <ul className={styles.dropdownMenu}>
                            {!auth.logged && <><li><Link to="/user"><Login />Login</Link></li>
                            <li><Link to="/user/register"><Register />Register</Link></li></>}
                            {auth.logged && <li><button onClick={() => dispatch(logout())}><Logout/>Logout</button></li>}
                        </ul>
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export default NavPerfil
