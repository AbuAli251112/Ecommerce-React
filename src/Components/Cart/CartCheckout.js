import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import DeleteCartHook from "./../../hook/cart/delete-cart-hook";
import { ToastContainer } from "react-toastify";
import ApplyCouponHook from "./../../hook/cart/apply-coupon-hook";

const CartCheckout = ({ totalCartPrice, cartItems, totalCartPriceAfterDiscount, couponNameRes }) => {

  const [handleDeleteCart] = DeleteCartHook();
  const [couponName, onChangeCoupon, handleSubmitCoupon, handleCheckout] = ApplyCouponHook(cartItems);
  useEffect(() => {
    if (couponNameRes) {
      onChangeCoupon(couponNameRes);
    }
  }, [couponNameRes, onChangeCoupon]);
  return (
    <Row className="my-1 d-flex justify-content-center cart-checkout pt-3">
      <Col xs="12" className="d-flex  flex-column  ">
        <div className="d-flex  ">
          <input
            value={couponName}
            onChange={(e) => onChangeCoupon(e.target.value)}
            className="coupon-input d-inline text-center "
            placeholder="كود الخصم"
          />
          <button onClick={handleSubmitCoupon} className="coupon-btn d-inline ">
            تطبيق
          </button>
        </div>
        <div className="product-price d-inline w-100 my-3 border">
          {totalCartPriceAfterDiscount >= 1
            ? `${totalCartPrice} جنيه ... بعد الخصم ${totalCartPriceAfterDiscount} `
            : `${totalCartPrice} جنيه`}
        </div>
        <button
          className="product-cart-add  d-inline "
          onClick={handleCheckout}
        >
          {" "}
          اتمام الشراء
        </button>
        <button
          onClick={handleDeleteCart}
          className="product-cart-add w-100 px-2 my-1"
        >
          {" "}
          مسح العربة
        </button>
      </Col>
      <ToastContainer />
    </Row>
  );
};

export default CartCheckout;
