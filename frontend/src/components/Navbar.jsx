"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { SidebarTrigger } from "./ui/sidebar"
import { Input } from "./ui/input"
import { usePathname } from "next/navigation"
import { SignedIn, UserButton } from "@clerk/nextjs"
import CommandMenu from "./CommandMenu"

function Navbar() {
  const { setTheme } = useTheme()
  const pathname = usePathname()
  const split = pathname.split("/")
  let title = split[1]
  title = title.length > 0 ? title.charAt(0).toUpperCase() + title.slice(1) : ""

  return (
    <nav className="flex justify-between px-4 py-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h2>{title}</h2>
      </div>
      <div className="flex gap-3">
        <CommandMenu />
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
