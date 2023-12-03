import React from 'react'
import './CompanyDetails.css'
import {Link, useParams} from 'react-router-dom'
import { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import { getCompanyDetails } from '../../features/company/companySlice';
import Navbar_new from '../../navbar/Navbar_new'

function CompanyDetails() {
  
  const params = useParams();
  const {id} = params;
  const dispatch = useDispatch();
  const companyData = useSelector((state)=>state.company);
  const {company_details} = companyData;
  const {companyDetails,comments} = company_details;
  const {companyName,company_logo,city,founded,location,_id} = {...companyDetails};

  useEffect(()=>{
     dispatch(getCompanyDetails(id));
  },[])

  return (
    <>
    <Navbar_new/>
      <div className='companyDetail'>   
      <div className="details">
      <div className="leftBox">
      <img src={`http://localhost:9000${company_logo}`} alt="companyImage" style={{width:'200px' , borderRadius:'8px'}} />
      </div>
      <div className="rightBox">
         <h1>{companyName}</h1>
         <p className='foundedDate'>{founded}</p>
         <p>{city}</p>
         <p>{location}</p>
     </div>
     <div className="addReviewBox">
     <Link to={`/addCompanyReview/${_id}`}><button id='addReviewButton'>Add Review</button></Link>
     </div>
      </div>
      <div className="review">
      <h2 id='reviewHead'>-User reviews-</h2>
      {
        comments && comments.map((value)=>{
          return(
           <>
          <div className="reviews">
          <div className="leftBox">
          <img id='userProfile' style={{width:'100px', height:'100px'}} src={`http://localhost:9000${value.user_id.profilepic}`} alt='profilePic'/>
          </div>
          <div className="rightBox">
          <h2> {value.user_id.name}</h2>
          <p> {value.review}</p>
          <p> {value.rating}</p>
          <p className='foundedDate'> {value.createdAt.slice(0,10)}</p>
          </div>
          </div>
          <div className="line"></div>
          </>
          )
        })
      }
      </div>
    </div>
    </>
  )
}

export default CompanyDetails