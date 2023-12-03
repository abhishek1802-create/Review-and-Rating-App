import React from 'react'
import '../auth/ForgetPassword.css'
import {Field,Formik,ErrorMessage,Form} from 'formik';
import * as yup from 'yup'
import {useDispatch , useSelector} from 'react-redux';
import { useEffect } from 'react';
import { forgetPassword } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function ForgetPassword() {

  const initialState = {
    email : '',
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const forgetData = useSelector((state) => state.user);
  const {error, forget_message} = forgetData;

  useEffect(()=>{
    if(forget_message){
      toast.success(forget_message, { position: toast.POSITION.TOP_CENTER });
      navigate('/')
    }
    if(error){
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
    }
  })

  const validationSchema = yup.object().shape({
    email : yup.string().required().email('Please enter the Email'),
  })

  const handleSubmit = async (value)=>{
    console.log('Email :',value);
    dispatch(forgetPassword(value));
  }

  return (
    <>
    <ToastContainer/>
    <div className='forgotPass'>
      <div className="Box">
        <h1>Reset Password</h1>
        <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form>
        <Field type="text" name='email' placeholder='Email' />
        <ErrorMessage name='email'></ErrorMessage>
        <button id='resetButton' type='submit'>Reset</button>
        </Form>
        </Formik>
      </div>
    </div>
    </>
  )
}

export default ForgetPassword