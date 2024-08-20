import MainNav from './MainNav'

export default function NavBar() {
  return (
    <nav className="mb-24 flex w-full max-w-3xl justify-center md:mb-12">
      {/* nav bar */}
      <div className="bg-background fixed z-30 flex w-full items-center justify-between py-4 shadow dark:shadow-foreground/20 md:relative md:px-0 md:py-0 md:shadow-none">
        <MainNav />
      </div>
    </nav>
  )
}
