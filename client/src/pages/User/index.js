import React from 'react'
import { Route, Routes, useLocation } from 'react-router'
import styles from './styles.module.css'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ForgotForm from './ForgotForm'

const User = () => {
    const [title, setTitle] = React.useState('');
    const location = useLocation();

    React.useEffect( () => {
        const {pathname} = location;
        const path = {
            '/user/register' : 'Register',
            '/user/forgot' : 'Forgot Password?'
        }
        console.log(pathname)
        setTitle(path[pathname] ?  path[pathname]  : 'Login')

    }, [location])

    return (
        <section className={styles.user}>
            <div className={styles.forms}>
                <h1 className={styles.title}>{title}</h1>
                <Routes>
                    <Route path="/" element={<LoginForm />}/>
                    <Route path="register" element={<RegisterForm/>} />
                    <Route path="forgot" element={<ForgotForm/>} />
                </Routes>
            </div>
        </section>
    )
}

export default User
