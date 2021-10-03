import React from 'react'
import './Overlay.scss'
import { connect } from 'react-redux'

function Overlay({ showOverlay }) {
    return (
        <div className={`overlay ${showOverlay && 'active'}`}></div>
    )
}

const mapStateToProps = state => {
    return {
        showOverlay: state.ui.showOverlay
    }
}

export default connect(mapStateToProps, null)(Overlay)
