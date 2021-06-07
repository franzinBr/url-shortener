import React from 'react'
import { useNavigate } from 'react-router'
import { URL_GET } from './endpoints'


const Redirect = () => {
    const navigate = useNavigate();

    React.useEffect( () => {
        
        async function getCode()
        {
            const code = window.location.pathname.replace('/', '')
            try {
                const res = await URL_GET(code)
                if(res.success === false) throw new Error(res.error)
                let url = res.data.completeUrl;
                if (!url.match(/^http?:\/\//i) || !url.match(/^https?:\/\//i)) url = `http://${url}`;
                window.location.href = url;
                
            } catch (error) {
                navigate('/')
            }
        }
        getCode();

        
    }, [navigate])

    return (
        <>

        </>
    )
}

export default Redirect
