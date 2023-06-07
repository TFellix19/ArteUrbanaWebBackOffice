import React from "react";
import { Link } from "react-router-dom";
export function Topnav(props) {

  const{role}= props;

  return (
    <div
      className="navbar d-flex w-100 navbar-expand-lg bg-white sticky-top"
      style={{ height: "88px" }}
    >
      <div className="container px-5">
        <a className="navbar-brand" href="#">
          {role}
        </a>
        <div className="justify-content-end" id="navbarNav">
          <ul className="nav d-inline-flex">
            <li className="nav-item">
              <Link to='/' className="nav-link" type="button">
                <img src="./assets/ico-leave.svg" alt="saida" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Topnav;

