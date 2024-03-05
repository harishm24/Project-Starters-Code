import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProperties } from "../../Store/Property/property-action";
import { propertyAction } from "../../Store/Property/property-slice";

const Card = ({ id, image, name, address, price }) => {
  return (
    <figure className="property">
      <Link to={`/propertylist/${id}`}>
        <img src={image} alt="Propertyimg" />
      </Link>
      <h4>{name}</h4>
      <figcaption>
        <main className="propertydetails">
          <h5>{name}</h5>

          <h6>
            <span className="material-symbols-outlined houseicon">
              home_pin
            </span>
            {address}
          </h6>
          <p>
            <span className="price"> ₹{price}</span> per night
          </p>
        </main>
      </figcaption>
    </figure>
  );
};

const PropertyList = () => {
  // State variables for current page and properties
  const [currentPage, setCurrentPage] = useState({ page: 1 });
  // Selecting properties and totalProperties from Redux store state
  const { properties, totalProperties } = useSelector(
    (state) => state.properties
  );
  // Calculating last page for pagination
  const lastpage = Math.ceil(totalProperties / 12);
  // Getting dispatch function from useDispatch hook
  const dispatch = useDispatch();

  // Effect hook to fetch properties when currentPage changes
  useEffect(() => {
    // Function to fetch properties based on current page
    const fetchProperties = async (page) => {
      // Dispatching updateSearchParams action to update page
      dispatch(propertyAction.updateSearchParams(page));
      // Dispatching getAllProperties action to fetch properties
      dispatch(getAllProperties());
    };

    // Fetching properties for current page
    fetchProperties(currentPage);
  }, [currentPage, dispatch]); // Dependency array

  return (
    <>
      {/* Rendering properties if available, else displaying a message */}
      {properties.length === 0 ? (
        <p className="not_found">"Property not found...."</p>
      ) : (
        <div className={"propertylist"}>
          {/* Mapping through properties to render individual cards */}
          {properties.map((property) => (
            <Card
              key={property._id}
              id={property._id}
              image={property.images[0].url}
              name={property.propertyName}
              address={`${property.address.city}, ${property.address.state}, ${property.address.pincode}`}
              price={property.price}
            />
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <div className="pagination">
        {/* Previous button */}
        <button
          className="previous_btn"
          onClick={() =>
            setCurrentPage((prev) => ({
              page: prev.page - 1,
            }))
          }
          disabled={currentPage.page === 1} // Disabling if on the first page
        >
          <span class="material-symbols-outlined">arrow_back_ios_new</span>
          {/* Previous */}
        </button>
        {/* Next button */}
        <button
          className="next_btn"
          onClick={() =>
            setCurrentPage((prev) => ({
              page: prev.page + 1,
            }))
          }
          disabled={properties.length < 12 || currentPage.page === lastpage} // Disabling if on the last page or if properties fetched are less than 12
        >
          <span class="material-symbols-outlined">arrow_forward_ios</span>
          {/* Next */}
        </button>
      </div>
    </>
  );
};

export default PropertyList;