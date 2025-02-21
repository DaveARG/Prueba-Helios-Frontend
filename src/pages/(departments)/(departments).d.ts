interface Department {
  id: string | number
  name: string
  level: number
  employees: number
  ambassador: string | null
  department_id: number | null
  created_at: string
  updated_at: string

  subdivisions: Department[]
  parent: Department | null
  category: Category
}

interface Category {
  id: number
  name: string
}
