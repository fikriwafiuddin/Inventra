"use client"

import { Loader2Icon } from "lucide-react"

function loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Loader2Icon className="animate-spin" />
    </div>
  )
}

export default loading
