import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement(document.getElementById('root'));

class ProductModal extends React.Component {
    render() {
        const description = (this.props.description && this.props.description.length > 400) ? (this.props.description.substring(0, 399) + "...") : this.props.description;
        return (
            <div>
                <Modal
                    isOpen={this.props.modalIsOpen}
                    onRequestClose={this.props.closeModal}
                    className="modal-product"
                    overlayClassName="overlay"
                    contentLabel="Example Modal"
                >

                    <h2 className="modal-title">{this.props.title}</h2>
                    <img className="modal-img" src={this.props.img} alt="product"/>
                    <div className="modal-line">
                        <h5>Price: </h5>
                        <div className="modal-price">$ {this.props.price}</div>
                    </div>
                    <div className="modal-line">
                        <h5>Rating: </h5>
                        <div className="modal-rating">{this.props.rating}</div>
                    </div>
                    <div className="modal-description">{description}</div>
                </Modal>
            </div>
        );
    }
}

export default ProductModal;
