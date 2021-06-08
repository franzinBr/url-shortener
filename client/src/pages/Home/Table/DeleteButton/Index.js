import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUrl } from '../../../../store/slices/table';
import styles from './styles.module.css'

const DeleteButton = ({code}) => {
    const [showConfirm, setShowConfirm] = React.useState(false);
    const {table, auth} = useSelector(state => state);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setShowConfirm(false)
    }, [table.currentPage, table.data])

    function deleteUrl()
    {
        dispatch(removeUrl(code, auth.data.authToken))
    }
    return (
        <div className={styles.btn}>
            {showConfirm && <div className={`${styles.confirm} animeLeft`}>
                <button className={styles.btnConfirm} onClick={deleteUrl}>Confirm</button>
                <button className={styles.btnCancel} onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>}
            {!showConfirm && <div onClick={() => setShowConfirm(true)} className={`${styles.delete} animeRight`}>Delete</div>}
        </div>
    )
}

export default DeleteButton
