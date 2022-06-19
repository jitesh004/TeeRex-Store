/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProdcutResponseToStore } from "../../redux/actions/products.action";
import Filter from "../Filters/Filter";
import Row from "../Row/Row";
import Column from "../Column/Column";
import Item from "../Items/Item";
import filter from "../../images/filter.png";
import "./products.css";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const [filteredProductsArray, setFilteredProductsArray] = useState(products);
  const [searchedText, setSearchedText] = useState();
  const [searchedProductsArray, setSearchedProductsArray] = useState();
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!products.length) {
      fetch(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch(saveProdcutResponseToStore(data));
          setFilteredProductsArray(data);
        });
    }
  });

  const getTrueFilterValues = (filters) => {
    const mainObj = {};

    filters.forEach((obj) => {
      const arr = [];
      obj.options.forEach((keyObj) => {
        if (keyObj.value) {
          if (obj.type === "Price") {
            arr.push({ from: keyObj.from, to: keyObj.to });
          } else {
            arr.push(keyObj.key);
          }
        }
      });
      Object.assign(mainObj, { [obj.type.toLocaleLowerCase()]: arr });
    });

    return mainObj;
  };

  const filterArray = (filters) => {
    const trueFilteredValues = getTrueFilterValues(filters);
    console.log(trueFilteredValues);
    let noFilters = true;
    const filterKeys = Object.keys(trueFilteredValues);
    filterKeys.forEach((filterKey) => {
      if (trueFilteredValues[filterKey].length) {
        noFilters = false;
      }
    });

    let filteredProducts;

    if (!noFilters) {
      filteredProducts = products.filter((prod) => {
        const filterColor = trueFilteredValues.color.length
          ? trueFilteredValues.color.includes(prod.color)
          : true;
        const filterGender = trueFilteredValues.gender.length
          ? trueFilteredValues.gender.includes(prod.gender)
          : true;
        const filterType = trueFilteredValues.type.length
          ? trueFilteredValues.type.includes(prod.type)
          : true;
        const filterPrice = trueFilteredValues.price.length
          ? prod.price >= trueFilteredValues.price[0].from &&
            prod.price <=
              trueFilteredValues.price[trueFilteredValues.price.length - 1].to
            ? true
            : false
          : true;

        let product;
        if (filterColor && filterGender && filterType && filterPrice) {
          product = prod;
        }

        if (product) {
          return product;
        }
      });
    } else {
      filteredProducts = products;
    }
    console.log(filteredProducts);
    setFilteredProductsArray(filteredProducts);
    filterBySearch(filteredProducts, searchedText);
  };

  const filterBySearch = (arr, searchText) => {
    setSearchedText(searchText);
    if (searchText) {
      const results = [];

      for (var i = 0; i < arr.length; i++) {
        for (let key in arr[i]) {
          if (
            arr[i][key] &&
            arr[i][key].length &&
            arr[i][key]
              .toLocaleLowerCase()
              .indexOf(searchText.toLocaleLowerCase()) !== -1
          ) {
            results.push(arr[i]);
            break;
          }
        }
      }
      setSearchedProductsArray(results);
    } else {
      setSearchedProductsArray(undefined);
    }
  };

  return (
    <Row>
      <Column col={3} sm={true}>
        <span className="filterIcon">
          <img
            src={filter}
            alt="filter"
            className="filterIcon"
            onClick={() => setShowFilters(!showFilters)}
          />
          Filters
        </span>
        <div className={`filterBox ${showFilters ? "filter-sm" : ""}`}>
          <Filter filterArray={(filters) => filterArray(filters)} />
        </div>
      </Column>
      <Column col={9} sm={true}>
        <Item
          filterBySearch={(searchText) =>
            filterBySearch(filteredProductsArray, searchText)
          }
          products={searchedProductsArray || filteredProductsArray}
        />
      </Column>
    </Row>
  );
}
