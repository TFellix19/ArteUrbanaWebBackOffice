import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

export function Menu(props) {

    const location = useLocation(); 
    const [url, setUrl] = useState(null);
    useEffect(() => {
      setUrl(location.pathname);
    }, [location]);

    return (
        <nav style={{width: '268px'}} className="navbar-nav d-flex flex-column flex-shrink-0 p-3 bg-body vh-100 col-lg-2 col-3 sticky-top">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto p-3 text-decoration-none" >
                <img className="w-100 mx-auto d-block"
                    src="../assets/Logo.png"
                    alt="Logótipo"
                />
            </a>
            <ul className="nav nav-pills flex-column mb-auto mt-3 ">
                <li className="nav-item">
                    <NavLink
                        to="/Dashboard"
                        className={"nav-link link-dark d-flex align-items-center " + (url === "/Dashboard" ? " active" : "")}
                    >
                        <img className="me-2" src="../assets/ico-dashboard.svg" alt="icon" />
                        Dashboard
                    </NavLink>
                </li>
                <hr />
                <li className="nav-item">
                    <NavLink
                        to="/Website"
                        className={"nav-link link-dark d-flex align-items-center " + (url === "/Website" ? " active" : "")}
                    >
                        <img className="me-2" src="../assets/ico-webs.svg" alt="icon" />
                       Website
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/Artistas"
                        className={"nav-link link-dark d-flex align-items-center " + (url === "/Artistas" ? " active" : "")}
                    >
                        <img className="me-2" src="../assets/ico-card-artistas.svg" alt="icon" />
                        Artistas
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/Murais"
                        className={"nav-link link-dark d-flex align-items-center " + (url === "/Murais" ? " active" : "")}
                    >
                        <img className="me-2" src="../assets/ico-card-murais.svg" alt="icon" />
                        Murais
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/Comentarios"
                        className={"nav-link link-dark d-flex align-items-center " + (url === "/Comentarios" ? " active" : "")}
                    >
                        <img className="me-2" src="../assets/ico-comentario.svg" alt="icon" />
                        Comentarios
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink
                        to="/Eventos"
                        className={"nav-link link-dark d-flex align-items-center " + (url === "/Eventos" ? " active" : "")}
                    >
                        <img className="me-2" src="../assets/ico-card-eventos.svg" alt="icon" />
                        Eventos
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Menu
