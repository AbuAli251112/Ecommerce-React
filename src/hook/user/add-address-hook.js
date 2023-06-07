import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress } from "../../redux/actions/userAddressesAction";
import notify from "../useNotification";
import { useNavigate } from "react-router-dom";

const AddAddressHook = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alias, setAlias] = useState("");
  const [detalis, setDetalis] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState([]);

  const onChangeAlias = (event) => {
    event.persist();
    setAlias(event.target.value);
  };

  const onChangeDetalis = (event) => {
    event.persist();
    setDetalis(event.target.value);
  };

  const onChangePhone = (event) => {
    event.persist();
    setPhone(event.target.value);
  };
  const onSubmit = async () => {
    if (alias === "" || detalis === "" || phone === "") {
      notify("من فضلك اكمل البيانات", "warn");
      return;
    }
    setLoading(true);
    dispatch(
      addUserAddress({
        alias: alias,
        details: detalis,
        phone: phone,
        city: "",
        postalCode: "",
      })
    );
    setLoading(false);
  };
  const addUserAddressRes = useSelector((state) => state.userAddressesReducer.addUserAddress);

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 200) {
        notify("تمت اضافة العنوان بنجاح", "success");
        setTimeout(() => {
          navigate("/user/addresses");
        }, 1000);
      } else if (res && res.status) {
        notify("هناك مشكله فى عملية الاضافة ", "error");
      }
    }
  }, [loading, res]);
  
  useEffect(() => {
    if (addUserAddressRes && addUserAddressRes.status) {
      setRes(addUserAddressRes);
    }
  }, [addUserAddressRes]);

  return [
    alias,
    detalis,
    phone,
    onChangeAlias,
    onChangeDetalis,
    onChangePhone,
    onSubmit,
  ];
};

export default AddAddressHook;
