import { useState } from "react"

export default function useExpandRowTable() {
  const [expandedRowKeys, setExpandedRowKeys] = useState<(string | number)[]>(
    []
  )

  const onExpand = (
    record: { id: string | number },
    e: { stopPropagation: () => void }
  ) => {
    e.stopPropagation()
    setExpandedRowKeys((prev) =>
      prev.includes(record.id)
        ? prev.filter((key) => key !== record.id)
        : [...prev, record.id]
    )
  }

  return { expandedRowKeys, setExpandedRowKeys, onExpand }
}
