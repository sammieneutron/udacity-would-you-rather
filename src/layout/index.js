import React from 'react'
// import '../../assets/css/media-queries.css';

import Navigation from './Navigation'

const DefaultLayout = ( {children} ) => {
    return (
        <div>
            <Navigation/>
            <div>{children}</div>
        </div>
    )
}

export default DefaultLayout