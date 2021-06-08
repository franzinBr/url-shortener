import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePage, nextPage, previousPage} from '../../../../store/slices/table'
import styles from './styles.module.css'

const Pagination = () => {

    const dispatch = useDispatch();
    const {numberOfPages, currentPage} = useSelector((state) => state.table)
    const visiblePages = 5

    const pages = React.useMemo(() => Array.from({length: numberOfPages}, (_, i) => i+1), [numberOfPages])

    function buttonChangePage({target}){
        dispatch(changePage(Number(target.id)))
    }
    
    function buttonPrevious()
    {
        if(currentPage > 1)
        dispatch(previousPage())
    }

    function buttonNext()
    {
        if(currentPage < numberOfPages)
        dispatch(nextPage())
    }

    return (
        <div className={styles.pagesContainer}>
            <ul className={styles.pagesNumber}>
            {currentPage > 1 && <li onClick={buttonPrevious}> &#10094; </li>}
                {pages && currentPage < visiblePages  ? pages.filter((page) => page <= visiblePages ).map((page,i) => (
                    <li className={i+1 === currentPage ? `${styles.active}`: null} onClick={buttonChangePage} key={i} id={i+1}>
                        {page}
                    </li>
                ))
                : Array.from({length: visiblePages}, (_, i) => currentPage - (Math.trunc(visiblePages/2)) + i ).filter((page) => page <= pages.length).map((page) => (
                                  
                    <li className={page === currentPage ? `${styles.active}`: null} onClick={buttonChangePage} key={page} id={page}>
                        {page}
                    </li>
                ))
                }

            {currentPage < numberOfPages && <li onClick={buttonNext}> &#10095; </li>}
            </ul>
        </div>
    )
}

export default Pagination
