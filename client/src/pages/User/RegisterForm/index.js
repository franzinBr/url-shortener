import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import ChangeForm from '../ChangeForm'

const LoginForm = () => {
    return (
        <div>
            <Input type="text" label="Full Name" name="fullname"/>
            <Input type="text" label="Email" name="email"/>
            <Input type="password" label="Password" name="password"/>
            <Button>Register</Button>
            <ChangeForm 
                title="Login" 
                to="/user"
                message="Have an account?"
                button="Login"
            />
            
        </div>
    )
}

export default LoginForm
