import React from 'react'
import './SidebarItem.scss'
import { IoIosArrowDown } from 'react-icons/io'
import { useState } from 'react'

function SidebarItem({  content, submenu }) {
    const [showSubmenu, setShowSubmenu] = useState(false)

    return (
        <li className='sidebar-item' onClick={() => setShowSubmenu(!showSubmenu)}>
            <div className="item__content">
                {content}
                {submenu && (
                    <span className="item__arrow">
                        <IoIosArrowDown />
                    </span>
                )}
            </div>
            <ul className={`item__submenu ${showSubmenu && 'active'}`}>
                {submenu && submenu.map((ele, index) => (
                    <li key={index}>{ele}</li>
                ))}
            </ul>
        </li>
    )
}

export default SidebarItem
