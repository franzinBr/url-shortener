import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import ChangeForm from '../ChangeForm'

const LoginForm = () => {
    return (
        <div>
            <Input type="text" label="Email" name="email"/>
            <Input type="password" label="Password" name="password"/>
            <Link to="forgot">Forgot Password?</Link>
            <Button>Login</Button>
            <ChangeForm 
                title="Register" 
                to="/user/register"
                message="New user? register to use the site"
                button="Register"
            />
        </div>
    )
}

export default LoginForm
