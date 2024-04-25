import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex h-[105px] w-full flex-row items-center justify-start bg-primary">
      <div className="mx-auto w-full max-w-screen-lg px-8 text-2xl font-bold text-background">
        <Link href="/">TO DO LIST APP</Link>
      </div>
    </header>
  )
}
