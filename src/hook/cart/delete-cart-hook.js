import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import notify from "../useNotification";
import {
  clearAllCartItem,
  deleteCartItem,
  updateCartItem,
} from "./../../redux/actions/cartAction";

const DeleteCartHook = (item) => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const handleDeleteCart = async () => {
    setLoading(true);
    await dispatch(clearAllCartItem());
    setLoading(false);
  };
  const onChangeCount = (e) => {
    setItemCount(e.target.value);
  };
  useEffect(() => {
    if (item) setItemCount(item.quantity);
  }, []);
  const res = useSelector((state) => state.cartReducer.clearCart);
  useEffect(() => {
    if (loading === false) {
      if (res.length === 0) {
        notify("تم الحذف بنجاح", "success");
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      } else {
      }
    }
  }, [loading]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteItem = async () => {
    await dispatch(deleteCartItem(item._id));
    setShow(false);
    window.location.reload(false);
  };
  const handleUpdateCart = async () => {
    await dispatch(
      updateCartItem(item._id, {
        quantity: itemCount,
      })
    );
    window.location.reload(false);
  };

  return [
    handleDeleteCart,
    show,
    handleClose,
    handleShow,
    handleDeleteItem,
    itemCount,
    onChangeCount,
    handleUpdateCart,
  ];
};

export default DeleteCartHook;
