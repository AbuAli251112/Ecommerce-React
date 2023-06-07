import React, { useState } from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import LeftButton from './LeftButton';
import RightButton from './RightButton';
import { useParams } from 'react-router-dom';
import ViewProductsDetailsHook from '../../hook/products/view-products-details-hook';

const ProductGallery = () => {

    const { id } = useParams();
    const [, images] = ViewProductsDetailsHook(id);
    const [index, setIndex] = useState(Math.floor(images.length / 2));
    return (
        <div className="product-gallary-card d-flex justfiy-content-center align-items-center pt-2 position-relative">
            <img style={{ width: "100%", height: "100%", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }} src={images[index].original} alt='product' crossOrigin='anonymous' />
            <RightButton index={index} setIndex={setIndex} length={images.length} />
            <LeftButton index={index} setIndex={setIndex} />
        </div>
    )

}

export default ProductGallery
