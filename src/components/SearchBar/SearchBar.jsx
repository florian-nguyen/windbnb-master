import React, { useState, useEffect } from "react";
import { useClickOutside } from "react-click-outside-hook";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import GuestInput from "../GuestInput/GuestInput";

import styles from "./SearchBar.module.css";

const SearchBar = ({ stays, set }) => {
	const [locations, setLocations] = useState([]);
	const [adults, setAdults] = useState(0);
	const [children, setChildren] = useState(0);

	const [incompleteSearchText, setSearchText] = useState("");
	const [selectedLocation, setSelectedLocation] = useState({});

	const [showLocationResults, setShowLocationResults] = useState(false);
	const [showGuestInputs, setShowGuestInputs] = useState(false);

	const [locationResultsRef] = useClickOutside();
	const [guestInputsRef] = useClickOutside();
	const [searchBarRef, isClickedOutsideSearchBar] = useClickOutside();

	const displayAdultsAndChildren = () => {
		let displayedText =
			adults === 0 ? "" : "" + adults + " adult" + (adults > 1 ? "s" : "");

		displayedText += adults !== 0 && children !== 0 ? ", " : "";

		displayedText +=
			children === 0
				? ""
				: "" + children + " child" + (children > 1 ? "ren" : "");

		return displayedText;
	};

	const handleClickOutsideResultsAndInputs = async (e) => {
		if (showLocationResults && !locationResultsRef.current.contains(e.target)) {
			setShowLocationResults(false);
		}

		if (showGuestInputs && !guestInputsRef.current.contains(e.target)) {
			setShowGuestInputs(false);
		}
	};

	const handleClickOnLocationResult = async (e, locationItem) => {
		e.preventDefault();
		setSelectedLocation({
			...locationItem,
		});
		setLocations([]);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		const values = {
			adults: adults,
			children: children,
			location: selectedLocation,
		};

		set(values);
	};

	const filterLocations = (e, props) => {
		let matches = [];
		let locations = [];

		if (e.target.value.length > 0) {
			locations = stays.map((loc) => ({
				...loc,
			}));

			locations = locations.filter(
				(loc) =>
					loc.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
					loc.country.toLowerCase().includes(e.target.value.toLowerCase()),
			);
		}

		for (const l of locations) {
			if (!matches.some((m) => m.city === l.city && m.country === l.country)) {
				matches.push(l);
			}
		}

		if (matches.length > 0) {
			setLocations(matches);
		} else {
			setLocations([]);
		}
	};

	useEffect(() => {
		if (isClickedOutsideSearchBar) {
			setShowLocationResults(false);
			setShowGuestInputs(false);
			setSearchText("");
			
	}
	}, [
		selectedLocation,
		incompleteSearchText,
		adults,
		children,
		isClickedOutsideSearchBar
	]);

	return (
		<form
			action=""
			ref={searchBarRef}
			onClick={handleClickOutsideResultsAndInputs}
			onSubmit={handleFormSubmit}
		>
			<div className={styles.FormContainer}>
				<div className={styles.FormShadow}></div>

				<div className={styles.InputField}>
					<input
						name="location"
						id={styles.location}
						type="text"
						required
						placeholder="Enter a city or country..."
						autoComplete="off"
						onChange={(e) => {
							filterLocations(e);
							setSearchText(e.target.value);
							if (e.target.value.trim(" ").length > 0)
								setShowLocationResults(true);
						}}
						value={
							selectedLocation.country && selectedLocation.city
								? selectedLocation.city + ", " + selectedLocation.country
								: incompleteSearchText.trim(" ").length > 0
								? incompleteSearchText
								: ""
						}
						onClick={(e) => {
							e.target.value = "";
							setSelectedLocation({});
							setLocations([]);
							setShowLocationResults(true);
							setSearchText("");
						}}
					/>

					<label htmlFor="location">Location</label>
				</div>

				<div className={styles.InputField}>
					<input
						id={styles.guests}
						type="text"
						name="guests"
						required
						placeholder="Add guests"
						autoComplete="off"
						readOnly
						value={displayAdultsAndChildren()}
						onClick={() => setShowGuestInputs(true)}
					/>
					<label htmlFor="guests">Guests</label>
				</div>

				<button
					id={styles.SearchButtonDesktop}
				>
					<span className="material-icons">search</span>
				</button>

				<div
					key={"location"}
					id={styles.LocationResults}
					ref={locationResultsRef}
					className={
						showLocationResults && locations.length > 0
							? styles.visible
							: styles.hidden
					}
				>
					<AnimatePresence>
						{showLocationResults && locations.length > 0
							? locations.map((location, index) => (
									<motion.button
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										key={index}
										className={styles.SearchItem}
										onClick={(e) => handleClickOnLocationResult(e, location)}
									>
										<span className="material-icons" color="red">
											location_on
										</span>
										<p>{location.city + ", " + location.country} </p>
									</motion.button>
							  ))
							: ""}
					</AnimatePresence>
				</div>

				<div
					id={styles.GuestPanel}
					ref={guestInputsRef}
					key={"guests"}
					className={showGuestInputs ? styles.visible : styles.hidden}
				>
					<AnimatePresence>
						{showGuestInputs && (
							<>
								<GuestInput
									key={1}
									variant="adult"
									set={setAdults}
									current={adults}
									min={0}
									max={10}
								/>
								<GuestInput
									key={2}
									variant="children"
									min={0}
									max={10}
									current={children}
									set={setChildren}
								/>
							</>
						)}
					</AnimatePresence>
				</div>

				<button
					id={styles.SearchButtonMobile}
					className={classNames(styles.visible)}
				>
					<span className="material-icons">search</span>
					<div className={styles.SearchButtonText}>Search</div>
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
