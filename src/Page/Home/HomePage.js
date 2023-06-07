import React from 'react'
import HomeCategory from '../../Components/Home/HomeCategory';
import CardProductsContainer from '../../Components/Products/CardProductsContainer';
import Slider from './../../Components/Home/Silder';
import DiscountSection from './../../Components/Home/DiscountSection';
import BrandFeatured from '../../Components/Brand/BrandFeatured';

const HomePage = () => {
    
    return (
        <div className='font' style={{ minHeight: '670px' }}>
            <Slider />
            <HomeCategory />
            <CardProductsContainer title="الاكثر مبيعا" btnTitle="المزيد" pathText="/products" />
            <DiscountSection />
            <CardProductsContainer title="احدث الازياء" btnTitle="المزيد" pathText="/products" />
            <BrandFeatured title="اشهر الماركات" btnTitle="المزيد" pathText="/allBrand" />
        </div>
    )

}

export default HomePage
