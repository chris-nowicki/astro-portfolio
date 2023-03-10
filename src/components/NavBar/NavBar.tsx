import { useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

// icons
import { ArrowIcon } from '../icons'

export default function NavBar() {
    const [showMenu, setShowMenu] = useState<boolean>(false)

    const handleMenu = () => {
        const btn: HTMLElement = document.getElementById('menu-btn')
        btn.classList.toggle('open')
        setShowMenu(showMenu === false ? true : false)
    }

    const pathname = window.location.pathname

    const navItems = {
        '/': {
            name: 'home',
            x: 0,
            w: '67.5px',
        },
        '/projects': {
            name: 'projects',
            x: 67.6,
            w: '89px',
        },
        '/contact': {
            name: 'contact',
            x: 156.5,
            w: '84.5px',
        },
        '/resume': {
            name: 'resume',
            x: 654,
            w: '114px',
        },
    }

    return (
        <nav id="home" className="mx-auto mb-6 flex max-w-3xl">
            <div className="relative flex w-full items-center justify-between px-5 pt-4 pb-4 sm:shadow md:px-0 md:shadow-none">
                {/* motion settings for active links*/}
                {navItems[pathname] && (
                    <div className="hidden md:block">
                        <motion.div
                            className="absolute top-4 z-[-1] h-[38px] rounded-lg border border-borderColor-light bg-neutral-100 px-2 py-1 dark:border-neutral-900/50 dark:bg-neutral-900/20"
                            layoutId="test"
                            initial={{ opacity: 0, x: navItems[pathname].x }}
                            animate={{
                                opacity: 1,
                                x: navItems[pathname].x,
                                width: navItems[pathname].w,
                            }}
                            transition={{
                                type: 'spring',
                                stiffness: 350,
                                damping: 30,
                            }}
                        />
                    </div>
                )}

                {/* regular nav menu */}
                <div className="absolute sm:hidden md:flex">
                    {Object.entries(navItems).map(([path, { name }]) => {
                        const isActive = path === pathname
                        return (
                            path != '/resume' && (
                                <a
                                    key={path}
                                    href={path}
                                    rel="prefetch"
                                    className={clsx(
                                        'rounded-lg border border-transparent px-2 py-1 text-xl dark:text-textDark',
                                        {
                                            'hover:text-purple-light dark:hover:text-purple-dark':
                                                !isActive,
                                            'text-purple-light dark:text-purple-dark':
                                                isActive,
                                        }
                                    )}
                                >
                                    {name}
                                </a>
                            )
                        )
                    })}
                </div>

                {/* hamburger menu for mobile */}
                <button
                    className="hamburger block shadow-2xl focus:outline-none md:hidden"
                    id="menu-btn"
                    onClick={() => handleMenu()}
                >
                    <span className="hamburger-top bg-black dark:bg-foreground"></span>
                    <span className="hamburger-middle bg-black dark:bg-foreground"></span>
                    <span className="hamburger-bottom bg-black dark:bg-foreground"></span>
                </button>

                {/* mobile nav menu when hamburger button is selected */}
                {showMenu && (
                    <div>
                        <div
                            id="menu"
                            className="absolute left-6 right-6 z-10 -ml-6 mt-9 flex flex-col items-center justify-center space-y-2 self-end bg-background-light py-4 text-foreground opacity-95 drop-shadow-md dark:bg-background-dark sm:w-full sm:self-center"
                        >
                            {Object.entries(navItems).map(
                                ([path, { name }]) => {
                                    return (
                                        path != '/resume' && (
                                            <a
                                                key={path}
                                                href={path}
                                                className="text-2xl text-foreground hover:text-purple-dark"
                                                onClick={() => handleMenu()}
                                                rel="prefetch"
                                            >
                                                {name}
                                            </a>
                                        )
                                    )
                                }
                            )}
                        </div>
                    </div>
                )}

                {/* link to resume page */}
                <a
                    href="/resume"
                    rel="prefetch"
                    className={`flex items-center justify-between gap-2 rounded-lg border border-neutral-200 px-2 py-1 text-lg  dark:border-neutral-900/50 dark:text-foreground   md:gap-6
                                ${
                                    pathname === '/resume'
                                        ? ' text-purple-light dark:text-purple-dark'
                                        : 'hover:bg-neutral-100 hover:dark:bg-neutral-900/20'
                                }
                                `}
                >
                    resum??
                    <ArrowIcon size={12} />
                </a>
            </div>
        </nav>
    )
}
