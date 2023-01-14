'use client'

import { useDark } from '@/hooks/useDark'
import Icon from '@/icons/Icon'

const ApperanceSwitch = () => {
  const [isDark, toggleDark] = useDark()

  return (
    <button onClick={toggleDark}>
      <Icon name={isDark ? 'CarbonMoon' : 'CarbonSun'} />
    </button>
  )
}

export default ApperanceSwitch
