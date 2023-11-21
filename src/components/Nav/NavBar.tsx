import { useState } from 'react'
import clsx from 'clsx'
import { navItems } from '../../lib/data'
import { motion } from 'framer-motion'

export const prefetch = true

export default function NavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [activeSection, setActiveSection] = useState('Home')

  // toggle hamburger mobile menu
  const handleMenu = () => {
    const btn: HTMLElement = document.getElementById('menu-btn')!
    btn.classList.toggle('open')
    setShowMobileMenu(showMobileMenu === false ? true : false)
  }

  return (
    <nav className="w-full max-w-3xl">
      <div className="relative flex w-full items-center justify-between bg-gray-50 dark:bg-background-light md:bg-transparent md:px-0 md:pb-4 md:shadow-none md:dark:bg-transparent">
        {/* nav bar menu */}
        <ul
          className={clsx(
            'hidden w-full bg-gray-50 bg-opacity-40 pt-10 backdrop-blur-xl dark:bg-foreground dark:bg-opacity-100 sm:hidden md:flex md:items-center md:justify-between'
          )}
        >
          <div className="flex items-center gap-4">
            {navItems.map(({ name, hash }) => (
              <motion.li key={hash} initial={{ opacity: 1 }}>
                <a
                  href={hash}
                  className={clsx(
                    'dark:text-textDark relative rounded-lg border border-transparent text-xl hover:text-black',
                    activeSection === name ? 'text-black' : 'text-gray-600'
                  )}
                  onClick={() => setActiveSection(name)}
                >
                  {name}

                  {activeSection === name && (
                    <motion.span
                      className="absolute -bottom-[2px] left-0 -z-10 w-full rounded border-b-4 border-b-purple-light/75"
                      layoutId="activeSection"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              </motion.li>
            ))}
          </div>
          {/* dark/light theme toggle button */}
          {/* <ModeToggle /> */}
        </ul>

        {/* hamburger menu for mobile */}
        <button
          className="hamburger relative shadow-2xl focus:outline-none md:hidden"
          id="menu-btn"
          onClick={() => handleMenu()}
        >
          <span className="hamburger-top bg-black dark:bg-foreground"></span>
          <span className="hamburger-middle bg-black dark:bg-foreground"></span>
          <span className="hamburger-bottom bg-black dark:bg-foreground"></span>
        </button>

        {/* mobile navigation menu when hamburger button is selected */}
        {showMobileMenu && (
          <div>
            <div
              id="menu"
              className="absolute left-0 right-0 z-10 -ml-6 mt-7 flex h-screen flex-col items-center justify-center  space-y-2 self-end bg-background-light text-foreground opacity-95 drop-shadow-md dark:bg-background-dark sm:w-full sm:self-center"
            >
              {navItems.map(({ name, hash }) => (
                <a
                  href={hash}
                  className="py-4 text-6xl text-foreground hover:text-purple-dark"
                  onClick={() => handleMenu()}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
