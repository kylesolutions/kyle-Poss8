import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserRouter from './routes/UserRouter'
import { CartProvider } from './context/CartContext'

function App() {


  return (
    <>
    <CartProvider>
      <BrowserRouter>
          <Routes>
            <Route path='/*' element={<UserRouter />} />
          </Routes>
        </BrowserRouter>
    </CartProvider>
        
      


    </>
  )
}

export default App
