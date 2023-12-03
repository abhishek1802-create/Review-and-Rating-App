import React, { useEffect } from 'react';
import './AddNewReview.css';
import {Formik , Form , Field , ErrorMessage} from 'formik';
import * as yup from 'yup';
import {useNavigate , useParams} from 'react-router-dom';
import {useSelector , useDispatch} from 'react-redux';
import {ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearState, companyReview } from '../../features/review/reviewSlice';
import Navbar_new from '../../navbar/Navbar_new';

function AddNewReview() {

  const navigate = useNavigate();
  const param = useParams();
  const {id} = param;
  let user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  const review = useSelector((state)=>state.review);
  const {review_msg,error} = review;

  useEffect(()=>{
    if(review_msg){
      toast.success(review_msg,{position:toast.POSITION.TOP_CENTER});
      setTimeout(()=>{
        dispatch(clearState());
        navigate(`/companyDetail/${id}`);
      },1000);
    }
    if(error){
      toast.error(error,{position:toast.POSITION.TOP_CENTER})
    }
  },[review_msg,error]);

  const initialState ={
     subject : '',
     review : '',
     rating : ''
  }

  const validationSchema = yup.object().shape({
     subject : yup.string().required("Enter the Subject"),
     review : yup.string().required("Enter the review"),
     rating : yup.string().required("Enter the rating ")
  });

  const handleSubmit = async (values)=>{
         console.log("values are : ",values);
         let obj = {
          ...values,
          company_id : id,
          user_id : user._id,
         }
         dispatch(companyReview(obj));
  }

  return (
    <>
    <ToastContainer/>
    <Navbar_new/>
    <div className='addReview'>
        <div className="box">
            <h1>Add Review</h1>
            <Formik initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            <Form>
                <label htmlFor="#">Subject</label>
                <Field type="text" name='subject'/>
                <ErrorMessage name='subject'></ErrorMessage>
                <label htmlFor="#">Enter Your Review</label>
                <Field  name='review' id='reviewField' as='textarea' rows='5'></Field>
                <ErrorMessage name='review'></ErrorMessage>
                <label htmlFor="#">Ratings</label>
                <Field type="text"  name='rating'/>
                <ErrorMessage name='rating'></ErrorMessage>
                <button id='saveButton' type='submit'>Add Review</button>
            </Form>
            </Formik>
        </div>
    </div>
    </>
  )
}

export default AddNewReview