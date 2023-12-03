import React, { useState } from 'react'
import './CreateCompany.css'
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as yup from 'yup'
import {useSelector,useDispatch} from 'react-redux'
import { createCompany } from '../../features/company/companySlice';
import { useEffect } from 'react';
import { ToastContainer,toast } from "react-toastify";


function CreateCompany() {

  const[companyPic , setCompanyPic] = useState("");
  const dispatch = useDispatch();
  const companyData = useSelector((state)=>state.company);
 let {error,cmpCreate_msg}=companyData;

 useEffect(() => {
  if(cmpCreate_msg) {
    toast.success(cmpCreate_msg, { position: toast.POSITION.TOP_CENTER });
  }
  if(error) {
    toast.error(error, {position: toast.POSITION.TOP_CENTER});
  }
  
}, [cmpCreate_msg, error]);


  const initialState = {
    companyName : "",
    location : "",
    city : "",
    founded : ""
  }

  const validationSchema = yup.object().shape({
    companyName : yup.string().required("Please Enter the Company Name"),
    location : yup.string().required("Please Enter the location"),
    city : yup.string().required("Please Enter the City"),
    founded : yup.string().required("Please Enter the Date")
  });

  const handleSubmit = (values)=>{
      console.log(values);
      const user = JSON.parse(localStorage.getItem("user"));
      let obj = {
        ...values,
        company_logo :companyPic,
        userId: user._id,
      };
      console.log("this is object:",obj);
      dispatch(createCompany(obj));
  }

  const addCompanyPic = (e)=>{
     setCompanyPic(e.target.files[0]);
  }

  return (
    <>
    <ToastContainer/>
    <div className='addCompany'>
        <div className="box">
            <h2>Add Company</h2>
            <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            <Form>
                <label htmlFor="#">Company Name</label>
                <Field type="text"
                name="companyName"
                placeholder="Enter Company Name" 
                />
                <p className='errorFont'><ErrorMessage  name='companyName'></ErrorMessage></p>
                <label htmlFor="#">Location</label>
                <Field type="text"
                name="location"
                placeholder="Enter location" 
                />
                 <p className='errorFont'><ErrorMessage  name='location'></ErrorMessage></p>
                
                <label htmlFor="#">City</label>
                <Field type="text"
                name="city"
                placeholder="Enter city" 
                />
                 <p className='errorFont'><ErrorMessage  name='city'></ErrorMessage></p>
                <label htmlFor="#">Founded On</label>
                <Field type="date"
                name="founded" 
                />
                 <p className='errorFont'><ErrorMessage  name='founded'></ErrorMessage></p>
                <label htmlFor="#">File</label>
                <input type="file" name="company_logo" onChange={addCompanyPic} />
                <button id='saveButton' type='submit'>Save</button>
            </Form>
            </Formik>
        </div>
    </div>
    </>
  )
}

export default CreateCompany