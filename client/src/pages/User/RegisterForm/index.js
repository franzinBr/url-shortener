import React from 'react'
import Input from '../../../components/Input'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../components/Button'
import ChangeForm from '../ChangeForm'
import { register } from '../../../store/slices/auth'
import useForm from '../../../hooks/useForm'

const RegisterForm = () => {

    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const fullname = useForm()
    const email = useForm('email')
    const password = useForm('password')
    
    const [fullname, setFullName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    function handleSubmit(event) 
    {
        event.preventDefault()
        if(fullname.validate() && email.validate() && password.validate()) dispatch(register({fullname, email, password}))
    }
    
    if(auth?.logged === true) return null
    return (
        <form onSubmit={handleSubmit}>
            <Input type="text" label="Full Name" name="fullname" {...fullname} />
            <Input type="text" label="Email" name="email" {...email}/>
            <Input type="password" label="Password" name="password" {...password} />
            <Button>Register</Button>
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
