import { Outlet } from "react-router"
import TopNav from "./_components/topnav/topnav"

export default function LayoutDefault() {
  return (
    <>
      <TopNav />
      <main className="app">
        <Outlet />
      </main>
    </>
  )
}
