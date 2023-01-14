'use client'

import { useDark } from '@/app/hooks/useDark'
import Icon from '@/app/icons/Icon'

const ApperanceSwitch = () => {
  const [isDark, toggleDark] = useDark()

  return (
    <button onClick={toggleDark}>
      <Icon className={isDark ? 'i-carbon-moon' : 'i-carbon-sun'} />
    </button>
  )
}

export default ApperanceSwitch
