import React from 'react'
import NavLinks from '../ui/navLinks'

const BottomBar = () => {
  return (
    <div className="fixed bg-primary-light z-10 dark:bg-primary-dark lg:hidden bottom-0 w-full p-3">
      <NavLinks/>
    </div>
  )
}

export default BottomBar