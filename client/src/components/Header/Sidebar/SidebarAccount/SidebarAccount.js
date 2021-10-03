import React from 'react'
import './SidebarAccount.scss'
import { Button } from 'antd'
import CustomButton from '../../../CustomButton/CustomButton'

function SidebarAccount() {
    return (
        <div className='sidebar__account'>
            <div className="heading">My Account</div>
            <CustomButton 
                block={true}
                height='45px'
                fontSize='16px'
                backgroundColor='black'
                color='white'
            >
                Log in
            </CustomButton>
            <CustomButton 
                block={true}
                height='45px'
                fontSize='16px'
                borderColor='#000'
                style={{marginTop: '8px'}}
            >
                Register
            </CustomButton>
        </div>
    )
}

export default SidebarAccount
