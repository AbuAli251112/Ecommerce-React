import React from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import mobile from '../../images/mobile.png'
import deleteIcon from '../../images/delete.png'
import DeleteCartHook from '../../hook/cart/delete-cart-hook'

const CartItem = ({ item }) => {

  const [ , show, handleClose, handleShow, handleDeleteCart, itemCount, onChangeCount, handleUpdateCart] = DeleteCartHook(item)
  return (
    <Col xs="12" className="cart-item-body my-2 d-flex px-2">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header >
          <Modal.Title> <div className='font'>تاكيد الحذف</div></Modal.Title>
        </Modal.Header>
        <Modal.Body><div className='font'>هل انت متاكد من حذف المنتج من العربة</div></Modal.Body>
        <Modal.Footer>
          <Button className='font' variant="success" onClick={handleClose}>
            تراجع
          </Button>
          <Button className='font' variant="dark" onClick={handleDeleteCart}>
            حذف
          </Button>
        </Modal.Footer>
      </Modal>
      <img width="160px" height="197px" src={item.product ? `http://127.0.0.1:8001/${item.product.imageCover}` : mobile} alt="" crossOrigin='anonymous' />
      <div className="d-flex flex-column w-100">
        <Row className="mx-2">
          <Col sm="12" className="d-flex flex-row justify-content-between">
            <div className="d-inline pt-2 cat-text">{item.product.category.name || ""}</div>
            <div onClick={handleShow} className="d-flex pt-2 " style={{ cursor: "pointer" }}>
              <img src={deleteIcon} alt="" width="20px" height="24px" />
              <div className="cat-text d-inline me-2">ازالة</div>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2 mx-2">
          <Col sm="12" className=" d-flex flex-row justify-content-start">
            <div className="d-inline pt-2 cat-title">
              {item.product.title || ""}
            </div>
            <div className="d-inline pt-2 cat-rate me-2">{item.product.ratingsAverage || 0}</div>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="mt-2 mx-3">
            <div className="cat-text d-inline">الماركة :</div>
            <div className="barnd-text d-inline mx-1">{item.product.brand ? item.product.brand.name : ""} </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12" className="mt-2 mx-3 d-flex">
            {
              item.color === "" ? null : (<div
                className="color ms-2 border"
                style={{ backgroundColor: `${item.color}` }}></div>)
            }
          </Col>
        </Row>
        <Row className="justify-content-between mx-2">
          <Col sm="12" className=" d-flex flex-row justify-content-between align-items-center mx-3">
            <div className="d-inline pt-2 d-flex">
              <div className="cat-text mt-2  d-inline">الكمية</div>
              <input
                value={itemCount}
                onChange={onChangeCount}
                className="mx-2 text-center"
                type="number"
                style={{ width: "60px", height: "40px" }}
              />
              <Button onClick={handleUpdateCart} className='btn btn-dark' >تطبيق</Button>
            </div>
            <div className="d-inline pt-2 barnd-text">{item.price || 0} جنية</div>
          </Col>
        </Row>
      </div>
    </Col>
  )

}

export default CartItem
