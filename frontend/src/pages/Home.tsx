import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "../custom-styles.css";
import { LoginDto, RegisterDto } from "../dtos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";

export interface IHomePageProps {}

interface IRegisterDto {
  name: string;
  password: string;
}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const handleLinkClick = () => {
    window.location.reload();
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!localStorage.getItem("token");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    const dto: LoginDto = { name: username, password };
    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Invalid attempt");
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setShowLoginPopup(false);
      })
      .catch((error) => {
        alert(error.message);
      });
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUsername("");
    setPassword("");
    toggleDropdown();
    navigate("/", { state: {} });
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const dto: RegisterDto = { name: username, password: password };

    fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dto),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Registration is not successful");
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setShowRegisterPopup(false);
      })
      .catch((error) => {
        alert(error.message);
      });
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handlePopup = () => {
    setShowLoginPopup(true);
  };

  const handleRegisterPopup = () => {
    setShowLoginPopup(false);
    setShowRegisterPopup(true);
  };

  const handleCloseRegisterPopup = () => {
    setShowRegisterPopup(false);
  };

  const handleCancel = () => {
    setShowLoginPopup(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const customStyle = {
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: "bold",
  };
  return (
    <div>
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs bg-white fixed-top">
            <li className="nav-item bg-white">
              <Link className="nav-link" to="/" onClick={handleLinkClick}>
                <h3
                  className="fw-bold text-dark fs-10 text-start"
                  style={{ ...customStyle, marginLeft: "100px" }}
                >
                  kimnedio
                </h3>
              </Link>
            </li>
            <div className="navbar ">
              <div className="dropdown">
                <button className="dropbtn">
                  GÜNDEM
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <div className="header">
                    <h4>GÜNDEM</h4>
                  </div>
                  <div className="row">
                    <div className="column">
                      <h5>Category 1</h5>
                      <a href="#">Link 1</a>
                      <a href="#">Link 2</a>
                    </div>
                    <div className="column">
                      <h5>Category 2</h5>
                      <a href="#">Link 1</a>
                      <a href="#">Link 2</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dropdown">
                <button className="dropbtn">
                  TEST
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <div className="header">
                    <h4>TEST</h4>
                  </div>
                  <div className="row">
                    <div className="column">
                      <h5>Category 1</h5>
                      <a href="#">Link 1</a>
                      <a href="#">Link 2</a>
                    </div>
                    <div className="column">
                      <h5>Category 2</h5>
                      <a href="#">Link 1</a>
                      <a href="#">Link 2</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown">
                <button className="dropbtn">
                  VİDEO
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <div className="header">
                    <h4>VİDEO</h4>
                  </div>
                  <div className="row">
                    <div className="column">
                      <h5>Category 1</h5>
                      <a href="#">Link 1</a>
                      <a href="#">Link 2</a>
                    </div>

                    <div className="column">
                      <h5>Category 2</h5>
                      <a href="#">Link 1</a>
                      <a href="#">Link 2</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown">
                <button className="dropbtn">
                  DİĞER HABERLER
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <div className="header">
                    <h4>DİĞER HABERLER</h4>
                  </div>
                  <div className="row">
                    <div className="column">
                      <h5>Category 1</h5>
                      <a href="/second">Diğer Haberler</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: "100px" }}>
              {isLoggedIn ? (
                <div className="custom-dropdown" style={{ marginLeft: "10px" }}>
                  <button className="dropdown-btn" onClick={toggleDropdown}>
                    <FontAwesomeIcon icon={faUser} />
                  </button>
                  {isOpen && (
                    <div className="custom-dropdown-content">
                      <div className="row">
                        <div className="column">
                          <a href="/profile">Go to the profile</a>
                          <a href="#link2">Link 2</a>
                          <button
                            className="transparent-blue-button"
                            onClick={handleLogout}
                          >
                            Log Out
                          </button>
                        </div>
                        <div className="column ml-auto"></div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button className="my-button" onClick={handlePopup}>
                    Login
                  </button>
                  {showLoginPopup && (
                    <div className="popup-container">
                      <div className="popup-title">Login</div>
                      <form className="popup-form">
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Username"
                          className="popup-input"
                        />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          className="popup-input"
                        />
                        <div className="popup-button-container">
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="popup-button cancel"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleLogin}
                            className="popup-button submit"
                          >
                            Login
                          </button>
                        </div>
                        <p>
                          {" "}
                          Don't have an account? Register from
                          <button
                            className="transparent-blue-button"
                            onClick={handleRegisterPopup}
                          >
                            here.
                          </button>{" "}
                        </p>
                      </form>
                    </div>
                  )}
                  {showRegisterPopup && (
                    <div className="popup-container">
                      <div className="popup-title">Register</div>
                      <form className="popup-form">
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Username"
                          className="popup-input"
                        />
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          className="popup-input"
                        />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm Password"
                          className="popup-input"
                        />
                        <div className="popup-button-container">
                          <button
                            type="button"
                            onClick={handleRegister}
                            className="popup-button submit"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </>
              )}
            </div>
            {isSearchOpen && (
              <div className="search-overlay">
                <div className="search-window">
                  <input type="text" placeholder="Search..." />
                  <button onClick={toggleSearch}>Close</button>
                </div>
              </div>
            )}
            <button
              onClick={toggleSearch}
              style={{
                background: "none",
                border: "none",
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </ul>
        </div>

        <div className="fixed">
          <nav className="navbar navbar-expand-md navbar-white bg-black">
            <div className="container-fluid">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-white fw-bold">Neler Oluyor?</span>
                <div
                  className="emoji-container"
                  style={{ marginLeft: "1200px" }}
                >
                  <p>&#x1F600;</p>
                  <p>&#128513;</p>
                  <p>&#128520;</p>
                  <p>&#128540;</p>
                  <p>&#129314;</p>
                  <p>&#128552;;</p>
                  <p>&#129324;;</p>
                  <p>&#129488;;</p>
                </div>
              </div>
            </div>
          </nav>

          <nav className="navbar navbar-expand-md navbar-white bg-white border">
            <div className="container-fluid">
              <div className="p-0.3 mb-0.5 text-black fw-bold ">
                Döviz Kurları
              </div>
            </div>
          </nav>
        </div>
        <div className="card-body" style={{ paddingTop: "130px" }}>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <button className="btn btn-primary" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
