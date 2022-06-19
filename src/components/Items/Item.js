import React, { useState } from "react";
import Row from "../Row/Row";
import Column from "../Column/Column";
import search from "../../images/search.png";
import close from "../../images/close.png";
import Card from "../Card/Card";
import "./item.css";

export default function Item(props) {
  const [searchText, setSearchText] = useState("");
  const { products, filterBySearch } = props;
  return (
    <Row>
      <Column col={12}>
        <Row>
          <Column col={12}>
            <input
              className="searchBox"
              type="text"
              placeholder="Search for products..."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
            <button
              onClick={() => {
                setSearchText("");
                filterBySearch("");
              }}
              className="searchButton"
            >
              <img className="searchIcon" src={close} alt="close" />
            </button>
            <button
              onClick={() => filterBySearch(searchText)}
              className="searchButton"
            >
              <img className="searchIcon" src={search} alt="search" />
            </button>
          </Column>
        </Row>
      </Column>
      <Column col={12}>
        <Row>
          {products && products.length
            ? products.map((prod, index) => (
                <Column key={`prod_${index}`} col={4} sm={true}>
                  <Card product={prod} />
                </Column>
              ))
            : "No items found"}
        </Row>
      </Column>
    </Row>
  );
}
