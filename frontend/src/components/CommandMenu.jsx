import { useEffect, useState } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import Link from "next/link"
import navLinks from "@/lib/constants/navLinks"

function CommandMenu() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-muted-foreground hidden w-xs sm:inline-flex justify-between items-center rounded-md border px-3 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        Search...
        <kbd className="ml-2 pointer-events-none inline-flex items-center h-5 select-none rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          {navigator.platform.includes("Mac") ? "⌘" : "Ctrl"} + K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {navLinks.map((group, index) => (
            <div key={group.label}>
              <CommandGroup heading={group.label} key={group.label}>
                {group.items.map((item) => (
                  <CommandItem key={item.title} asChild>
                    <Link href={item.url} onClick={() => setOpen(false)}>
                      {item.title}
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
              {index !== navLinks.length - 1 && <CommandSeparator />}
            </div>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
