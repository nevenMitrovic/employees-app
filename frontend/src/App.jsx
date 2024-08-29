import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from "./pages/NotFound"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
