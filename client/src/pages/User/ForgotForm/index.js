import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/Button'
import Input from '../../../components/Input'

const ForgotForm = () => {
    return (
        <div>
            <Input type="email" label="email" name="email" />
            <Button>Send Email</Button>
        </div>
    )
}

export default ForgotForm
