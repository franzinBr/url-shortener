import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import styles from './styles.module.css'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ForgotForm from './ForgotForm'
import { useSelector } from 'react-redux'


const User = () => {
    const [title, setTitle] = React.useState('');
    const location = useLocation();
    const isLogged = useSelector((state) => state.auth.logged);

    React.useEffect( () => {
        const {pathname} = location;
        const path = {
            '/user/register' : 'Register',
            '/user/forgot' : 'Forgot Password?'
        }
        setTitle(path[pathname] ?  path[pathname]  : 'Login')

    }, [location])

    if(isLogged) return <Navigate to="/" />
    if(!isLogged) return (
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
    return null
}

export default User
