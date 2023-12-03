import React from 'react'
import './Login.css'
import {Link, useNavigate} from 'react-router-dom'
import welcomeImage from '../../assets/Images/Group 11664image.png'
//import star from '../Images/Group 11650.png'
import {Field,Form,Formik,ErrorMessage} from 'formik'
import { useDispatch , useSelector } from 'react-redux'
import * as yup from 'yup'
import { SignInUser, clearState } from '../../features/auth/authSlice'
import { useEffect } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {navigate} from 'react-router-dom';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const data = useSelector((state) => state.user);
  let { error, message, loading } = data;

  useEffect(() => {
    if (error) {
      toast.error(error, { position: toast.POSITION.TOP_CENTER });
      setTimeout(()=>{
        dispatch(clearState());
        navigate('/');
      },1000);  
    }
    if (message) {
      toast.success(message, { position: toast.POSITION.TOP_CENTER });
      setTimeout(()=>{
        dispatch(clearState());
        navigate('/list');
      },1000);  
    }
  }, [error, message]);

  const initialState = {
    email : '',
    password : ''
  };

  const validationSchema = yup.object().shape({
    email: yup.string().required().email("Please enter your email"),
    password: yup.string().required("Please enter your password")
    .min(8,"password must have at least 8 characters"),
  });

  const handleSubmit = async (values) => {
    console.log("values", values);
    const result = await dispatch(SignInUser(values));
    // if(result.payload.message == "Login success"){
    //   navigate()
    // }
  };

  return (
    <>
    <ToastContainer/>
    <div className='container'>
    <div className="leftBox">
      <h1>Welcome</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
       tempore sit exercitationem.</p>
      <img src={welcomeImage} alt='welcome' />
    </div>
    <div className="rightBox">
       <div className="heading">
       <h1>Login</h1>
       <p>Hello ! Please Enter Your Details for Login</p>
       </div>
       <Formik
       initialValues={initialState}
       validationSchema={validationSchema}
       onSubmit={handleSubmit}>
      <Form >
        <Field type="text" placeholder='Email' name='email'/>
        <ErrorMessage name='email'></ErrorMessage>
        <Field type="password" placeholder='Password' name='password' />
        <ErrorMessage name='password'></ErrorMessage>
        <p><Link to='/forgotPass' id='forgotPass'>Reset Password ?</Link></p>
        <button id='LoginButton' type='submit'>Login</button>
      </Form>
      </Formik>
       <div className="footer">
        <p>I already have account on Review and Rate</p>
        <span><Link to='/signup'>Register Now</Link></span>
       </div>
    </div>
    </div>
    </>
  )
}

export default Login