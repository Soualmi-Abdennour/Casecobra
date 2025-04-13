"use client"
import React, { ReactNode } from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ClerkProvider } from '@clerk/nextjs'

const client= new QueryClient()
function Providers({children}:{children:ReactNode}) {
    return (
            <QueryClientProvider client={client}>{children}</QueryClientProvider>
    )
}

export default Providers
