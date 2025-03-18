import React, { useState, useRef, useEffect } from "react";
import { FaPlus, FaMinus, FaChevronCircleDown } from "react-icons/fa";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import products from "../assets/data/products";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/product-details.css";
import { motion } from "framer-motion";
import ProductsList from "../components/UI/ProductsList";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const [drawers, setDrawers] = useState(3);
  const [shelves, setShelves] = useState(2);
  const [openDoors, setOpenDoors] = useState(false);
  const [openExtras, setOpenExtras] = useState(false);
  const reviewUser = useRef("");
  const reviewMsg = useRef("");
  const dispatch = useDispatch();
  const [tab, setTab] = useState("desc");
  const [rating, setRating] = useState(null);
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const [value, setValue] = useState(1000);
  const maxValue = 1000;

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const {
    imgUrl,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
    category,
  } = product;

  const relatedProducts = products.filter((item) => item.category === category);
  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewUserName = reviewUser.current.value;
    const reviewUserMsg = reviewMsg.current.value;

    const reviewObj = {
      userName: reviewUserName,
      text: reviewUserMsg,
      rating,
    };
    toast.success("Review Submitted");
  };
  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );
    toast.success("Product added successfully");
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <Helmet title={productName}>
      <section className="pt-0">
        <Container>
          <Row>
            <Col lg="6">
              <img src={imgUrl} alt={productName} />
            </Col>
            <Col lg="6">
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-line"></i>
                    </span>
                  </div>
                  <p>
                    (<span>{avgRating}</span> ratings)
                  </p>
                </div>
                <div className="product__specs">
                  <div className="spec__block">
                    <h3>Matmenys</h3>
                    <div className="slider-container">
                      <label htmlFor="slider">Plotis:</label>
                      <div className="slider-wrapper">
                        <input
                          type="range"
                          id="slider"
                          min="0"
                          max={maxValue}
                          value={value}
                          onChange={handleChange}
                          className="slider"
                          style={{
                            background: value < maxValue ? "gray" : "red",
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        className="slider-value"
                        value={value}
                        readOnly
                      />
                    </div>
                    <div className="slider-container">
                      <label htmlFor="slider">Aukštis::</label>
                      <div className="slider-wrapper">
                        <input
                          type="range"
                          id="slider"
                          min="0"
                          max={maxValue}
                          value={value}
                          onChange={handleChange}
                          className="slider"
                          style={{
                            background: value < maxValue ? "gray" : "red",
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        className="slider-value"
                        value={value}
                        readOnly
                      />
                    </div>
                    <div className="slider-container">
                      <label htmlFor="slider">Gylis:</label>
                      <div className="slider-wrapper">
                        <input
                          type="range"
                          id="slider"
                          min="0"
                          max={maxValue}
                          value={value}
                          onChange={handleChange}
                          className="slider"
                          style={{
                            background: value < maxValue ? "gray" : "red",
                          }}
                        />
                      </div>
                      <input
                        type="text"
                        className="slider-value"
                        value={value}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="spec__block">
                    <h3>Korpuso medžiaga</h3>
                    <p>Medis</p>
                  </div>

                  <div className="spec__block expandable">
                    <div
                      className="spec__header"
                      onClick={() => setOpenDoors(!openDoors)}
                    >
                      <h3>Durelių tipas</h3>
                      <FaChevronCircleDown
                        className={`arrow-icon ${openDoors ? "open" : ""}`}
                      />
                    </div>
                    {openDoors && <p>Varstomos</p>}
                  </div>

                  <div className="spec__block spec__row">
                    <h3>Stalčių kiekis</h3>
                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          setDrawers(drawers > 0 ? drawers - 1 : 0)
                        }
                      >
                        <FaMinus />
                      </button>
                      <input type="number" value={drawers} readOnly />
                      <button onClick={() => setDrawers(drawers + 1)}>
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  <div className="spec__block spec__row">
                    <h3>Lentynų kiekis</h3>
                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          setShelves(shelves > 0 ? shelves - 1 : 0)
                        }
                      >
                        <FaMinus />
                      </button>
                      <input type="number" value={shelves} readOnly />
                      <button onClick={() => setShelves(shelves + 1)}>
                        <FaPlus />
                      </button>
                    </div>
                  </div>

                  <div className="spec__block expandable">
                    <div
                      className="spec__header"
                      onClick={() => setOpenExtras(!openExtras)}
                    >
                      <h3>Papildomai</h3>
                      <FaChevronCircleDown
                        className={`arrow-icon ${openExtras ? "open" : ""}`}
                      />
                    </div>
                    {openExtras && <p>LED apšvietimas</p>}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <span className="product__price">{price} EUR</span>
                  <span>Category: {category}</span>
                </div>
                <p className="mt-3">{shortDesc}</p>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6
                  className={`${tab === "desc" ? "active__tab" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
                <h6
                  className={`${tab === "rev" ? "active__tab" : ""}`}
                  onClick={() => setTab("rev")}
                >
                  Reviews ({reviews.length})
                </h6>
              </div>
              {tab === "desc" ? (
                <div className="tab__content mt-5">
                  <p>{description}</p>
                </div>
              ) : (
                <div className="product__review mt-5">
                  <div className="review__wrapper">
                    <ul>
                      {reviews?.map((item, i) => (
                        <li key={i} className="mb-4">
                          <h6>Jhon Doe</h6>
                          <span>{item.rating} (rating)</span>
                          <p>{item.text}</p>
                        </li>
                      ))}
                    </ul>
                    <div className="review__form">
                      <h4>Leave your experience</h4>
                      <form action="" onSubmit={handleSubmit}>
                        <div className="form__group">
                          <input
                            type="text"
                            placeholder="Enter Name"
                            ref={reviewUser}
                            required
                          />
                        </div>
                        <div className="form__group d-flex align-items-center gap-5 rating__group">
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(1)}
                          >
                            1<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(2)}
                          >
                            2<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(3)}
                          >
                            3<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(4)}
                          >
                            4<i className="ri-star-s-fill"></i>
                          </motion.span>
                          <motion.span
                            whileTap={{ scale: 1.2 }}
                            onClick={() => setRating(5)}
                          >
                            5<i className="ri-star-s-fill"></i>
                          </motion.span>
                        </div>
                        <div className="form__group">
                          <textarea
                            ref={reviewMsg}
                            rows={4}
                            type="text"
                            placeholder="Review Message"
                            required
                          />
                        </div>
                        <motion.button
                          whileTap={{ scale: 1.2 }}
                          type="submit"
                          className="buy__btn"
                        >
                          Submit
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Col>
            <Col lg="12" className="mt-5">
              <h2 className="related__title">You might also like</h2>
            </Col>
            <ProductsList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetail;
