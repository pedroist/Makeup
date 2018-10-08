import React from 'react';
import PropTypes from "prop-types";
import urlPropType from 'url-prop-type';

const Card = (props) => {
    return (
      <div onClick={() => props.openModal(props.name, props.api_featured_image, props.price, props.rating, props.description)}
        className="card grow-shadow col-12 col-md-6 col-lg-3"> 
        <img className="card-img" src={props.api_featured_image} alt="product"/>
        <div className="card-info">
          <div className="card-name">
           {props.name}
          </div>
          <div className="card-brand">
           {props.brand}
          </div>
          <div className="card-line">
            <h6>Price: </h6>
            <div className="card-price">$ {props.price}</div>
          </div>
          <div className="card-line">
            <h6>Rating: </h6>
            <div className="card-rating">{props.rating}</div>
          </div>
        </div>
      </div>
    );
  };


const Products = (props) => {
    return(
        <div className="products-panel">
            <div className="row">
                {props.products.map(card => <Card key={card.id} openModal={props.openModal} {...card}/>)}
            </div>
        </div>
    );
}

Card.propTypes = {
    api_featured_image: urlPropType.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string,
    price: PropTypes.string,
    rating: PropTypes.number
  };

export default Products;