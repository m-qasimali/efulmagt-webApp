
import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { debounce } from 'lodash';
import { getCompanies } from '../../../services/company.services';

function CompanySearchBar({ className, setSelectedCompany }) {

  
  const [suggestions, setSuggestions] = useState([]);


  const fetchSuggestions = async (searchTerm) => {
    try {
      let res = await getCompanies({q: searchTerm});
      
      let filteredCompanies = res.data.data.companies;
      let  adjustedCompanies = filteredCompanies.map((item)=>{return {...item, name: item.companyName}});

      
      setSuggestions(adjustedCompanies); // Update our suggestions state with the API response
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 200);

  const handleOnSearch = (string, results) => {
    // Use the debounced version of our API call function
    debouncedFetchSuggestions(string);
  };

  const handleOnSelect = (item) => {
    setSelectedCompany(item)
  };


  return (
    <div className={className}>
      <ReactSearchAutocomplete
        items={suggestions}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        resultStringKeyName="companyName"
      />
    </div>
  );
}

export default CompanySearchBar;