import { useEffect, useState } from "react";
import { createSubCategory } from "../../redux/actions/subcategoryAction";
import { useSelector, useDispatch } from "react-redux";
import notify from "../useNotification";
import { getAllCategory } from "../../redux/actions/categoryAction";

const AddSubcategoryhook = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    if (!navigator.onLine) {
      notify("هناك مشكله فى الاتصال بالانترنت", "warn");
      return;
    }
    dispatch(getAllCategory());
  }, [dispatch]);

  const [id, setID] = useState("0");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const category = useSelector((state) => state.allCategory.category);
  const subcategory = useSelector((state) => state.subCategory.subcategory);

  const handelChange = (e) => {
    setID(e.target.value);
  };

  const onChangeName = (e) => {
    e.persist();
    setName(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!navigator.onLine) {
      notify("هناك مشكله فى الاتصال بالانترنت", "warn");
      return;
    }
    if (id === "0") {
      notify("من فضلك اختر تصنيف رئيسي", "warn");
      return;
    }
    if (name === "") {
      notify("من فضلك ادخل اسم التصنيف", "warn");
      return;
    }

    setLoading(true);
    await dispatch(
      createSubCategory({
        name,
        category: id,
      })
    );
    setLoading(false);
  };
  
  useEffect(() => {
    if (loading === false) {
      setName("");
      setID("0");
      if (subcategory.status === 201) {
        notify("تمت الاضافة بنجاح", "success");
      } else if (
        subcategory === "Error Error: Request failed with status code 400"
      ) {
        notify("هذا الاسم مكرر من فضلك اختر اسم اخر", "warn");
      } else {
        notify("هناك مشكله فى عملية الاضافة", "warn");
      }
      setLoading(true);
    }
  }, [loading, subcategory]);

  return [
    id,
    name,
    loading,
    category,
    subcategory,
    handelChange,
    handelSubmit,
    onChangeName,
  ];
};

export default AddSubcategoryhook;
