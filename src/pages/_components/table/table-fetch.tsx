/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableProps } from "antd"
import { GetProp } from "antd/lib"
import type { SorterResult } from "antd/es/table/interface"
import { useEffect, useState } from "react"
import qs from "qs"
import useFetchData from "@/pages/_hooks/useFetchData"
import { GLOB } from "@/lib/lib"

type TablePaginationConfig = Exclude<GetProp<TableProps, "pagination">, boolean>

export type TableParams = {
  pagination?: TablePaginationConfig
  sortField?: SorterResult<any>["field"]
  sortOrder?: SorterResult<any>["order"]
  filters?: Parameters<GetProp<TableProps, "onChange">>[1]
}

type TableFetchProps<T> = TableProps<T> & {
  url: string
  onSuccess?: (res: any) => void
  formatData?: (data: T[]) => T[]
  onChangeData?: (data: T[]) => void
  reFetch?: number
  parametros?: string
  defaultTableParams?: TableParams
}
export default function TableFetch<T extends { id: number | string }>({
  url,
  onSuccess,
  formatData,
  onChangeData,
  reFetch,
  parametros,
  defaultTableParams = {
    pagination: {
      current: 1,
      pageSize: 10,
    },
  },
  ...props
}: TableFetchProps<T>) {
  const [data, setData] = useState<T[]>([])

  useEffect(() => {
    onChangeData?.(data)
  }, [data])

  const [tableParams, setTableParams] =
    useState<TableParams>(defaultTableParams)

  const { fetchData, isloading } = useFetchData<ResponsePaginateLaravel<T>>()

  const getRandomParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  })

  useEffect(() => {
    const url_fetch = `${GLOB.apiUrl}${url}?${
      parametros ? `${parametros}&` : ""
    }${qs.stringify(getRandomParams(tableParams))}`
    fetchData({
      method: "get",
      url: url_fetch,
      onSuccess: (res) => {
        const data = res.data
        const data_format = formatData ? formatData(data) : data
        setData(data_format)
        if (onSuccess) onSuccess(res)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.total,
          },
        })
      },
    })
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
    reFetch,
  ])

  const handleTableChange: TableProps<T>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    })

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }

  return (
    <Table
      {...props}
      rowKey={(record) => record.id}
      dataSource={data}
      pagination={tableParams.pagination}
      loading={isloading}
      onChange={handleTableChange}
    />
  )
}
