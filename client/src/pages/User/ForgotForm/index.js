import React from 'react'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import useForm from '../../../hooks/useForm'
import { FORGOTPASSWORD_POST } from '../../../services/endpoints'
import styles from './styles.module.css'

const ForgotForm = () => {

    const email = useForm('email');
    const [showMessage, setShowMessage] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    async function sendEmailPassword(event)
    {
        event.preventDefault();
        if(email.validate())
        {
            setLoading(true)
            await FORGOTPASSWORD_POST({email: email.value})
            setLoading(false)
            email.setValue('')
            setShowMessage(true)
        }
    }

    return (
        <form onSubmit={sendEmailPassword}>
            <Input type="email" label="email" name="email" {...email} />
            {!loading ? <Button>Send Email</Button> : <Button disabled>Send Email...</Button>}
            {showMessage && <p className={styles.message}>If this email is registered on our servers, you will receive an email within the next few minutes with instructions to reset the password</p>}
        </form>
    )
}

export default ForgotForm
