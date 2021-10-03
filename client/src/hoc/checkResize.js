import React, { useEffect, useState } from 'react'

const checkResize = (WrappedComponent, width) => {
    return ({ ...props }) => {
        const [resizeFlag, setResizeFlag] = useState(false)

        useEffect(() => {
            resizeHandler()
        }, [])

        const resizeHandler = () => {
            if (window.innerWidth <= width) {
                setResizeFlag(true)
            } 
            else if (window.innerWidth > width) {
                setResizeFlag(false)
            }
        }

        window.addEventListener('resize', resizeHandler)

        return (
            <WrappedComponent {...props} resizeFlag={resizeFlag}/>
        )
    }
}

export default checkResize