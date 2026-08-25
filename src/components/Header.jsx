const Header = ({ menuOpen, onMenuToggle }) => {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[70] flex items-start justify-between px-6 py-7 md:px-10">
      <a href="#hero" className="pointer-events-auto flex items-center gap-3 text-white">
        <span className="relative text-lg font-semibold tracking-[0.28em] md:text-xl">
          TRU
          <span className="relative inline-block">
            E
            <span className="absolute -top-2.5 left-1/2 flex -translate-x-1/2 items-end gap-[2px]">
              <span className="h-2 w-[1.5px] bg-accent" />
              <span className="h-3 w-[1.5px] bg-accent" />
              <span className="h-2 w-[1.5px] bg-accent" />
            </span>
          </span>
        </span>
        <span className="h-6 w-px bg-white/40" />
        <span className="flex flex-col text-[10px] leading-tight font-light tracking-[0.18em] uppercase">
          <span>wireless</span>
          <span>earbuds</span>
        </span>
      </a>

      <button
        type="button"
        className="pointer-events-auto flex h-10 w-10 items-center justify-center"
        onClick={onMenuToggle}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? (
          <span className="relative block h-5 w-5">
            <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 rotate-45 bg-white" />
            <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 -rotate-45 bg-white" />
          </span>
        ) : (
          <span className="flex items-end gap-[5px]">
            <span className="h-5 w-[2px] bg-accent" />
            <span className="h-5 w-[2px] bg-accent" />
            <span className="h-5 w-[2px] bg-accent" />
          </span>
        )}
      </button>
    </header>
  )
}

export default Header
