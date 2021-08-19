import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import CardContainer from "./components/CardContainer/CardContainer";
import Footer from "./components/Footer/Footer";

import styles from "./App.module.css";

import stays from "./data/stays.json";

const App = () => {
	const [searchValues, setSearchValues] = useState({});
	const [displayedStays, setDisplayedStays] = useState([...stays]);

	useEffect(() => {
		if (!searchValues) {
			setDisplayedStays([...stays]);
			return;
		}

		let filteredStays = [...stays];

		if (searchValues.location && searchValues.location.city && searchValues.location.country) {

			console.log(searchValues.location)
			
			filteredStays = filteredStays.filter(
				(stay) =>
					stay.city.toLowerCase() ===
						searchValues.location.city.toLowerCase() &&
					stay.country.toLowerCase() ===
						searchValues.location.country.toLowerCase(),
			);

		}

		if (searchValues.adults || searchValues.children) {

			const guestNumber =
				(searchValues.adults || 0) + (searchValues.children || 0);
			console.log(guestNumber);

			filteredStays = filteredStays.filter(
				(stay) => stay.maxGuests >= guestNumber,
			);

		}

		setDisplayedStays(filteredStays);

	}, [searchValues]);

	return (
		<div id={styles.App}>
			<Header stays={stays} set={setSearchValues} />
			<CardContainer stays={displayedStays} />
			<Footer />
		</div>
	);
};

export default App;
