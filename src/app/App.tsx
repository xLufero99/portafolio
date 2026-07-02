import { Routes, Route } from 'react-router-dom'
import { RootLayout } from './layout/RootLayout'
import { Home, About, Projects } from './routes'

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
      </Route>
    </Routes>
  )
}

export default App