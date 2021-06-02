import React from 'react'


const Redirect = () => {

    React.useEffect( () => {
        const code = window.location.pathname.replace('/', '')
        console.log(code)
        window.location.href = 'http://www.google.com';
    }, [])

    return (
        <>

        </>
    )
}

export default Redirect
