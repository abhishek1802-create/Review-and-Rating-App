import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Login from '../src/ReviewRating/Components/auth/Login'
import SignUp from './ReviewRating/Components/auth/Signup'
import Page404 from './ReviewRating/Components/Page404' 
import ForgotPass from './ReviewRating/Components/auth/ForgetPassword'
import CreateCompany from './ReviewRating/Components/company/CreateCompany'
import AddNewReview from './ReviewRating/Components/company/AddNewReview'
import CompanyDetails from './ReviewRating/Components/company/CompanyDetails'
import ProtectedRoute from './ReviewRating/Components/protected/ProtectedRoute'
import Navbar_new from './ReviewRating/navbar/Navbar_new'
import Company_list from './ReviewRating/Components/company/Company_list'
import ResetPassword from '../src/ReviewRating/Components/auth/ResetPassword'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path='/list' element={<Company_list/>}></Route>
           <Route path='/' element={<Login/>}></Route>
           <Route path='/signup' element={<SignUp/>}></Route>
           <Route path='/forgotPass' element={<ForgotPass/>}></Route> 
           <Route path='/createCompany' element={<CreateCompany/>}></Route> 
           <Route path='/companyDetail/:id' element={<CompanyDetails/>}></Route>
           <Route path='/addCompanyReview/:id' element={<AddNewReview/>}></Route>
           <Route path='/navbar' element={<ProtectedRoute component={Navbar_new}/>}></Route>
           <Route path='/company' element={<ProtectedRoute component={CreateCompany}/>}></Route> 
           <Route path='/company_list' element={<ProtectedRoute component={Company_list}/>}></Route>
           <Route path='/user/reset-password/:id/:token' element={<ResetPassword/>}></Route>
           <Route path='/*' element={<Page404/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App