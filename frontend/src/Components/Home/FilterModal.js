import React, { useEffect, useState } from "react"; // Importing React, useEffect, useState from React library
import PropTypes from "prop-types"; // Importing PropTypes for type-checking props
import "../../CSS/FilterModal.css"; // Importing CSS file for styling
import "../../CSS/Modal.css"; // Importing CSS file for modal styling
import "react-input-range/lib/css/index.css"; // Importing CSS file for input range styling
import InputRange from "react-input-range"; // Importing InputRange component for range input

// Functional component FilterModal with destructured props
const FilterModal = ({ selectedFilters, onFilterChange, onClose }) => {
  // State variables using useState hook
  const [priceRange, setPriceRange] = useState({
    min: selectedFilters.priceRange?.min || 600, // Default min price is 600 or the selected min price from props
    max: selectedFilters.priceRange?.max || 30000, // Default max price is 30000 or the selected max price from props
  });
  const [propertyType, setPropertyType] = useState(
    selectedFilters.propertyType || "" // Default property type is empty or the selected property type from props
  );
  const [roomType, setRoomType] = useState(selectedFilters.roomType || ""); // Default room type is empty or the selected room type from props
  const [amenities, setAmenities] = useState(selectedFilters.amenities || []); // Default amenities is an empty array or the selected amenities from props

  // useEffect hook to update states when selectedFilters prop changes
  useEffect(() => {
    setPriceRange({
      min: selectedFilters.priceRange?.min || 600,
      max: selectedFilters.priceRange?.max || 30000,
    });
    setPropertyType(selectedFilters.propertyType || "");
    setRoomType(selectedFilters.roomType || "");
    setAmenities(selectedFilters.amenities || []);
  }, [
    selectedFilters.priceRange,
    selectedFilters.propertyType,
    selectedFilters.roomType,
    selectedFilters.amenities,
  ]);

  // Function to handle changes in price range
  const handlePriceRangeChange = (value) => {
    setPriceRange(value); // Updates the price range state
  };

  // Function to handle changes in min price input
  const handleMinInputChange = (e) => {
    const minValue = parseInt(e.target.value, 10); // Parses input value to integer
    setPriceRange((prev) => ({ ...prev, min: minValue })); // Updates min price in price range state
  };

  // Function to handle changes in max price input
  const handleMaxInputChange = (e) => {
    const maxValue = parseInt(e.target.value, 10); // Parses input value to integer
    setPriceRange((prev) => ({ ...prev, max: maxValue })); // Updates max price in price range state
  };

  // Function to handle applying filters
  const handleFilterChange = () => {
    onFilterChange("minPrice", priceRange.min); // Calls onFilterChange callback with min price
    onFilterChange("maxPrice", priceRange.max); // Calls onFilterChange callback with max price
    onFilterChange("propertyType", propertyType); // Calls onFilterChange callback with property type
    onFilterChange("roomType", roomType); // Calls onFilterChange callback with room type
    onFilterChange("amenities", amenities); // Calls onFilterChange callback with amenities
    onClose(); // Closes the modal
  };

  // Options for property types
  const propertyTypeOptions = [
    { value: "House", label: "House", icon: "home" },
    { value: "Flat", label: "Flat", icon: "apartment" },
    { value: "Guest House", label: "Guest House", icon: "hotel" },
    { value: "Hotel", label: "Hotel", icon: "meeting_room" },
  ];

  // Options for room types
  const roomTypeOptions = [
    { value: "Entire Home", label: "Entire Room", icon: "hotel" },
    { value: "Room", label: "Room", icon: "meeting_room" },
    { value: "Anytype", label: "Any Type", icon: "apartment" },
  ];

  // Options for amenities
  const amenitiesOptions = [
    { value: "Wifi", label: "Wi-Fi", icon: "wifi" },
    { value: "Kitchen", label: "Kitchen", icon: "kitchen" },
    { value: "Ac", label: "AC", icon: "ac_unit" },
    {
      value: "Washing Machine",
      label: "Washing Machine",
      icon: "local_laundry_service",
    },
    { value: "Tv", label: "TV", icon: "tv" },
    { value: "Pool", label: "Pool", icon: "pool" },
    { value: "Free Parking", label: "Free Parking", icon: "local_parking" },
  ];

  // Function to handle clearing filters
  const handleClearFilters = () => {
    setPriceRange({ min: 600, max: 30000 }); // Resets price range
    setPropertyType(""); // Resets property type
    setRoomType(""); // Resets room type
    setAmenities([]); // Resets amenities
  };

  // Function to handle changes in amenities
  const handleAmenitiesChange = (selectedAmenity) => {
    setAmenities(
      (prevAmenities) =>
        prevAmenities.includes(selectedAmenity)
          ? prevAmenities.filter((item) => item !== selectedAmenity)
          : [...prevAmenities, selectedAmenity] // Adds or removes the selected amenity
    );
  };

  // Function to handle changes in property type
  const handlePropertyTypeChange = (selectedType) => {
    setPropertyType(
      (prevType) => (prevType === selectedType ? "" : selectedType) // Toggles property type selection
    );
  };

  // Function to handle changes in room type
  const handleRoomTypeChange = (selectedType) => {
    setRoomType(
      (prevType) => (prevType === selectedType ? "" : selectedType) // Toggles room type selection
    );
  };

  // JSX to render FilterModal component
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h4>
          Filters <hr />
        </h4>
        <button className="close-button" onClick={onClose}>
          <span>&times;</span> {/* Close button */}
        </button>

        {/* Filter sections */}
        <div className="modal-filters-container">
          <div className="filter-section">
            <label>Price Range:</label>

            <InputRange
              minValue={600}
              maxValue={30000}
              value={priceRange}
              onChange={handlePriceRangeChange} // Range input for price
            />
            <div className="range-inputs">
              <input
                type="number"
                value={priceRange.min}
                onChange={handleMinInputChange} // Input for min price
              />
              <span>-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={handleMaxInputChange} // Input for max price
              />
            </div>
          </div>

          {/* Property Type filter */}
          <div className="filter-section">
            <label>Property Type:</label>
            <div className="icon-box">
              {propertyTypeOptions.map((option) => (
                <div
                  key={option.value}
                  className={`selectable-box ${
                    propertyType === option.value ? "selected" : ""
                  }`}
                  onClick={() => handlePropertyTypeChange(option.value)} // Click event to select property type
                >
                  <span className="material-icons">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room Type filter */}
          <div className="filter-section">
            <label>Room Type:</label>
            <div className="icon-box">
              {roomTypeOptions.map((option) => (
                <div
                  key={option.value}
                  className={`selectable-box ${
                    roomType === option.value ? "selected" : ""
                  }`}
                  onClick={() => handleRoomTypeChange(option.value)} // Click event to select room type
                >
                  <span className="material-icons">{option.icon}</span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities filter */}
          <div className="filter-section">
            <label>Amenities:</label>
            <div className="amenities-checkboxes">
              {amenitiesOptions.map((option) => (
                <div key={option.value} className="amenity-checkbox">
                  {console.log(amenities.includes(option.value))}
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={amenities.includes(option.value)}
                    onChange={() => handleAmenitiesChange(option.value)} // Click event to select/deselect amenity
                  />

                  <span className="material-icons amenitieslabel">
                    {option.icon}
                  </span>
                  <span>{option.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filter action buttons */}
          <div className="filter-buttons">
            <button className="clear-button" onClick={handleClearFilters}>
              Clear
            </button>
            <button onClick={handleFilterChange}>Apply Filters</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes for type-checking props
FilterModal.propTypes = {
  selectedFilters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterModal; // Exports FilterModal component