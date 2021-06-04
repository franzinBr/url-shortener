import React from 'react'
import styles from './styles.module.css'

const DeleteButton = () => {
    const {showConfirm, setShowConfirm} = React.useState(false)


    return (
        <div className={styles.btn}>
            {showConfirm && <div className={styles.confirm}>
                <button>Yes</button>
                <button>Cancel</button>
            </div>}
            <div className={styles.delete}>Delete</div>
        </div>
    )
}

export default DeleteButton
