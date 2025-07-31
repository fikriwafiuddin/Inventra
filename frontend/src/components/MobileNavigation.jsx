"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MobileNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button
        className=""
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
              onClick={() => setMobileMenuOpen(false)} // Tutup menu saat klik link
            >
              Fitur
            </a>
            <a
              href="#pricing"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Harga
            </a>
            <a
              href="#testimonials"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimoni
            </a>
            <a
              href="#contact"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Kontak
            </a>
            <div className="flex flex-col space-y-2 pt-4 border-t border-border">
              <Link href="/auth/sign-in" passHref>
                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign-in
                </Button>
              </Link>
              <Link href="/auth/sign-up" passHref>
                <Button
                  className="justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign-up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
