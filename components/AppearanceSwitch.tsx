'use client'

import { useDark } from '@/hooks/useDark'

const ApperanceSwitch = () => {
  const [, toggleDark] = useDark()

  return <button onClick={toggleDark}>切换主题</button>
}

export default ApperanceSwitch
