import { SearchOutlined } from "@ant-design/icons"
import { Input, InputRef, TableColumnType, DatePicker } from "antd"
const { RangePicker } = DatePicker
import { useDebouncedCallback } from "use-debounce"
import { useRef } from "react"
import { presetsRangePicker, startAndEndOfDays } from "@/pages/_utils/fechas"

type useMakeColumnSearchProps = {
  tipe: "string" | "date"
}
export default function useMakeColumnSearch<T>(
  { tipe = "string" }: useMakeColumnSearchProps = { tipe: "string" }
) {
  const inputRef = useRef<InputRef>(null)

  const debounced = useDebouncedCallback(
    ({ setSelectedKeys, confirm, value }) => {
      confirm({ closeDropdown: false })
      setSelectedKeys(value ? value : null)
      confirm()
    },
    500
  )

  const getColumnSearchProps: TableColumnType<T> = {
    filterDropdown: ({ setSelectedKeys, confirm }) => (
      <div
        style={{
          position: "absolute",
          top: "-4.5rem",
          right: "-2rem",
          width: "240px",
          padding: "0.5rem",
          marginTop: "-0.25rem",
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {tipe === "string" && (
          <Input
            ref={inputRef}
            variant="filled"
            style={{ borderRadius: "0.5rem" }}
            prefix={
              <SearchOutlined
                style={{ color: "#94A3B8", marginRight: "0.5rem" }}
              />
            }
            placeholder="Buscar"
            onChange={(e) => {
              debounced({
                value: e.target.value ? e.target.value : undefined,
                setSelectedKeys,
                confirm: () => confirm({ closeDropdown: false }),
              })
            }}
          />
        )}
        {tipe === "date" && (
          <RangePicker
            presets={presetsRangePicker}
            variant="filled"
            style={{ borderRadius: "0.5rem" }}
            onChange={(date, dateString) => {
              debounced({
                value: date ? startAndEndOfDays(dateString) : null,
                setSelectedKeys,
                confirm: () => confirm({ closeDropdown: false }),
              })
            }}
          />
        )}
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilterDropdownOpenChange: (visible) => {
      if (visible && tipe === "string")
        setTimeout(() => inputRef.current?.select(), 100)
    },
  }
  return getColumnSearchProps
}
