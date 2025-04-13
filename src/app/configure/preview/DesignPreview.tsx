"use client"


import { BASE_PRICE, PRODUCT_PRICES } from '@/app/config/products'
import LoginModel from '@/components/LoginModel'
import Phone from '@/components/Phone'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { cn, formatPrice } from '@/lib/utils'
import { COLORS, MODELS } from '@/validators/option-validator'
import { Configuration } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import { ArrowRight, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Confetti from "react-dom-confetti"
import { createCheckoutSession } from './actions'
import { useUser } from '@clerk/nextjs'

function DesignPreview({ configuration }: { configuration: Configuration }) {
    const router=useRouter()
    const {toast}=useToast()
    const [isLoginModelOpen,setIsLoginModelOpen]=useState<boolean>(false)
    const {user}=useUser()
    const [showConfetti, setShowConfetti] = useState<boolean>(false)
    const { color, croppedImageUrl, model, finish, material } = configuration
    const tw_color = COLORS.find((supportedColor) => (supportedColor.value === color))?.tw
    const { label: modelLabel } = MODELS.options.find(({ value }) => value === model)!
    let totalprice = BASE_PRICE
    if (material === "polycarbonate") totalprice += PRODUCT_PRICES.material.polycarbonate
    if (finish === "textured") totalprice += PRODUCT_PRICES.finish.textured
    useEffect(() => setShowConfetti(true), [])
    const {mutate:createPaymentSession}=useMutation({
        mutationKey:['get-checkout-session'],
        mutationFn:createCheckoutSession,
        onSuccess:({url})=>{
            if(url) router.push(url)
            else throw new Error("Unable to retrieve payment URL")
        },
        onError:()=>{
            toast({
                title: 'Something went wrong',
                description: 'There was an error on our end. Please try again.',
                variant: 'destructive',
            })        }
    })

    const handleCheckout=()=>{        
        if(user){
            createPaymentSession({configId:configuration.id})
        }else {
            localStorage.setItem("configurationId",configuration.id)
            setIsLoginModelOpen(true)
        }
    }
    return (
        <>
            <div aria-hidden='true' className='pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center'>
                <Confetti active={showConfetti} config={{ elementCount: 200, spread: 90, duration: 4000 }}></Confetti>
            </div>
            <LoginModel isOpen={isLoginModelOpen} setIsOpen={setIsLoginModelOpen}></LoginModel>
            <div className='mt-20 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12'>
                <div className='md:col-span-4 lg:col-span-3 md:row-span-2 md:row-end-2'>
                    <Phone imgSrc={croppedImageUrl!} className={cn(`bg-${tw_color}`,"max-w-[150px] md:max-w-full")}></Phone>
                </div>
                <div className='mt-6 sm:col-span-9 md:row-end-1'>
                    <h3 className='text-3xl font-bold tracking-tight text-gray-900'>Your {modelLabel} Case</h3>
                    <div className='mt-3 flex items-center gap-1.5 text-base'>
                        <Check className='h-4 w-4 text-green-500'></Check>
                        In stock and ready to ship
                    </div>
                </div>
                <div className='sm:col-end-12 md:col-span-9 text-base'>
                    <div className='grid grid-cols-1  gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10'>
                        <div>
                            <p className='text-zinc-950 font-medium'>Highlights</p>
                            <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                                <li>Wireless charging compatible</li>
                                <li>TPU shock absorption</li>
                                <li>Pachaging made from recycled materials</li>
                                <li>5 year print warranty</li>
                            </ol>
                        </div>
                        <div>
                            <p className='font-medium text-zinc-950'>Materials</p>
                            <ol className='mt-3 text-zinc-700 list-disc list-inside'>
                                <li>High-quality, durable material</li>
                                <li>Scratch- and fingerprint resistant coating</li>
                            </ol>
                        </div>
                    </div>
                    <div className='mt-8'>
                        <div className='bg-gray-50 p-6 sm:rounded-lg sm:p-8'>
                            <div className='flow-root text-sm'>
                                <div className='flex items-center justify-between py-1 mt-2'>
                                    <p className='text-gray-600'>Base price</p>
                                    <p className='text-gray-900 font-medium'>{formatPrice(BASE_PRICE / 100)}</p>
                                </div>
                                {finish === "textured" && (
                                    <div className='flex items-center justify-between py-1 mt-2'>
                                        <p className='text-gray-600'>Textured finish</p>
                                        <p className='text-gray-900 font-medium'>{formatPrice(PRODUCT_PRICES.finish.textured / 100)}</p>
                                    </div>
                                )}
                                {material === "polycarbonate" && (
                                    <div className='flex items-center justify-between py-1 mt-2'>
                                        <p className='text-gray-600'>Soft polycarbonate material</p>
                                        <p className='text-gray-900 font-medium'>{formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}</p>
                                    </div>
                                )}
                                <div className='my-2 h-px bg-gray-200'></div>
                                <div className='flex items-center justify-between py-2'>
                                    <p className='font-semibold text-gray-900'>Order total</p>
                                    <p className='font-semibold text-gray-900'>{formatPrice(totalprice / 100)}</p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-8 flex justify-end pb-12'>
                            <Button onClick={handleCheckout} className='px-4 sm:px-6 lg:px-8 cursor-pointer'>Check out <ArrowRight className='h-4 w-4 ml-1.5 inline'></ArrowRight></Button>
                        </div>        
                    </div>
                </div>
            </div>
        </>
    )
}

export default DesignPreview
