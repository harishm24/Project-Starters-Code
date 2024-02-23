import React, { useState } from "react";
import { DatePicker, Space } from "antd";
const Search = () => {
  const { RangePicker } = DatePicker;
  const [keyword, setKeyword] = useState({});
  //storing data range value
  const [value, setValue] = useState([]);

  function returnDates(date, dateString) {
    //setting date range value
    setValue([date[0], date[1]]);
    //updating keyword with date range
    updateKeyword("dateIn", dateString[0]);
    updateKeyword("dateOut", dateString[1]);
  }
  const updateKeyword = (field, value) => {
    setKeyword((prevKeyword) => ({
      ...prevKeyword,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="searchbar">
        {/* input field for dest searching */}
        <input
          className="search"
          id="search_destination"
          placeholder="Search Destination"
          type="text"
          value={keyword.city}
          onChange={(e) => updateKeyword("city", e.target.value)}
        />
        <Space direction="vertical" size={12} className="search">
          <RangePicker
            value={value}
            format="YYYY-MM-DD"
            picker="date"
            className="date_picker"
            disabledDate={(current) => {
              return current && current.isBefore(Date.now(), "day");
            }}
            onChange={returnDates}
          />
        </Space>
        {/* Input field for guest adding */}
        <input
          className="search"
          id="addguest"
          placeholder="Add guest"
          type="number"
          value={keyword.guests}
          onChange={(e) => updateKeyword("guests", e.target.value)}
        />
        {/* search icon */}
        <span class="material-symbols-outlined searchicon">search</span>
      </div>
    </>
  );
};

export default Search;
