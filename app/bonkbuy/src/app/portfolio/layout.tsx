import Header from '@/components/header'

export default function MyOrdersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
      <Header />
      {children}
    </div>
  )
}

