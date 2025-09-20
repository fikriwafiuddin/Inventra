"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import {
  CheckIcon,
  GlobeIcon,
  LogOutIcon,
  Moon,
  Sun,
  UserIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { SidebarTrigger } from "./ui/sidebar"
import Link from "next/link"
import { Input } from "./ui/input"
import { SignedIn, UserButton } from "@clerk/nextjs"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"

function Navbar() {
  const { setTheme } = useTheme()
  const pathname = usePathname()
  const split = pathname.split("/")
  let title = split[1]
  title = title.length > 0 ? title.charAt(0).toUpperCase() + title.slice(1) : ""

  const locale = useLocale()
  const router = useRouter()

  const switchLocale = (newLocale) => {
    if (newLocale !== locale) {
      router.push(pathname, { locale: newLocale })
    }
  }

  return (
    <nav className="flex justify-between px-4 py-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h2>{title}</h2>
      </div>
      <div className="flex gap-3">
        <Input
          type="search"
          placeholder="Search"
          className="hidden sm:inline"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <GlobeIcon className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Toggle language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="px-2 text-sm py-1.5 flex items-center gap-1"
              onClick={() => switchLocale("id")}
            >
              {locale === "id" ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <span className="w-4"></span>
              )}
              <span>Bahasa Indonesia</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-2 text-sm py-1.5 flex items-center gap-1"
              onClick={() => switchLocale("en")}
            >
              {locale === "en" ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <span className="w-4"></span>
              )}
              <span>English</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="px-2 text-sm py-1.5"
              onClick={() => setTheme("light")}
            >
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-2 text-sm py-1.5"
              onClick={() => setTheme("dark")}
            >
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-2 text-sm py-1.5"
              onClick={() => setTheme("system")}
            >
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}

export default Navbar
