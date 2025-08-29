import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <><div className="text-white bg-blue-950 h-10 pt-4">
     <p className="text-center"> Copyright &copy; {currentYear} Get Me A Chai-All Rights Are Reserved</p>
    </div>
    </>
  )
}

export default Footer
