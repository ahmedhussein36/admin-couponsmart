import React, { ReactNode } from 'react'


export const TableRow = ({ children }: { children: ReactNode }) => {
  return (
    <tr className=" p-2">
      {children}
    </tr>
  )

}

export const TableCell = ({ children }: { children: ReactNode }) => {
  return (
    <td className=" border-b-2 py-3 border-gray-200 dark:border-gray-500">
      {children}
    </td>
  )
}


export const TableHead = ({ children }: { children: ReactNode }) => {
  return (
    <thead className='w-full bg-slate-200 
    dark:bg-gray-700/50 text-sm text-neutral-500 dark:text-neutral-300'>
      {children}
    </thead>
  )
}

export const TableBody = ({ children }: { children: ReactNode }) => {
  return (
    <tbody className="table-body w-full py-2 bg-white dark:bg-transparent text-sm text-neutral-600 dark:text-neutral-300">
      {children}
    </tbody>
  )
}