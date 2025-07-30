import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainPage from './pages/MainPage'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardPage from './pages/DashboardPage'
import { useAuthContext } from './hooks/useAuthContext'
import AccountsPage from './pages/AccountsPage'
import TransactionsPage from './pages/TransactionsPage'
import BudgetsPage from './pages/BudgetsPage'
import GoalsPage from './pages/GoalsPage'


const App = () => {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div className='h-screen w-full overflow-hidden'>
      <div className='flex h-full w-full'>
        {/* <Navbar/> */}
        {user && <Navbar />}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={!user ? <MainPage/> : <Navigate to="/dashboard"/> }/>
          <Route path="/signup" element={!user ? <MainPage/> : <Navigate to="/dashboard"/> }/>
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<DashboardPage />}/>
            <Route path='/accounts' element={<AccountsPage />}/>
            <Route path='/transactions' element={<TransactionsPage />}/>
            <Route path='/budgets' element={<BudgetsPage />}/>
            <Route path='/goals' element={<GoalsPage />}/>
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App