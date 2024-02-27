import React, { useState } from "react"; // Importing React and useState hook from React library
import FilterModal from "./FilterModal"; // Importing FilterModal component

// Functional component Filter
const Filter = () => {
  // State variables using useState hook
  const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling modal visibility
  const [selectedFilters, setSelectedFilters] = useState({}); // State for storing selected filters

  // Function to handle opening the modal
  const handleShowAllPhotos = () => {
    setIsModalOpen(true); // Sets isModalOpen to true to open the modal
  };

  console.log(isModalOpen); // Logging the state of isModalOpen

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Sets isModalOpen to false to close the modal
  };

  // Function to handle changes in filters
  const handleFilterChange = (filterName, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value, // Updates the selected filters with the new value
    }));
  };

  // JSX to render Filter component
  return (
    <>
      <span
        className="material-symbols-outlined filter"
        onClick={handleShowAllPhotos} // Click event to open the modal
      >
        tune {/* Icon for filtering */}
      </span>
      {isModalOpen && ( // Renders FilterModal component if isModalOpen is true
        <FilterModal
          selectedFilters={selectedFilters} // Passes selected filters to the modal
          onFilterChange={handleFilterChange} // Passes filter change handler function to the modal
          onClose={handleCloseModal} // Passes close modal handler function to the modal
        />
      )}
    </>
  );
};

export default Filter; // Exports Filter component
