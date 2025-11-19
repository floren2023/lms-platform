"use client"
import Link from 'next/link'

import Image from 'next/image'
import ThemeToggle from '@/components/ThemeToggle'
import { authClient } from '@/lib/auth-client'
import { buttonVariants } from '@/components/ui/button'
import UserMenu from './UserMenu'

const navigationItems=[
  {name:"Home",href:"/"},
  {name:"Courses", href:"/courses"},
  {name:"Dashboard",href:"/dashboard"}
]

const Navbar = () => {
const {data:session,isPending}=authClient.useSession()
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-bakground/95 backdrop-blur-[background-filter]:bg-background/60'>
      <div className='flex container min-h-16 items-center mx-auto px-4 md:px-5 lg:px-8 justify-start '>
      
        <Link href="/" className="flex justify-start space-x-2 ml-4 items-center"> 
         <Image src="/logo.svg" alt="logo" width={32}  height={32}  className='text-violet-800'/>
            <div className="font-bold text-violet-800">Daniel Gherasim </div>
        </Link>
       {/* <DESKTOP NAVIGATION */}
       <nav className='ml-10 sm:hidden md:flex md:flex-1 md:items-center md:justify-between '>
        <div className='flex gap-4 justify-start'>
          {
            navigationItems.map((item)=>(
              <Link href={item.href} key={item.name} className='text-sm font-medium transition-colors hover:text-primary'>{item.name}</Link>
            ))
          }
        </div>
       </nav>
       <div className='flex items-center gap-4'><ThemeToggle/>
       {isPending?null:session?(
       <UserMenu email={session.user.email} name={session.user.name} image={session.user.image!}/>
       ):(
        <>
        <Link href="/login" className={buttonVariants({variant:"secondary"})}>
        Login</Link>
        </>
       )}
       <Link href="/login" className={buttonVariants()}>
        Get Started</Link>
       </div>
      
      </div>

    </header>
  )
}

export default Navbar


