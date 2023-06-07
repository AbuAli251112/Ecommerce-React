import { useState, useEffect } from "react";
import { getOneCategory } from "../../redux/actions/subcategoryAction";
import { createProduct } from "../../redux/actions/productsAction";
import notify from "../useNotification";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../redux/actions/categoryAction";
import { getAllBrand } from "./../../redux/actions/brandAction";

const AdminAddProductsHook = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    const getCategoriesAndBrands = async () => {
      await dispatch(getAllCategory());
      await dispatch(getAllBrand());
    }
    getCategoriesAndBrands();
  }, [dispatch]);
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

  const [images, setImages] = useState({});
  const [prodName, setProdName] = useState("");
  const [prodDescription, setProdDescription] = useState("");
  const [priceBefore, setPriceBefore] = useState("السعر قبل الخصم");
  const [priceAftr, setPriceAftr] = useState("السعر بعد الخصم");
  const [qty, setQty] = useState("الكمية المتاحة");
  const [CatID, setCatID] = useState("");
  const [BrandID, SetBrandID] = useState("");
  const [seletedSubID, setSeletedSubID] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageCover, setSelectedImageCover] = useState({});

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

  const handelChangeComplete = (color) => {
    setColors([...colors, color.hex]);
    setShowColor(!showColor);
  };
  const removeColor = (color) => {
    const newColor = colors.filter((e) => e !== color);
    setColors(newColor);
  };

  const onSeletCategory = async (e) => {
    if (e.target.value !== 0) {
      await dispatch(getOneCategory(e.target.value));
    }
    setCatID(e.target.value);
  };

  useEffect(() => {
    if (CatID !== 0) {
      if (subCat.data) {
        setOptions(subCat.data);
      }
    } else setOptions([]);
  }, [CatID]);

  const onSeletBrand = (e) => {
    SetBrandID(e.target.value);
  };

  const handleImagesSelect = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
  }

  const handleImageCoverSelect = (event) => {
    setSelectedImageCover(event.target.files[0]);
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (
      CatID === 0 ||
      prodName === "" ||
      prodDescription === "" ||
      images.length <= 0 ||
      priceBefore <= 0
    ) {
      notify("من فضلك اكمل البيانات", "warn");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", prodName);
    formData.append("description", prodDescription);
    formData.append("quantity", qty);
    formData.append("price", priceBefore);
    formData.append("priceAfterDiscount", priceAftr);
    formData.append("category", CatID);
    formData.append("brand", BrandID);
    colors.map((color) => formData.append("colors", color));
    formData.append("imageCover", selectedImageCover);
    seletedSubID.map((item) => formData.append("subcategory", item._id));
    images.forEach(image => {
      formData.append('images', image);
    })
    await dispatch(createProduct(formData));
    setLoading(false);

  };

  const product = useSelector((state) => state.allProducts.products);

  useEffect(() => {
    if (loading === false) {
      setColors([]);
      setImages([]);
      setProdName("");
      setProdDescription("");
      setPriceBefore("السعر قبل الخصم");
      setPriceAftr("السعر بعد الخصم");
      setQty("الكمية المتاحة");
      SetBrandID(0);
      setSeletedSubID([]);
      setTimeout(() => setLoading(true), 1500);
      if (product) {
        if (product.status === 201) {
          notify("تم الاضافة بنجاح", "success");
        } else {
          notify("هناك مشكله", "error");
        }
      }
    }
  }, [loading]);

  return [
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
    handelChangeComplete,
    removeColor,
    onSeletCategory,
    handelSubmit,
    onSeletBrand,
    colors,
    priceBefore,
    qty,
    prodDescription,
    prodName,
    handleImagesSelect,
    handleImageCoverSelect
  ];
};

export default AdminAddProductsHook;
