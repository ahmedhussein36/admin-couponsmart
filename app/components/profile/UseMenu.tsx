import React from 'react'
import { ListItem, Menu } from '../dropDown/Dropdown'

const UseMenu = ({ listItems }: { listItems: any[] }) => {
  return (
      <Menu>
        <div className='w-full flex flex-col justify-start items-start gap-1'>
          {
            listItems.map((item) => (
              <ListItem
                key={item.id}
                label={item.label}
                onclick={() => item.onclick()} />
            ))
          }
        </div>
      </Menu>
  )
}

export default UseMenu