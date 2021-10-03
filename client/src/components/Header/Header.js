import React from 'react'
import Menu from './Menu/Menu'
import { FaRegUser } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { BiShoppingBag } from 'react-icons/bi';
import './Header.scss';
import { useState } from 'react';
import { connect } from 'react-redux';
import * as actionTyes from '../../store/actionTypes'
import { act } from 'react-dom/test-utils';

function Header({ onOpenCart, onOpenOverlay }) {
    const [showSearchArea, setShowSearchArea] = useState(false);
    const [searchValue, setSearchValue] = useState('')

    const openCartHandler = () => {
        onOpenOverlay()
        onOpenCart()
    }

    return (
        <section className="header">

            <Menu />
            <div className='header__logo'>MiniMix</div>

            <div className="header__icons">
                <div className="icons__item item__account">
                    <span><FaRegUser /></span>
                    <div className='dropdown-account'>
                        <div>Login</div>
                        <div>Register</div>
                    </div>
                </div>
                <div className="icons__item">
                    <span onClick={() => setShowSearchArea(true)}><FiSearch /></span>
                    <section className={`search__area ${showSearchArea && 'search__area--active'}`}>
                        <div className='search__icon'><FiSearch /></div>
                        <input type='text' placeholder='Search our store' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                        <div className="search__close" onClick={() => setShowSearchArea(false)}><IoMdClose /></div>
                    </section>
                </div>
                <div className="icons__item item__cart" onClick={openCartHandler}>
                    <span><BiShoppingBag /></span>
                    <div className="cart__number">3</div>
                </div>
            </div>
        </section>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onOpenCart: () => dispatch({ type: actionTyes.OPEN_CART }),
        onOpenOverlay: () => dispatch({ type: actionTyes.OPEN_OVERLAY })
    }
}

export default connect(null, mapDispatchToProps)(Header)
