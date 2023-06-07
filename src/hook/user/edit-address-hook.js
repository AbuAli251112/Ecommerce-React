import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneUserAddress, editUserAddress } from "./../../redux/actions/userAddressesAction";
import { useNavigate } from "react-router-dom";
import notify from "../useNotification";

const EditAddressHook = (id) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [loadingEdit, setLoadingEdit] = useState(true);
  const [alias, setAlias] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");
  const [res, setRes] = useState([]);


  const onChangeAlias = (event) => {
    event.persist();
    setAlias(event.target.value);
  };

  const onChangeDetalis = (event) => {
    event.persist();
    setDetails(event.target.value);
  };

  const onChangePhone = (event) => {
    event.persist();
    setPhone(event.target.value);
  };

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      dispatch(getOneUserAddress(id));
      setLoading(false);
    };
    get();
  }, []);

  const resAddress = useSelector(
    (state) => state.userAddressesReducer.oneAddress
  );
  const aliasValue = resAddress.address ? resAddress.address.alias : ""
  const detailsValue = resAddress.address ? resAddress.address.details : ""
  const phoneValue = resAddress.address ? resAddress.address.phone : ""

  useEffect(() => {
    if (aliasValue) {
      setAlias(aliasValue)
    }
    if (detailsValue) {
      setDetails(detailsValue)
    }
    if (phoneValue) {
      setPhone(phoneValue)
    }
  }, [aliasValue, detailsValue, phoneValue])

  useEffect(() => {
    if (loading === false) {
      if (resAddress && resAddress.status === "success") {
        setAlias(resAddress.address.alias);
        setDetails(resAddress.address.details);
        setPhone(resAddress.address.phone);
      }
    }
  }, [loading]);

  const handelEdit = async () => {
    setLoadingEdit(true);
    dispatch(
      editUserAddress(id, {
        alias,
        details,
        phone,
      })
    );
    setLoadingEdit(false);
  };

  const resEdit = useSelector(
    (state) => state.userAddressesReducer.editAddress
  );
  
  useEffect(() => {
    if (loadingEdit === false) {
      if (res && res.status === 200) {
        notify("تمت عملية التعديل بنجاح", "success");
        setTimeout(() => {
          navigate("/user/addresses");
        }, 1000);
      } else if (res && res.status) {
        notify("فشل فى عملية التعديل", "error");
      }
    }
  }, [loadingEdit, loading, res]);

  useEffect(() => {
    if (resEdit && resEdit.status) {
      setRes(resEdit);
    }
  }, [resEdit]);

  return [
    handelEdit,
    alias,
    details,
    phone,
    onChangeAlias,
    onChangeDetalis,
    onChangePhone,
  ];
};

export default EditAddressHook;
