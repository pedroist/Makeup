import React, { Component } from 'react';
import axios from 'axios';
import Dropdown from './dropdown';

class Filters extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        brands: [],
        types: [],
      }
    }
  
    componentDidMount() {
      //Products Type List
      axios.get('../json/productTypeList.json')
      .then(
        (result) => {
          //console.log("result: " + JSON.stringify(result.data, null, 4));
          this.setState({
            types: result.data,
          });
      })
      .catch(error => {
        console.log("error: " + error);
        this.setState({
          isLoaded: true,
          error
        });
      })
      //Brand List
      axios.get('../json/brandList.json')
      .then(
        (result) => {
          //console.log("result: " + JSON.stringify(result.data, null, 4));
          this.setState({
            brands: result.data
          });
      })
      .catch(error => {
        console.log("error: " + error);
        this.setState({
          isLoaded: true,
          error
        });
      })
    }
  
    render () {
      const types = this.state.types;
      const brands = this.props.brands || this.state.brands;

      return(
        <div className="filter-section row">
          <div className="col-12 col-md-6 col-lg-6 text-center">
            <span className="dropdown-label">Product Type: </span>
            <Dropdown list={types} type="product_type" selected={this.props.typeFilter} onSelect={this.props.onSelect}/>
          </div>  
          <div className="col-12 col-md-6 col-lg-6 text-center">
            <span className="dropdown-label">Brand: </span>
            <Dropdown list={brands} type="brand" selected={this.props.brandFilter} onSelect={this.props.onSelect}/>
          </div>
        </div>    
      );
    }
  }

  export default Filters;