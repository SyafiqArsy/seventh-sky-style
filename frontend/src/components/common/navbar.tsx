import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">

        <Link href="/">
          Seventh Style AI
        </Link>

        <nav className="flex gap-6">
          <Link href="/style-on">
            Style On
          </Link>

          <Link href="/recommendation">
            History
          </Link>

          <Link href="/login">
            Login
          </Link>
        </nav>

      </div>
    </header>
  );
}