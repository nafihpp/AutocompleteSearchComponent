import React from "react";
import "./SearchResults.css";

export const SearchResults = ({ searchQuery, searchProducts }) => {
    return searchQuery && searchProducts.length > 0 ? (
        <div className="search-result-container">
            {searchProducts?.map((result) => (
                <div className="search-result-box">
                    <p>{result?.title}</p>
                    <div>
                        <img
                            src={result?.thumbnail}
                            alt={result?.title}
                            width="90"
                            height="90"
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </div>
            ))}
        </div>
    ) : (
        searchQuery && (
            <p style={{ color: "#fff", fontSize: "30px" }}>
                No Search Results Found{" "}
            </p>
        )
    );
};
