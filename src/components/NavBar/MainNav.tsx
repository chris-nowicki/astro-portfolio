import { navItems } from '../../lib/data'
import { ThemeToggle } from './ThemeToggle'

export default function MainNav() {
  return (
    <div className="hidden w-full sm:hidden md:flex md:items-center md:justify-between md:pt-6">
      <ul className="ml-0 flex list-none items-center gap-5">
        {navItems.map(({ name, href }) => (
          <li key={href}>
            <a
              href={href}
              className="relative text-lg transition-all duration-200 ease-in-out"
            >
              {name.toLocaleLowerCase()}
            </a>
          </li>
        ))}
      </ul>
      <ThemeToggle />
    </div>
  )
}
