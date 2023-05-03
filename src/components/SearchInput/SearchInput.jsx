import "./SearchInput.css";

export const SearchInput = ({ handleChange }) => {
    return (
        <div className="searchContainer">
            <input
                type="text"
                placeholder="Search here"
                onChange={handleChange}
            />
            <div className="searchIconContainer">
                <img src="" alt="" />
            </div>
        </div>
    );
};
