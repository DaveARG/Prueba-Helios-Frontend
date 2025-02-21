import { Tabs, TabsProps } from "antd"
import Listado from "./listado/listado"

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Divisiones",
    children: <Listado />,
  },
  {
    key: "2",
    label: "Colaboradores",
  },
]

export default function TabsHome() {
  return <Tabs size="small" items={items} />
}
