import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { SearchInput } from "./SearchInput";
import { SearchResults } from "./SearchResult";

export const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchProducts, setSearchProducts] = useState([]);

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

    useEffect(() => {
        fetchSearch();
    }, [searchQuery]);

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Fragment>
            <SearchInput search={searchQuery} handleChange={handleChange} />
            <SearchResults searchProducts={searchProducts} />
        </Fragment>
    );
};
