
import { Inter } from 'next/font/google'
import './globals.css'
import UserProvider from '@/lib/UserProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'GIFBook',
  description: 'Share your own GIF',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <UserProvider>
      <body className={`${inter.className} bg-slate-50`}>
        <div className=''>
        {children}
        </div>
      </body>
     </UserProvider>
   
    </html>
  )
}
