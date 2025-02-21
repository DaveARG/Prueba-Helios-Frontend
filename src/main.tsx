import { createRoot } from "react-dom/client"
import { Routes } from "@generouted/react-router"
import "@/styles/app.less"
import "@/styles/topnav.less"
import "@/styles/home.less"

createRoot(document.getElementById("root")!).render(<Routes />)
