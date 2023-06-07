import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import SubTitle from "../Utility/SubTitle";
import ProductCard from "./ProductCard";
import CardContainerHook from "./../../hook/products/card-container-hook";
import ViewHomeProductsHook from "./../../hook/products/view-home-products-hook";

const CardProductsContainer = ({ title, btnTitle, pathText }) => {

  const [favProd] = CardContainerHook();
  const [products, loading] = ViewHomeProductsHook();
  return (
    <Container>
      {products ? (
        <SubTitle title={title} btnTitle={btnTitle} pathText={pathText} />
      ) : null}
      <Row className="my-2 d-flex justify-content-between">
        {loading === false ? (
          products ? (
            products.data.slice(0, 4).map((item, index) => {
              return <ProductCard favProd={favProd} key={index} item={item} />;
            })
          ) : (
            <h4>لا يوجد منتجات</h4>
          )
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </Row>
    </Container>
  );
  
};

export default CardProductsContainer;
