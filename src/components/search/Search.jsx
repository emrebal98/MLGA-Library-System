import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Filter } from "../";
import "./search.css";

function Search({ activeSet, setItems, titles, onSearch }) {
	const [search, setSearch] = useState();
	const [focus, setFocus] = useState(false);
	const [filter, setFilter] = useState(titles[1]);

	function handleFocus(e) {
		setFocus(true);
	}

	function handleOutFocus(e) {
		setFocus(false);
	}

	function handleChange(e) {
		setSearch(e.target.value);
	}

	function handleSearch(e) {
		setItems(
			activeSet.filter((f) =>
				f[filter].toLowerCase().includes(search.toLowerCase())
			)
		);

		onSearch(search);
	}

	return (
		<div className={focus ? "search__field focus" : "search__field"}>
			<div className="searh__field__icon">
				<AiOutlineSearch />
			</div>
			<input
				onFocus={handleFocus}
				onBlur={handleOutFocus}
				type="text"
				name="text"
				placeholder="Search..."
				value={search}
				onChange={handleChange}
				onKeyUp={handleSearch}
			/>
			<Filter
				setItems={setItems}
				titles={titles}
				setFilter={setFilter}
				filter={filter}
			/>
		</div>
	);
}

export default Search;
