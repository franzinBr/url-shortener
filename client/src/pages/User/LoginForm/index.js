import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import { login } from '../../../store/slices/auth'
import ChangeForm from '../ChangeForm'
import useForm from '../../../hooks/useForm'

const LoginForm = () => {
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const email = useForm('email');
    const password = useForm()

    async function handleSubmit(event) 
    {
        event.preventDefault();
        if(email.validate() && password.validate())
        {
            await dispatch(login({ email: email.value, password: password.value }))
        } 
    }
    if(auth?.logged === true) return null
    return (
        <form onSubmit={handleSubmit}>
            <Input type="text" label="Email" name="email" {...email} />
            <Input type="password" label="Password" name="password" {...password}/>
            <Link to="forgot">Forgot Password?</Link>
            {auth.loading ? <Button disabled>Login</Button> : <Button>Login</Button> }
            {auth.error && <p className="error">{auth.error}</p>}
            <ChangeForm 
                title="Register" 
                to="/user/register"
                message="New user? register to use the site"
                button="Register"
            />
        </form>

    )
}

export default LoginForm
