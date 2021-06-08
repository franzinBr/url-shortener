import React from 'react'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'

const DeleteButton = () => {
    const [showConfirm, setShowConfirm] = React.useState(false)

    const {currentPage} = useSelector(state => state.table)

    React.useEffect(() => {
        setShowConfirm(false)
    }, [currentPage])

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
