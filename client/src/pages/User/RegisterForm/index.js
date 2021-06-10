import React from 'react'
import Input from '../../../components/Input'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../components/Button'
import ChangeForm from '../ChangeForm'
import { register } from '../../../store/slices/auth'
import useForm from '../../../hooks/useForm'
import styles from './styles.module.css'

const RegisterForm = () => {

    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const fullname = useForm()
    const email = useForm('email')
    const password = useForm('password')
    const confirmPassword = useForm('password')
    
    function handleSubmit(event) 
    {
        event.preventDefault()
        if(fullname.validate() && email.validate() && password.validate() && confirmPassword.validate() && password.value === confirmPassword.value) 
            dispatch(register({fullname: fullname.value, email: email.value, password: password.value}))
    }
    
    if(auth?.logged === true) return null
    if(auth.data?.success === true ) return (
        <div className={styles.confirm}>
            <p className={styles.confirmText}>We send an email to <span>{email.value}</span> to validate your account</p>
        </div>
    ) 
    return (
        <form onSubmit={handleSubmit}>
            <Input type="text" label="Full Name" name="fullname" {...fullname} />
            <Input type="text" label="Email" name="email" {...email}/>
            <Input type="password" label="Password" name="password" {...password} />
            <Input type="password" label="Confirm Password" name="cpassword" {...confirmPassword} />
            {auth.loading ? <Button disabled>Register</Button> : <Button>Register</Button> }
            {auth.error && <p className="error">{auth.error}</p>}
            <ChangeForm 
                title="Login" 
                to="/user"
                message="Have an account?"
                button="Login"
            />
            
        </form>
    )
}

export default RegisterForm
