import React from 'react'
import logo from '../../assets/logo1.png'
import {Link} from 'react-router-dom'
import styles from './style.module.css'


const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={`${styles.nav} container`} >
                <Link className={styles.logo} to="/">
                    <img src={logo} alt='logo'/>
                </Link>
            </nav>
        </header>
    )
}

export default Header
