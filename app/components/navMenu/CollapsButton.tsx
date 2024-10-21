"use client"
import React from 'react'
import { PiSidebarBold } from 'react-icons/pi'

const CollapsButton = ({ toggleOpen }: { toggleOpen: () => void }) => {
    return (

        <button onClick={toggleOpen}>
            <PiSidebarBold color="#c2bbe6" size={24} />
        </button>
    )
}

export default CollapsButton