// "use client"
// import React from "react"
// import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
// const AspectRatio = React.forwardRef<HTMLDivElement>(({ props, ref }: React.ComponentProps<typeof AspectRatioPrimitive.Root>) => (
//   <div ref={ref}>
//     <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
//   </div>
// ))
"use client"
import React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof AspectRatioPrimitive.Root>>(
  (props, ref) => (
    <div ref={ref}>
      <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
    </div>
  )
)

AspectRatio.displayName = "AspectRatio"

export default AspectRatio

// function AspectRatio({
//   ...props}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
//   return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />
// }

export { AspectRatio }
