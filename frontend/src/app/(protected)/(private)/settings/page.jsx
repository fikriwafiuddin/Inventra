"use client"

import { Separator } from "@/components/ui/separator"
import { useUser } from "@clerk/nextjs"
import CompanyInformation from "./CompanyInformation"
import ApplicationSetting from "./ApplicationSetting"
import { Loader2Icon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

function SettingsPage() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex justify-center mt-4">
        <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <CompanyInformation user={user} />
      <Separator className="my-6" />
      <ApplicationSetting />
      <Badge variant="ghost">v1.0.0</Badge>
    </div>
  )
}

export default SettingsPage
