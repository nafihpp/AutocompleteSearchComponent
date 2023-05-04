import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./Search.css";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResult";

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchProducts, setSearchProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [toggle, setToggle] = useState(true); //by default filtered api

    useEffect(() => {
        //clientside Filtering
        if (toggle === false) {
            console.log("toggle is false");
            setSearchProducts([]);
            let searchedProducts = allProducts.filter((products) =>
                products.title.includes(searchQuery)
            );
            setSearchProducts(searchedProducts);
        }
        //debouncing
        let timeOut = setTimeout(() => {
            //filtering using api request
            fetchSearch();
        }, 1000);
        return () => {
            clearTimeout(timeOut);
        };
    }, [searchQuery]);

    //client side filtering
    useEffect(() => {
        //Client side filtering
        if (toggle === false) {
            fetchAllProducts();
            console.log("it is happeing now that fetching of all products");
        }
    }, [toggle]);

    //all products fetching function
    const fetchAllProducts = async () => {
        try {
            const response = await axios.get("https://dummyjson.com/products");
            setAllProducts(response?.data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    //api filtering function
    const fetchSearch = async () => {
        try {
            const response = await axios.get(
                "https://dummyjson.com/products/search",
                {
                    params: {
                        q: searchQuery,
                    },
                }
            );
            setSearchProducts(response?.data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const closeSearch = () => {
        setSearchQuery("");
    };

    const toggleSearch = () => {
        setToggle(!toggle);
        setSearchQuery("");
    };

    return (
        <div className="search-container">
            <div>
                <button onClick={toggleSearch}>
                    {toggle ? "API Searching" : "ClientSide filtering"}
                </button>
            </div>
            <div className="search-heading">
                <h1>
                    <span className="search-icon">
                        <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </span>
                    Search your movie here
                </h1>
            </div>
            <SearchInput
                searchQuery={searchQuery}
                handleChange={handleChange}
                closeSearch={closeSearch}
            />
            <SearchResults
                searchProducts={searchProducts}
                searchQuery={searchQuery}
            />
        </div>
    );
};
