import React, { useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import { motion } from "framer-motion";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../config";
import { toast } from "react-toastify";
const nav__links = [
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const profileActionRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged Out");
        navigate("/home");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);
  const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  const navigateToCart = () => navigate("/cart");
  const toggleProfileActions = () => {
    profileActionRef.current.classList.toggle("active");
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <Link to="/">MANOBALDAI</Link>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, i) => (
                  <li className="nav__item" key={i}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badge">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  onClick={toggleProfileActions}
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt="image"
                />
                <div
                  className="profile__actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/register">Register</Link>
                      <Link to="/login">Login</Link>
                      <Link to="/dashboard">Dashboard</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
