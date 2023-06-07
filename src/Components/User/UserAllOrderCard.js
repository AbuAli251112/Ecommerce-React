import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const UserAllOrderCard = ({ item }) => {
    
    return (
        <div>
            <Row className="d-flex mb-2">
                <Col xs="3" md="2" className="d-flex justify-content-start">
                    <Link to={`/products/${item.product._id}`} style={{ textDecoration: 'none' }}>
                        <img width="93px" height="120px" src={`http://127.0.0.1:8001/${item.product.imageCover}`} alt="" crossOrigin='anonymous' />
                    </Link>
                </Col>
                <Col xs="8" md="6">
                    <div className="d-inline pt-2 cat-title">
                        {item.product.title || ''}
                    </div>
                    <div className="d-inline pt-2 cat-rate me-2">{item.product.ratingsAverage ?
                        item.product.ratingsAverage : 0}</div>
                    <div className="rate-count d-inline p-1 pt-2">({`${item.product.ratingsQuantity || 0} تقييم`})</div>
                    <div className="mt-3 d-flex">
                        <div className="cat-text mt-1  d-inline">الكميه</div>
                        <input
                            value={item.quantity}
                            className="mx-2 "
                            type="number"
                            style={{ width: "40px", height: "30px" }}
                        />
                        <div
                            className="color  d-inline"
                            style={{ backgroundColor: item.color }}></div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserAllOrderCard
