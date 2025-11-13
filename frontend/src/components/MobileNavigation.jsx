"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"

export default function MobileNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { userId } = useAuth()

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu-items"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-items"
          className="py-4 px-2 border-t border-border absolute top-full left-0 right-0 bg-background z-50"
        >
          <div className="flex flex-col space-y-4">
            <a
              href="#features"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              {userId ? (
                <Link href="/dashboard" passHref>
                  <Button>Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/sign-up" passHref>
                    <Button variant="ghost">Sign-up</Button>
                  </Link>
                  <Link href="/auth/sign-in" passHref>
                    <Button>Sign-in</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
