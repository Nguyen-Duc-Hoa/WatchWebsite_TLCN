import React from 'react'
import { Button } from 'antd'

function CustomButton({ 
    type, 
    block, 
    width,
    height, 
    color, 
    fontSize, 
    backgroundColor, 
    borderColor, 
    children, 
    style, 
    onClick }) {
    const styleButton = {
        width: width ? width : null,
        height: height ? height : null,
        color: color ? color : 'null',
        fontSize: fontSize ? fontSize : 'null',
        backgroundColor: backgroundColor ? backgroundColor : null,
        borderColor: borderColor ? borderColor : null,
        ...style
    }
    return (
        <Button onClick={onClick} style={styleButton} type={type} block={block}>{children}</Button>
    )
}

export default CustomButton
