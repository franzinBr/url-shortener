import React from 'react'
import { useParams } from 'react-router'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import useForm from '../../../hooks/useForm'
import { RESETPASSWORD_PUT } from '../../../services/endpoints'
import styles from './styles.module.css'

const ResetForm = () => {
    const {token} = useParams();
    
    const password = useForm('password')
    const confirmPassword = useForm('password')
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState(null)

    async function resetPassword(event)
    {
        event.preventDefault();
        if(password.validate() && confirmPassword.validate() && password.value === confirmPassword.value)
        {
            setLoading(true)
            const res = await RESETPASSWORD_PUT(token, {password: password.value})
            setLoading(false)
            if(res?.data?.success) setMessage(res.data.message)
            if(res?.success === false) setMessage(res.error)
            password.setValue('')
            confirmPassword.setValue('')
        }
    }


    return (
        <form onSubmit={resetPassword}>
            <Input label="New Password" name="password" type="password"  {...password}/>
            <Input label="Confirm New Password" name="ConfirmPassword" type="password"  {...confirmPassword}/>
            {!loading ? <Button>Reset Password</Button> : <Button disabled>Reset Password...</Button>}
            {message && <p className={styles.message}>{message}</p>}
        </form>
    )
}

export default ResetForm
