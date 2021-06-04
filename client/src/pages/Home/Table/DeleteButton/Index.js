import React from 'react'
import styles from './styles.module.css'

const DeleteButton = () => {
    const [showConfirm, setShowConfirm] = React.useState(false)

    function handleClick()
    {
        // delete url here
    }
    return (
        <div className={styles.btn}>
            {showConfirm && <div className={`${styles.confirm} animeLeft`}>
                <button className={styles.btnConfirm} onClick={handleClick}>Confirm</button>
                <button className={styles.btnCancel} onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>}
            {!showConfirm && <div onClick={() => setShowConfirm(true)} className={`${styles.delete} animeRight`}>Delete</div>}
        </div>
    )
}

export default DeleteButton
