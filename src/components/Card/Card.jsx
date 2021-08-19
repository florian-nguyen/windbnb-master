import React from 'react';

import styles from './Card.module.css';

const Card = (props) => {

    const { title, photo, superHost, type, rating } = props.data;

    return (
        <div className={styles.Card}>
            <div className={styles.ImageContainer}>
                <img className={styles.CardImage} src={photo} alt={"picture of" + title.toLowerCase()} />
            </div>

            <div className={styles.CardTags}>
                <div className={styles.CardDetails}>
                    {
                        superHost ?
                            (
                                <div className={styles.CardSuperhost}>
                                    Super Host
                                </div>
                            ) :
                            (
                                ""
                            )

                    }
                    <div className={styles.ClassType}>{type}</div>
                </div>

                <div className={styles.CardRating}>
                    <div>
                        <span className="material-icons-round">
                            star
                        </span>
                    </div>
                    <div>{rating.toFixed(2)}</div>
                </div>
            </div>
            <div className={styles.CardTitle}>
                <p>
                    {title}
                </p>
            </div>

        </div>
    );
};

export default Card;
