import React from 'react'
import FormShortener from './FormShortener'
import styles from './style.module.css'

const Home = () => {
    return (
        <section className={styles.home}>
            <div className={styles.shortenerForm}>
                <FormShortener />
            </div>
        </section>
    )
}

export default Home

