import React from 'react'
import './Menu.scss'
import { BiChevronDown } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { connect } from 'react-redux'
import * as actionTypes from '../../../store/actions/actionTypes'

function Menu({ onOpenSidebar, onOpenOverlay }) {
    const openSidebarHandler = () => {
        onOpenSidebar()
        onOpenOverlay()
    }
    return (
        <div className="menu">
            <div className="menu__item">
                <span>Home</span>
            </div>
            <div className="menu__item">
                <span>Brands</span>
                <BiChevronDown />
            </div>
            <div className="menu__item">
                <span>Ladies</span>
                <BiChevronDown />
            </div>
            <div className="menu__item">
                <span>Mens</span>
                <BiChevronDown />
            </div>
            <div className="hamburger" onClick={openSidebarHandler}><GiHamburgerMenu /></div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onOpenSidebar: () => dispatch({ type: actionTypes.OPEN_SIDEBAR }),
        onOpenOverlay: () => dispatch({ type: actionTypes.OPEN_OVERLAY })
    }
}

export default connect(null, mapDispatchToProps)(Menu)
