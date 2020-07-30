import React, { Component } from 'react';
import axios from 'axios';
import Filters from './Components/filters';
import Products from './Components/products';
import Pagination from './Components/Pagination';
import ProductModal from './Components/modal';
import './css/App.css';
import './css/pagination.css';
import Navbar from './navbar/navbar';

const PAGE_LIMIT = 16;
const ASC = 1;
const DESC = -1;
const BASE_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      allProducts: [],
      filteredByProductType: [], //the Products as a result only of the product_type filter (not the brand)
      filteredProducts: [], //the products we will show along all pages (filtered by product_type and other filters)
      typeFilter: "All",
      brandFilter: "All",
      currentProducts: [], // the products shown in current page
      currentBrands: undefined,
      currentPage: null,
      totalPages: null,
      totalProducts: null,
      modalIsOpen: false,
      modalTitle: null,
      modalImg: null,
      modalPrice: null,
      modalRating: null,
      modalDescription: null
    };
    //Dropdowns
    this.handleSelect = this.handleSelect.bind(this);
    //Pagination
    this.onPageChanged = this.onPageChanged.bind(this);
    //Modal
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    //Aux methods
    this.titleCase = this.titleCase.bind(this);
    this.sort = this.sort.bind(this);
  }

  // HTTP service - is sometimes down the service
  // componentDidMount() {
  //   axios.get(BASE_URL)
  //     .then(
  //       (result) => {
  //         //remove loader
  //         document.getElementById("loader").style.display = "none";
  //         //console.log("result: " + JSON.stringify(result.data, null, 4));

  //         let sorted = this.sort(result.data, "rating", DESC);

  //         this.setState({
  //           isLoaded: true,
  //           allProducts: sorted,
  //           filteredProducts: sorted,
  //           filteredByProductType: sorted,
  //           currentProducts: sorted,
  //           totalProducts: result.data.length
  //         });
  //       },
  //       (error) => {
  //         console.log("error: " + error);
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  // }

  //FOR LOCAL DEVELOPMENT - USES JSON LOCAL
  componentDidMount() {
    console.log("getting Data...");
    //All Products
    var millisecondsToWait = 1000;
    setTimeout(function () {
      //simulates service fetching time
      axios.get('../json/products.json')
        .then(
          (result) => {
            document.getElementById("loader").style.display = "none";
            //console.log("result: " + JSON.stringify(result.data, null, 4));
            let sorted = this.sort(result.data, "rating", DESC);
            this.setState({
              isLoaded: true,
              allProducts: sorted,
              filteredProducts: sorted,
              filteredByProductType: sorted,
              currentProducts: sorted,
              totalProducts: result.data.length
            });
          })
        .catch(error => {
          console.log("error: " + error);
          this.setState({
            isLoaded: true,
            error
          });
        })
    }.bind(this), millisecondsToWait);
  }

  //Aux Methods
  sort = (array, attr, direction) => {
    let sorted;
    if (direction === ASC) {
      sorted = array.sort(function (a, b) {
        if (!a[attr])
          return -1;
        if (!b[attr])
          return 1;
        return a[attr] - b[attr];
      })
      return sorted;
    } else if (direction === DESC) {
      sorted = array.sort(function (a, b) {
        if (!a[attr])
          return 1;
        if (!b[attr])
          return -1;
        return b[attr] - a[attr];
      })
      return sorted;
    }
  }

  titleCase = str => {
    if (!str)
      return "";
    str = str.toLowerCase().split(/\s|_/);
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
  }

  //Pagination
  onPageChanged = data => {
    const { filteredProducts } = this.state;
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentProducts = filteredProducts.slice(offset, offset + pageLimit);
    //console.log("current products: " + currentProducts);
    this.setState({ currentPage, currentProducts, totalPages });
  };

  //Dropdown Filters
  handleSelect = (selected, filterType) => {

    let filteredData;

    if (filterType === "product_type") {

      const typeFilter = this.titleCase(selected);

      let brands = [{
        "name": "All",
        "category": "all"
      }];

      const m = new Map();

      filteredData = this.state.allProducts.filter(function (item) {
        return (selected === "all" || item[filterType] === selected);
      });
      if (filteredData) {
        for (let i = 0; i < filteredData.length; i++) {
          if (filteredData[i].brand &&
            m.get(filteredData[i].brand) === undefined) {
            m.set(filteredData[i].brand, this.titleCase(filteredData[i].brand));
            brands.push(
              {
                name: m.get(filteredData[i].brand),
                category: filteredData[i].brand
              }
            );
          }
        }
      }
      this.setState({
        typeFilter: typeFilter,
        currentBrands: brands,
        filteredByProductType: filteredData
      });

    } else if (filterType === "brand") {
      const brandFilter = this.titleCase(selected);

      filteredData = this.state.filteredByProductType.filter(function (item) {
        return (selected === "all" || item[filterType] === selected);
      });

      this.setState({ brandFilter: brandFilter });
    }
    this.setState({
      filteredProducts: filteredData,
      totalProducts: filteredData.length,
      currentPage: 1
    });
  }

  //Modal
  openModal = (title, img, price, rating, description) => {
    this.setState({
      modalIsOpen: true,
      modalTitle: title,
      modalImg: img,
      modalPrice: price,
      modalRating: rating,
      modalDescription: description
    });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  //Render
  render() {
    const {
      typeFilter,
      brandFilter,
      filteredProducts,
      currentProducts,
      currentPage,
      totalPages,
      currentBrands
      //totalProducts
    } = this.state;
    //QUESTION: Porque é que se usar o total products do state é invocado primeiro o render da pagination e se usar assim é feito isto primeiro
    const totalProducts = filteredProducts.length;
    if (totalProducts === 0) return null;
    return (
      <div className="app">
        <Navbar></Navbar>
        <Filters onSelect={this.handleSelect} typeFilter={typeFilter} brandFilter={brandFilter} brands={currentBrands} />
        <ProductModal
          modalIsOpen={this.state.modalIsOpen}
          closeModal={this.closeModal}
          title={this.state.modalTitle}
          img={this.state.modalImg}
          price={this.state.modalPrice}
          rating={this.state.modalRating}
          description={this.state.modalDescription}
        />
        <Products products={currentProducts} openModal={this.openModal} />
        <div className="pagination-container">
          <div>
            {currentPage && (
              <span className="current-page">
                Page <span className="font-weight-bold">{currentPage}</span>/{" "}
                <span className="font-weight-bold">{totalPages}</span>
              </span>
            )}
          </div>
          <div>
            <span>
              <Pagination
                style={{ float: 'right' }}
                totalRecords={totalProducts}
                pageLimit={PAGE_LIMIT}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
