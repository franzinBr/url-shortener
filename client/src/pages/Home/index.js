import React from 'react'
import { useSelector } from 'react-redux'
import FormShortener from './FormShortener'
import styles from './style.module.css'
import Table from './Table'

const Home = () => {
    const {auth} = useSelector((state) => state)

    return (
        <section className={styles.home}>
            <div className={styles.shortenerForm}>
                <FormShortener />
             
            </div>
            <div className={styles.urls}>
               {auth.data?.authToken && <Table /> }
            </div>
        </section>
    )
}

export default Home

