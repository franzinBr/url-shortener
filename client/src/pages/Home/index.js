import React from 'react'
import FormShortener from './FormShortener'
import styles from './style.module.css'
import Table from './Table'

const Home = () => {

    return (
        <section className={styles.home}>
            <div className={styles.shortenerForm}>
                <FormShortener />
             
            </div>
            <div className={styles.urls}>
                <Table />
            </div>
        </section>
    )
}

export default Home

