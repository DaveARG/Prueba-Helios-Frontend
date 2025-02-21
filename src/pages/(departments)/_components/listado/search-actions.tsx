import { Input, Select } from "antd"
import { useEffect, useState } from "react"
import { useColumnsListado } from "./useColumnsListado"
const { Search } = Input

export default function SeachActions({
  onSearch,
}: {
  onSearch?: ({ search, column }: { search?: string; column?: string }) => void
}) {
  const [selectedColumn, setSelectedColumn] = useState<string>()
  const [search, setSearch] = useState<string>()
  useEffect(() => {
    onSearch?.({ search, column: selectedColumn })
  }, [selectedColumn, search])
  const columns = useColumnsListado()
  return (
    <div className="listado__header__inputs">
      <Select
        value={selectedColumn}
        onChange={setSelectedColumn}
        options={columns.map((item) => ({
          label: item.title,
          value: (item as { dataIndex: string }).dataIndex,
        }))}
        style={{ width: 160 }}
        placeholder="Columnas"
      />
      <Search
        onSearch={setSearch}
        style={{ width: 240 }}
        placeholder="Buscar"
      />
    </div>
  )
}
