import React from 'react'
import DeleteButton from './DeleteButton/Index'
import styles from './styles.module.css'

const Table = () => {

    const urls = [
        {
            shortener: 'askld',
            complete: 'www.google.com.br',
            clicks: 4,
        },
        {
            shortener: 'asd23',
            complete: 'www.yotube.com.br/dasdas/asfad/as/d/wqehjkashdjkawyuqihajshdiquweyuiq',
            clicks: 90,
        }
    ]

    

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Shortener</th>
                        <th>Complete</th>
                        <th>Clicks</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {urls && urls.map((item, row) => (
                        <tr key={row}>
                            {Object.entries(item).map((url, column) => (
                                <td key={column} data-heading={url[0]}>
                                    {url[1]}
                                </td>
                                )) }
                                <td data-heading="delete"> <DeleteButton /> </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
