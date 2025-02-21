import { Radio } from "antd"
import { useState } from "react"

export default function GroupButtons() {
  const [value, setValue] = useState("listado")
  return (
    <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
      <Radio.Button value="listado">Listado</Radio.Button>
      <Radio.Button value="arbol">Arbol</Radio.Button>
    </Radio.Group>
  )
}
