"use client"
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Button, buttonVariants } from './ui/button'


function Navbar() {
    const {user}=useUser();
    const isAdmin = user?.primaryEmailAddress?.emailAddress === process.env.ADMIN_EMAIL
    return (
        <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-whtie/75 backdrop-blur-lg transition-all'>
            <MaxWidthWrapper>
                <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                    <Link href="/" className='flex font-semibold'>case<span className='text-green-600'>cobra</span></Link>
                    <div className='flex h-full items-center space-x-4'>
                        {user ? (
                            <>
                                <SignOutButton>
                                    <Button className='cursor-pointer' variant="ghost" size="sm">Sign out</Button>
                                </SignOutButton>
                                {isAdmin && <Link href="/dashboard" className={buttonVariants({
                                    size: 'sm', variant: "ghost"
                                })}>Dashboard ✨</Link>}
                                <Link href="/configure/upload" className={buttonVariants({
                                    size: 'sm', className: "hidden sm:flex items-center gap-1"
                                })}>
                                    Create case
                                    <ArrowRight className='ml-1.5 h-5 w-5'></ArrowRight>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/api/auth/sign-up" className={buttonVariants({
                                    size: 'sm', variant: "ghost"
                                })}>Sign up</Link>
                                <Link href="/api/auth/sign-in" className={buttonVariants({
                                    size: 'sm', variant: "ghost"
                                })}>Login
                                </Link>
                                <div className='h-8 w-px bg-zinc-200 hidden sm:block'>
                                </div>
                                <Link href="/configure/upload" className={buttonVariants({
                                    size: 'sm', className: "hidden sm:flex items-center gap-1"
                                })}>
                                    Create case
                                    <ArrowRight className='ml-1.5 h-5 w-5'></ArrowRight>
                                </Link>

                            </>)}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default Navbar
