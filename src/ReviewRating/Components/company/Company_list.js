import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCompanies } from "../../features/company/companySlice";
import "./Company_list.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar_new from "../../navbar/Navbar_new";

function Company_list() {
  const companies = useSelector((state) => state.company)
  const dispatch = useDispatch();
  const { company_data , count} = companies;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCompanies());
  }, []);


  return (
    <div className="company">
     <Navbar_new/>
    <div className="keyNote">
    <p>Total Companies:{count}</p>
    <div>
        <Link className="linkDesign" to="/createCompany">
          <button className="addButton">AddCompany</button>
        </Link>
      </div>
    </div>
      {company_data &&
        company_data.map(
          ({ _id, company_logo, companyName, location, city, founded }) => {
            return (
              <Link to={`/companyDetail/${_id}`}>
                <div className="companyList">
                  <div className="leftBox">
                    <img
                      src={`http://localhost:9000${company_logo}`}
                      alt="company_logo"
                      id="companyImage"
                    ></img>
                  </div>
                  <div className="rightBox">
                    <h1>{companyName}</h1>
                    <h2>{location}</h2>
                    <h2>{city}</h2>
                    <p id='foundedDate'>{founded}</p>
                  </div>
                </div>
              </Link>
            );
          }
        )}
    </div>
  );
}

export default Company_list;
