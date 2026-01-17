import { createRoot } from "react-dom/client"
import { MainView } from "./components/MainView"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.scss"

const App = () => {
  return <MainView />
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
