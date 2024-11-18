import React from 'react'
import { Route, Routes } from 'react-router-dom'
import BillPage from '../pages/BillPage'
import Reciept from '../components/bill/Reciept'
import CashPayment from '../components/bill/CashPayment'

function UserRouter() {
  return (
    <>
    <Routes>
        {/* <Route path='/' element={<HomePage/>}/> */}
        <Route path='/' element={<BillPage/>}/>
        <Route path='receipt' element={<Reciept/>}/>
        <Route path='cash-payment' element={<CashPayment/>}/>
    </Routes>
    </>
  )
}

export default UserRouter