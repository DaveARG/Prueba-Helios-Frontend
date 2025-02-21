import TableFetch from "@/pages/_components/table/table-fetch"
import GroupButtons from "../group-buttons"
import {
  useColumnsListado,
  useColumnsListadoExpandible,
} from "./useColumnsListado"
import { Button, Table } from "antd"
import useExpandRowTable from "@/pages/_hooks/useExpandRowTable"
import {
  DownloadOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons"
import { useEffect, useState } from "react"
import SeachActions from "./search-actions"

export default function Listado() {
  const columnsExpanded = useColumnsListadoExpandible()
  const { expandedRowKeys, onExpand, setExpandedRowKeys } = useExpandRowTable()
  const [dataComplete, setDataComplete] = useState<
    ResponsePaginateLaravel<Department> & {
      total_employees: string
    }
  >()

  const [parametros, setParametros] = useState<string>()
  const [reFetch, setReFetch] = useState(0)
  function onSearch({ search, column }: { search?: string; column?: string }) {
    if (column && search) setParametros(`column=${column}&search=${search}`)
    else setParametros(undefined)
  }
  useEffect(() => setReFetch((prev) => prev + 1), [parametros])

  return (
    <div className="listado">
      <div className="listado__actions">
        <Button type="primary" icon={<PlusOutlined />} />
        <Button icon={<UploadOutlined />} />
        <Button icon={<DownloadOutlined />} />
      </div>
      <div className="listado__header">
        <GroupButtons />
        <SeachActions onSearch={onSearch} />
      </div>
      <TableFetch
        columns={useColumnsListado({ onExpand, expandedRowKeys })}
        url="/departments"
        parametros={parametros}
        size="small"
        formatData={(data) =>
          data.map((item) => ({
            ...item,
            subdivisions: item.subdivisions
              ? item.subdivisions.map((child) => ({
                  ...child,
                  id: `${item.id}_child_${child.id}`,
                }))
              : [],
          }))
        }
        onSuccess={setDataComplete}
        reFetch={reFetch}
        expandable={{
          expandedRowRender: (record) => {
            return (
              <Table
                rowKey={(record2) => record2.id}
                columns={columnsExpanded}
                dataSource={record.subdivisions}
                pagination={false}
              />
            )
          },
          expandedRowKeys,
          onExpand: (expanded, record) => {
            setExpandedRowKeys((prev) =>
              expanded
                ? [...prev, record.id]
                : prev.filter((key) => key !== record.id)
            )
          },
          showExpandColumn: false,
        }}
      />
      {dataComplete && (
        <p className="listado__total">
          Total Colaboradores: {dataComplete.total_employees ?? 0}
        </p>
      )}
    </div>
  )
}
