
import { Inter } from 'next/font/google'
import './globals.css'
import UserProvider from '@/lib/UserProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <UserProvider>
      <body className={`${inter.className} bg-slate-50`}>
        <div className=' p-8'>
        {children}
        </div>
      </body>
     </UserProvider>
   
    </html>
  )
}
