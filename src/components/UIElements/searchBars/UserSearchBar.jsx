import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { debounce } from "lodash";
import axios from "axios";
import { getUsers } from "../../../services/user.services";
import { useCredentials } from "../../../context/CrendentialsContext";

function SearchBar({ className, setSelectedUser }) {
  const [suggestions, setSuggestions] = useState([]);
  const [credentials, setCredentials] = useCredentials();
  const fetchSuggestions = async (searchTerm) => {
    try {
      let response = await getUsers({q: searchTerm})
      
      let filteredUsers = response.data.data.users.filter((user)=>user._id != credentials.user._id)
      
      setSuggestions(filteredUsers);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 200);

  const handleOnSearch = (string, results) => {
    // Use the debounced version of our API call function
    debouncedFetchSuggestions(string);
  };

  const handleOnSelect = (item) => {
    setSelectedUser(item);
  };

  return (
    <div className={className}>
      <ReactSearchAutocomplete
        items={suggestions}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        className="outline-none" 
      />
    </div>
  );
}

export default SearchBar;
