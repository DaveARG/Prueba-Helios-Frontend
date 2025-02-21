import { GLOB } from "@/lib/lib"
import useMakeColumnSearch from "@/pages/_components/table/search-fetch"
import useFetchData from "@/pages/_hooks/useFetchData"
import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons"
import { TableColumnsType } from "antd"
import { ColumnsType } from "antd/es/table"
// import { Table } from "antd/lib"
import { useEffect, useState } from "react"

export function useColumnsListado({
  expandedRowKeys,
  onExpand,
}: {
  expandedRowKeys?: (string | number)[]
  onExpand?: (
    record: { id: string | number },
    e: { stopPropagation: () => void }
  ) => void
} = {}) {
  const { fetchData } = useFetchData<Category[]>()

  const [data, setData] = useState<Category[]>([])

  useEffect(() => {
    fetchData({ url: `${GLOB.apiUrl}/categories/all`, onSuccess: setData })
  }, [])

  const columns: ColumnsType<Department> = [
    {
      title: "Categoría",
      dataIndex: "category.name",
      sorter: true,
      showSorterTooltip: false,
      render: (_, render) => <span>{render.category.name}</span>,
      filters: data.map((item) => ({
        text: item.name,
        value: item.name,
      })),
      width: 100,
    },
    {
      title: "División",
      ...useMakeColumnSearch(),
      dataIndex: "name",
      sorter: true,
      showSorterTooltip: false,
      width: 100,
    },
    {
      title: "División Superior",
      ...useMakeColumnSearch(),
      dataIndex: "parent.name",
      sorter: true,
      showSorterTooltip: false,
      render: (_, render) => <span>{render.parent?.name ?? "-"}</span>,
      width: 100,
    },
    {
      title: "Colaboradores",
      dataIndex: "employees",
      sorter: true,
      showSorterTooltip: false,
      width: 100,
    },
    {
      title: "Nivel",
      dataIndex: "level",
      sorter: true,
      showSorterTooltip: false,
      filters: Array.from({ length: 5 }, (_, i) => ({
        text: (i + 1).toString(),
        value: (i + 1).toString(),
      })),
      width: 50,
    },
    {
      title: "Subdivisiones",
      dataIndex: "subdivisions(length)",
      sorter: true,
      showSorterTooltip: false,
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <span
            style={{
              cursor: "pointer",
              textDecoration:
                record.subdivisions.length > 0 ? "underline" : "none",
            }}
            onClick={(e) =>
              record.subdivisions.length > 0 && onExpand?.(record, e)
            }
          >
            {record.subdivisions?.length ?? 0}
          </span>
          {record.subdivisions.length > 0 && (
            <span
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                paddingTop: "2px",
              }}
              onClick={(e) => onExpand?.(record, e)}
            >
              {expandedRowKeys?.includes(record.id) ? (
                <MinusCircleFilled style={{ color: "#faad14e5" }} />
              ) : (
                <PlusCircleFilled style={{ color: "#49C55DE5" }} />
              )}
            </span>
          )}
        </div>
      ),
      width: 100,
    },
    {
      title: "Embajadores",
      ...useMakeColumnSearch(),
      dataIndex: "ambassador",
      render: (val) => <span>{val ?? "-"}</span>,
      width: 100,
    },
  ]
  return columns
}

export function useColumnsListadoExpandible() {
  const columns: TableColumnsType<Department> = [
    {
      title: "Categoría",
      render: (_, render) => <span>{render.category.name}</span>,
      width: 100,
    },
    {
      title: "División",
      dataIndex: "name",
      width: 100,
    },
    {
      title: "Colaboradores",
      dataIndex: "employees",
      width: 100,
    },
    {
      title: "Nivel",
      dataIndex: "level",
      width: 50,
    },
    {
      title: "Subdivisiones",
      dataIndex: "subdivisions",
      render: (val) => <span>{(val ?? []).length}</span>,
      width: 100,
    },
    {
      title: "Embajadores",
      dataIndex: "ambassador",
      render: (val) => <span>{val ?? "-"}</span>,
      width: 100,
    },
  ]
  return columns
}
