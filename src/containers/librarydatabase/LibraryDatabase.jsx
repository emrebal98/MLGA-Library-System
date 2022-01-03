import React, { useState } from "react";
import "./librarydatabase.css";

function LibraryDatabase() {
  const allItems = [
    { name: "Alfreds Futterkiste", country: "Germany" },
    { name: "zxc Futterkiste", country: "Germany" },
    { name: "fdsfds Futterkiste", country: "Germany" },
  ];
  const [items, setItems] = useState(allItems);
  const [searchText, setSearchText] = useState();

  function handleSearch() {   
    setItems(allItems.filter((f) => f.name.includes(searchText)));
  }

  return (
    <div className="LibraryDatabase">
      <h2>My Customers</h2>

      <input
        type="text"
        id="myInput"
        onKeyUp={handleSearch}
        placeholder="Search..."
        onChange={(e) => setSearchText(e.target.value)}
      />

      <table id="myTable">
        <tr class="header">
          <th>Name</th>
          <th>Country</th>
        </tr>

        {items.map((item) => (
          <tr>
            <td>{item.name}</td>
            <td>{item.country}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default LibraryDatabase;
