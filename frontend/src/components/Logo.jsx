import React from 'react'

function Logo({ width = '100px', className = '' }) {
  return (
    <div className={className} style={{ width }}>
        <img src="/icon.svg" alt="Logo" />
    </div>
  )
}

export default Logo;