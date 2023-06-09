import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToWishList,
  removeProductToWishList,
} from "./../../redux/actions/wishListAction";
import notify from "../useNotification";
import favoff from "../../images/fav-off.png";
import favon from "../../images/fav-on.png";

const ProductCardHook = (item, favProd) => {

  const dispatch = useDispatch();
  const [favImg, setFavImg] = useState(favoff);
  let Fav = favProd.some((fitem) => fitem === item._id);
  const [loadingAdd, setLoadingAdd] = useState(true);
  const [loadingRemove, setLoadingRemove] = useState(true);
  const [isFav, setIsFav] = useState(Fav);
  useEffect(() => {
    setIsFav(favProd.some((fitem) => fitem === item._id));
  }, [favProd, item._id]);
  const handleFav = () => {
    if (isFav) {
      removeToWishListData();
    } else {
      addToWishListData();
    }
  };
  useEffect(() => {
    if (isFav) {
      setFavImg(favon);
    } else {
      setFavImg(favoff);
    }
  }, [isFav]);
  const resAdd = useSelector((state) => state.addToWishListReducer.addWishList);
  const resRemove = useSelector(
    (state) => state.addToWishListReducer.removeWishList
  );
  const addToWishListData = async () => {
    setIsFav(true);
    setLoadingAdd(true);
    await dispatch(
      addProductToWishList({
        productId: item._id,
      })
    );
    setLoadingAdd(false);
  };
  const removeToWishListData = async () => {
    setIsFav(false);
    setLoadingRemove(true);
    await dispatch(removeProductToWishList(item._id));
    setLoadingRemove(false);
  };
  useEffect(() => {
    if (loadingAdd === false) {
      if (resAdd && resAdd.status === 200) {
        notify("تمت اضافة المنتج للمفضلة بنجاح", "success");
      } else if (resAdd && resAdd.status === 401) {
        notify("انتا غير مسجل", "error");
      }
    }
  }, [loadingAdd]);
  useEffect(() => {
    if (loadingRemove === false) {
      if (resRemove && resRemove.status === "success") {
        notify("تمت حذف المنتج من المفضلة بنجاح", "warn");
      } else if (resAdd && resAdd.status === 401) {
        notify("انتا غير مسجل", "error");
      }
    }
  }, [loadingRemove]);
  return [handleFav, favImg];

};

export default ProductCardHook;
