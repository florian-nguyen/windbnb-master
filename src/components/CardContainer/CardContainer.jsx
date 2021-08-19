import React from "react";

import Card from "../Card/Card";

import styles from "./CardContainer.module.css";

const CardContainer = ({ stays }) => {
	const cards = stays.map((stay) => {
		return <Card key={stay.title} data={stay} />;
	});

	return (
		<>
			<div className={styles.CardContainerHeader}>
				<h1>Stays in Finland</h1>
                <p>
                    {
                        cards.length > 0?cards.length + " results":"No results"
                    }
                </p>
			</div>

			<div className={styles.CardContainer}>
				{cards.length > 0 && cards}

				{cards.length === 0 && (
					<p>Sorry, no matches for your search criteria. Please try again.</p>
				)}
			</div>
		</>
	);
};

export default CardContainer;
