"use client"
import React, { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import UseMenu from './UseMenu'
import { useList } from '@/app/utils/useUserMenu'

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const list = useList()

  return (
    <div className=' relative'
      onClick={() => { setIsOpen(isOpen === true ? false : true); console.log("clicked") }}
    >
      <div className={`${isOpen ? "bg-neutral-600 rounded-full text-lime-500" : ""} `}>
        <FiUser size={20} />
      </div>


      {isOpen && <UseMenu listItems={list} />}
    </div>
  )
}

export default UserProfile