import React from 'react'
import styles from './styles.module.css'
import {ReactComponent as Copy} from '../../../../assets/copy.svg'
import {ReactComponent as Success} from '../../../../assets/success.svg'

const CopyButton = ({code}) => {

    const [component, setComponent] = React.useState(<Copy/>)

    function copyUrl()
    {
        
        navigator.clipboard.writeText(`${window.location.href}${code}`)
        setComponent(<Success />)
        setTimeout(() => {
            setComponent(<Copy />)
        }, 500);        
    }

    return (
        <div className={styles.btnDiv}>
            <button onClick={copyUrl} className={styles.buttonCopy}>{component}</button>
        </div>
    )
}

export default CopyButton
