import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../../redux/actions/productsAction';

const ViewHomeProductsHook = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts())
    }, [dispatch])
    const products = useSelector((state) => state.allProducts.allProducts)
    const loading = useSelector((state) => state.allProducts.loading)
    return [products, loading];

}

export default ViewHomeProductsHook