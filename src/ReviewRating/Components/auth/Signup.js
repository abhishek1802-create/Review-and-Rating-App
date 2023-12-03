import React, { useEffect, useState } from 'react'
import './Signup.css'
import {Link , useNavigate} from 'react-router-dom'
import * as yup from 'yup'
import {Formik, Form , Field , ErrorMessage} from 'formik'
import welcomeImage from '../../assets/Images/Group 11664image.png'
import {useSelector,useDispatch} from 'react-redux'
import { clearState, signUpUser } from '../../features/auth/authSlice'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function Signup() {
  
  const [pic ,setPic] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state)=>state.user);
  let {error,message,loading} = data;
  console.log(data)

  useEffect(()=>{
    if(error){
      toast.error(error,{position: toast.POSITION.TOP_CENTER})
    }
    if(message){
      toast.success(message,{position: toast.POSITION.TOP_CENTER})
      setTimeout(()=>{
        dispatch(clearState());
      },1000)
    }
  })

  const initialState = {
    name : '',
    email : '',
    password : '',
    mobile : '',
    city : '',
    state : ''
  }

  const validationSchema = yup.object().shape({
    name :yup.string().required("Please Enter the Name"),
    email : yup.string().required().email("Please enter the Email"),
    password : yup.string().required("Please Enter your Password").
    min(8,"password must be of 8 Characters"),
    mobile : yup.string().required("Please enter your Phone Number"),
    city : yup.string().required("Please enter your city"),
    state : yup.string().required("Please enter your state")
  });

  const handleSubmit = (values)=>{

     let obj = {
      profilepic : pic,
      ...values
     }
   
     dispatch(signUpUser(obj));
  }

  const picSelect = (e)=>{
    setPic(e.target.files[0]);
  }


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
       <h1>SignUp</h1>
       <Formik
       initialValues={initialState}
       validationSchema={validationSchema}
       onSubmit={handleSubmit}
       >
      <Form>
        <Field type="text" placeholder='Full Name' name='name' />
        <ErrorMessage name='name'></ErrorMessage>
        <Field type="text" placeholder='Email' name='email' />
        <ErrorMessage name='email'></ErrorMessage>
        <Field type="password" placeholder='Password' name='password' />
        <ErrorMessage name='password'></ErrorMessage>
        <Field type="number" placeholder='Phone Number' name='mobile' />
        <ErrorMessage name='mobile'></ErrorMessage>
        <Field type="text" placeholder='City' name='city'/>
        <ErrorMessage name='city'></ErrorMessage>
        <Field type="text" placeholder='State' name='state' />
        <ErrorMessage name='state'></ErrorMessage>
        <input type="file" onChange={picSelect} />
        <button id='signUpButton'  type='submit'>SignUp</button>
      </Form>
      </Formik>
       <p id='loginUrl'>Already have an Account,<span style={{color:'blue'}}><Link to='/'>Login</Link></span></p>
    </div>
    </div>
    </>
  )
}

export default Signup