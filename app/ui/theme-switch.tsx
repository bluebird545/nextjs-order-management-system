import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { useEffect, useState } from "react"

export function ThemeSwitch() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(theme)
  }, [theme])

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button className='rounded-md p-2 hover:bg-slate-200 hover:bg-opacity-30 ' onClick={handleThemeChange}>
      {
        theme === 'light'
        ? <MoonIcon className='w-5' />
        : <SunIcon className='w-5' />
      }
    </button>
  )
}