import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import Pagination from '../../Components/Utility/Pagination';
import CardProductsContainer from './../../Components/Products/CardProductsContainer';
import { useParams } from 'react-router-dom';
import ViewAllProductsBrandHook from './../../hook/products/view-all-products-brand-hook';

const ProductsByBrand = () => {

    const { id } = useParams()
    const [items, pagination, onPress] = ViewAllProductsBrandHook(id)
    if (pagination)
        var pageCount = pagination
    else
        pageCount = 0
    return (
        <div style={{ minHeight: '670px' }}>
            <Container>
                <Row className='d-flex flex-row'>
                    <Col sm="12" >
                        <CardProductsContainer products={items} title="" btnTitle="" />
                    </Col>
                </Row>
                <Pagination pageCount={pageCount} onPress={onPress} />
            </Container>
        </div>
    )

}

export default ProductsByBrand