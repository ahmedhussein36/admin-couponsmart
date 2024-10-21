"use client"

import React, { ReactElement, useState } from 'react'

interface MenuProps {
  children?: React.ReactNode
  menuList: {
    id: number
    label: string
  }[]

}

interface ItemProps {
  label?: string
  onclick: () => void
}

export const Menu = (
  { children }
    : {
      children?: ReactElement,
    }
) => {
  return (
    <div className={`
                        absolute ltr:right-0 top-6 rtl:left-0
                        bg-white dark:bg-neutral-800 w-48
                        flex justify-center
                        items-center  z-50
                        p-2 rounded-md 
                        shadow-md 
                        transition-all duration-200 ease-in-out
                    `}
    >
      {children}
    </div>
  )
}

export const ListItem = ({ label, onclick }: ItemProps) => {
  return (
    <button
      className=" 
            flex justify-start rounded-md
            items-center text-sm 
            text-neutral-500 
            px-4 py-2 w-full dark:text-neutral-300
            hover:bg-slate-100 hover:text-neutral-700 dark:hover:bg-neutral-600
            disabled:text-neutral-300
            transition-all duration-200 ease-in-out
            "
      onClick={onclick}
    >
      {label}
    </button>)
}

// const DropDownMenu = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [menuList, setMenuList] = useState([
//     { id: 1, label: 'Item 1', onclick: () => console.log('Item 1 clicked') },
//     { id: 2, label: 'Item 1', onclick: () => console.log('Item 2 clicked') },
//     { id: 3, label: 'Item 1', onclick: () => console.log('Item 3 clicked') },
//     { id: 4, label: 'Item 1', onclick: () => console.log('Item 4 clicked') },
//     { id: 5, label: 'Item 1', onclick: () => console.log('Item 5 clicked') },
//   ])
//   return (
//     <div className='flex flex-col justify-start items-start gap-2 relative w-full'>
//       <button onClick={() => setIsOpen(isOpen === true ? false : true)} >Click me</button>
//       {isOpen &&
//         <Menu>
//           <div className='w-full flex flex-col justify-start items-start gap-1'>
//             {
//               menuList.map((item) => (
//                 <ListItem
//                   key={item.id}
//                   label={item.label}
//                   onclick={() => item.onclick()} />
//               ))
//             }
//           </div>
//         </Menu>
//       }
//     </div>
//   )
// }

// export default DropDownMenu