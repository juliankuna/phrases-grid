
import { Link, useLocation } from "react-router"

export default function Header() {
  const location = useLocation()

  return (
    <header className="fixed top-0 w-full bg-white border-b z-50">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-center gap-8">
        <CustomLink to="/" currentPath={location.pathname}>
          Frases
        </CustomLink>
      </nav>
    </header>
  )
}

function CustomLink({
  to,
  children,
  currentPath,
}: {
  to: string
  children: React.ReactNode
  currentPath: string
}) {
  const isActive = currentPath === to
  return (
    <Link
      to={to}
      className={`text-sm font-medium ${
        isActive
          ? "text-blue-600 border-b-2 border-blue-600 pb-1"
          : "text-gray-600 hover:text-blue-600"
      }`}
    >
      {children}
    </Link>
  )
}
