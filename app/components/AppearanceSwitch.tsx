'use client'

import { useState, useEffect } from 'react'

import { useDark } from '@/app/hooks/useDark'
import Icon from '@/app/icons/Icon'

const ApperanceSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const [isDark, toggleDark] = useDark()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Icon className={'i-carbon-sun'} />
  }

  return (
    <button onClick={toggleDark}>
      <Icon className={isDark ? 'i-carbon-moon' : 'i-carbon-sun'} />
    </button>
  )
}

export default ApperanceSwitch
