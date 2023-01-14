'use client'

import { useDark } from '@/hooks/useDark'
import Icon from '@/icons/Icon'

const ApperanceSwitch = () => {
  const [isDark, toggleDark] = useDark()

  return (
    <button onClick={toggleDark}>
      <Icon className={isDark ? 'i-carbon-moon' : 'i-carbon-sun'} />
    </button>
  )
}

export default ApperanceSwitch
