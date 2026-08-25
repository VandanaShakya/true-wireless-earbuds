const LINKS = [
  { label: 'Sound', href: '#sound' },
  { label: 'Silence', href: '#silence' },
  { label: 'Power', href: '#power' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

const MenuOverlay = ({ open, onClose }) => {
  return (
    <div
      className={`fixed inset-0 z-[60] bg-black transition-opacity duration-500 ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!open}
    >
      <nav className="flex h-full flex-col items-center justify-center gap-8">
        {LINKS.map((link, index) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onClose}
            className={`text-4xl font-light tracking-[0.28em] uppercase transition-all duration-500 md:text-6xl ${
              open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
            style={{ transitionDelay: open ? `${index * 80}ms` : '0ms' }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  )
}

export default MenuOverlay
