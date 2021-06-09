import React from 'react'
import {useParams} from 'react-router-dom'
import {VALIDATE_PUT} from '../../../services/endpoints'
import styles from './styles.module.css'

const VerifyEmail = () => {
    const {token} = useParams();
    const [result, setResult] = React.useState(null)
    


    React.useEffect(() => {
        async function validyEmailFetch()
        {
            try {
                const res = await VALIDATE_PUT(token)
                console.log(res)
                setResult(res.success)
                
            } catch (error) {
                
            }
           
        }
        validyEmailFetch();
    }, [token])

    return (
        <div className={styles.validation}>
            {!result && <p><span className={styles.invalid}>Invalid</span> Token</p>}
            {result && <p>Email <span className={styles.verified}>Verified</span></p>}
        </div>
    )
}

export default VerifyEmail
