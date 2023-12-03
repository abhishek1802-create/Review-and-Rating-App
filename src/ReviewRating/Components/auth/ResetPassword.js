import React from 'react'
import {Field,Formik,Form,ErrorMessage} from 'formik'
import * as yup from 'yup'
import {useParams , useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import {useSelector , useDispatch} from 'react-redux'
import { resetPassword } from '../../features/auth/authSlice'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function ResetPassword() {

    const initialState = {
      newPass : '',
      conPass : ''
    }

    const param = useParams();
    const {token , id} = param;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const resetState = useSelector((state) => state.user);
    const {error,message} = resetState;

    useEffect(()=>{
      if(message){
        toast.success(message, { position: toast.POSITION.TOP_CENTER });
        navigate('/');
      }
      if(error){
        toast.error(error, { position: toast.POSITION.TOP_CENTER });
      }
    })
  
    const validationSchema = yup.object().shape({
      newPass : yup.string().required('Please enter the new Password'),
      conPass : yup.string().required('please confirm the password')
    })
  
    const handleSubmit = async (values)=>{
      //console.log(values);
      let obj = {
        ...values,
        id : id,
        token : token
      };
      dispatch(resetPassword(obj));
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
          <Field type="text" name='newPass' placeholder='new Password' /><br />
          <ErrorMessage name='newPass'></ErrorMessage>
          <br /><br />
          <Field type="text" name='conPass' placeholder='confirm Password' /><br />
          <ErrorMessage name='conPass'></ErrorMessage>
          <br /><br />
          <button id='resetButton' type='submit'>Reset</button>
          </Form>
          </Formik>
        </div>
      </div>
      </>
    )

}

export default ResetPassword