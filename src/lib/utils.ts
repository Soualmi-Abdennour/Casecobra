import { metadata } from "@/app/layout"
import { clsx, type ClassValue } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price:number){
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  })
  return formatter.format(price)
}

export function constructMetadata({
  title="CaseCobra - custom high-quality phone cases",
  description="Create custom high-quality phone cases in secconds",
  image="thumbnail.png",
  icons="favicon.ico"
}:{
  title?:string,
  description?:string,
  image?:string,
  icons?:string
}={}):Metadata{
  return {
    title,
    description,
    openGraph:{
      title,
      description,
      images:[{url:image}]
    },
    twitter:{
      card:"summary_large_image",
      title,
      description,
      images:[image]
    },
    icons,
    metadataBase:new URL("https://casecobra-sa.vercel.app")
  }
}