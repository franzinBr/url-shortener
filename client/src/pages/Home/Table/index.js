import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUrls, selectItemsPage } from '../../../store/slices/table'
import DeleteButton from './DeleteButton/Index'
import Pagination from './Pagination'
import styles from './styles.module.css'


const Table = () => {
    const {table, auth} = useSelector((state) => state)
    const dispatch = useDispatch()
    const urls = useSelector(selectItemsPage)

    React.useEffect(() => {
       dispatch(fetchUrls(auth.data.authToken))
       
    }, [auth.data.authToken, dispatch])
    
    if(urls.length === 0) return null

    return (
        <div className={styles.tableContainer}>
            <table className={`${styles.table} animeLeft-6`}>
                <thead>
                    <tr>
                        <th>Shortener</th>
                        <th>Complete</th>
                        <th>Clicks</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody >
                    {urls && urls.map((item, row) => (
                        <tr key={row} >
                            {Object.entries(item).reverse().map((url, column) => (
                                <td key={column} data-heading={url[0]}>
                                    {url[1]}
                                </td>
                                )) }
                            <td data-heading="delete"> <DeleteButton code={item.code} /> </td>
                        </tr>
                        ))}
                </tbody>
            </table>
            <Pagination />
        </div>
    )
}

export default Table
