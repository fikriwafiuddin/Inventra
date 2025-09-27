"use client"

import Details from "./Details"
import Counting from "./Counting"
import { useGetDetailOpname } from "@/services/hooks/opname-hook"
import { Loader2Icon } from "lucide-react"

function Opname({ id, translations }) {
  const { isPending: fetching, data: opname, error } = useGetDetailOpname(id)

  return (
    <>
      {error && (
        <div className="text-destructive text-center mt-4">
          {translations.opname.error}
        </div>
      )}

      {fetching && (
        <div className="flex justify-center mt-4">
          <Loader2Icon className="animate-spin size-10 text-muted-foreground" />
          <span className="ml-2">{translations.opname.loading}</span>
        </div>
      )}

      {opname &&
        (opname.status === "completed" ? (
          <Details opname={opname} translations={translations} />
        ) : (
          <Counting
            opname={opname}
            translations={translations.counting}
            tableTranslations={translations.table}
          />
        ))}
    </>
  )
}

export default Opname
