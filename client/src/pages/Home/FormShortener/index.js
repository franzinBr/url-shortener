import React from 'react'
import styles from './styles.module.css'
import { ReactComponent as Enviar } from '../../../assets/compress.svg';
import {ReactComponent as People} from '../../../assets/people.svg'
import useForm from '../../../hooks/useForm'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { createUrl } from '../../../store/slices/table';

const FormShortener = () => {
    const navigate = useNavigate();
    const {auth} = useSelector((state) => state)
    const dispatch = useDispatch()
    const [submit, setSubmit] = React.useState(false)

    const urlInput = useForm('url')

    async function handleSubmit(event) 
    {
        
        event.preventDefault()
        if(auth.logged === false)
            return navigate('/user')

        setSubmit(true)
        if(urlInput.validate()) 
        {
            await dispatch(createUrl(urlInput.value, auth.data.authToken))
            urlInput.setValue('')
            setSubmit(false)
        }
        
    }

    return (
        <>
        <form onSubmit={handleSubmit} className={styles.form}>
            <People className={styles.people} />  
            <input className={styles.url} type="text" name="urlInput"
                value={urlInput.value}
                onChange={submit ? urlInput.onChange : ({target}) => urlInput.setValue(target.value)}
                onBlur={submit ? urlInput.onBlur : null}
             />
            <button className={styles.shortener}><Enviar className={styles.svg} /> </button>
        </form>
        <div className={styles.errors}>
            <p>{urlInput.error}</p>
        </div>
        </>
    )
}

export default FormShortener
