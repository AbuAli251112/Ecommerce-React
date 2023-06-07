import { useState, useEffect, useRef } from "react";
import { getOneCategory } from "../../redux/actions/subcategoryAction";
import { getOneProduct, updateProducts } from "../../redux/actions/productsAction";
import notify from "../useNotification";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "./../../redux/actions/brandAction";

const AdminEditProductsHook = (id) => {

  const dispatch = useDispatch();
  useEffect(() => {
    const run = async () => {
      await dispatch(getOneProduct(id));
      await dispatch(getAllCategory());
      await dispatch(getAllBrand());
    };
    run();
  }, []);

  const item = useSelector((state) => state.allProducts.oneProduct);
  const category = useSelector((state) => state.allCategory.category);
  const brand = useSelector((state) => state.allBrand.brand);
  const subCat = useSelector((state) => state.subCategory.subcategory);

  const onSelect = (selectedList) => {
    setSeletedSubID(selectedList);
  };
  const onRemove = (selectedList) => {
    setSeletedSubID(selectedList);
  };

  const [options, setOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState("السعر قبل الخصم");
  const [priceAftr, setPriceAftr] = useState("السعر بعد الخصم");
  const [qty, setQty] = useState("الكمية المتاحة");
  const [CatID, setCatID] = useState("0");
  const [BrandID, SetBrandID] = useState("0");
  const [seletedSubID, setSeletedSubID] = useState([]);

  useEffect(() => {
    if (item) {
      if (item.data) {
        setProdName(item.data.title);
        setProdDescription(item.data.description);
        setPriceBefore(item.data.price);
        setPriceAftr(item.data.priceAfterDiscount);
        setQty(item.data.quantity);
        setCatID(item.data.category._id);
        SetBrandID(item.data.brand._id);
        setColors(item.data.colors);
      }
    }
  }, [item]);

  const onChangeProdName = (event) => {
    event.persist();
    setProdName(event.target.value);
  };
  const onChangeDesName = (event) => {
    event.persist();
    setProdDescription(event.target.value);
  };
  const onChangePriceBefor = (event) => {
    event.persist();
    setPriceBefore(event.target.value);
  };
  const onChangePriceAfter = (event) => {
    event.persist();
    setPriceAftr(event.target.value);
  };
  const onChangeQty = (event) => {
    event.persist();
    setQty(event.target.value);
  };
  const onChangeColor = (event) => {
    event.persist();
    setShowColor(!showColor);
  };
  const [showColor, setShowColor] = useState(false);
  const [colors, setColors] = useState([]);
  const handleChangeComplete = (color) => {
    setColors([...colors, color.hex]);
    setShowColor(!showColor);
  };
  const removeColor = (color) => {
    const newColor = colors.filter((e) => e !== color);
    setColors(newColor);
  };
  const onSeletCategory = async (e) => {
    setCatID(e.target.value);
  };
  useEffect(() => {
    if (CatID != 0) {
      const run = async () => {
        await dispatch(getOneCategory(CatID));
      };
      run();
    }
  }, [CatID]);

  useEffect(() => {
    if (subCat) {
      setOptions(subCat.data);
    }
  }, [subCat]);

  const onSeletBrand = (e) => {
    SetBrandID(e.target.value);
  };

  const handleImageSelect = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (
      CatID === 0 ||
      prodName === "" ||
      prodDescription === "" ||
      priceBefore <= 0
    ) {
      notify("من فضلك اكمل البيانات", "warn");
      return;
    }

    const formData = new FormData();
    formData.append("title", prodName);
    formData.append("description", prodDescription);
    formData.append("quantity", qty);
    formData.append("price", priceBefore);
    formData.append("priceAfterDiscount", priceAftr);
    formData.append("category", CatID);
    formData.append("brand", BrandID);
    colors.map((color) => formData.append("colors", color));
    seletedSubID.map((item) => formData.append("subcategory", item._id));
    images.forEach(image => {
      formData.append('images', image);
    })
    await dispatch(updateProducts(id, formData))
    if (product) {
      if (product.status === 200) {
        notify("تم التعديل بنجاح", "success");
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      } else {
        notify("هناك مشكله", "error");
      }
    }
  };

  const product = useSelector((state) => state.allProducts.updateProducts);

  return [
    CatID,
    BrandID,
    onChangeDesName,
    onChangeQty,
    onChangeColor,
    onChangePriceAfter,
    onChangePriceBefor,
    onChangeProdName,
    showColor,
    category,
    brand,
    priceAftr,
    images,
    setImages,
    onSelect,
    onRemove,
    options,
    handleChangeComplete,
    removeColor,
    onSeletCategory,
    handelSubmit,
    onSeletBrand,
    colors,
    priceBefore,
    qty,
    prodDescription,
    prodName,
    handleImageSelect
  ];
};

export default AdminEditProductsHook;
