import React from "react";
import {motion} from 'framer-motion'
import styles from "./GuestInput.module.css";
import { FaMinus, FaPlus } from "react-icons/fa";

const GuestInput = ({ variant, min, max, set, current }) => {
    const handlePlus = async (e) => {
        e.preventDefault();
		await set(Math.min(max, current + 1));
	};

    const handleMinus = async (e) => {
        e.preventDefault();
		await set(Math.max(min || 0, current - 1));
	};

	return (
		<motion.div
			className={styles.GuestInput}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<h1 className={styles.Title}>
				{variant === "children" ? "Children" : "Adults"}
			</h1>

			<p className={styles.SubTitle}>
				{variant === "children" ? "Ages 2-12" : "Ages 13 and above"}
			</p>

			<div className={styles.ButtonContainer}>
				<button className={styles.CountButton} onClick={handleMinus}>
					<FaMinus />
				</button>
				<input
					className={styles.CountDisplay}
					type="number"
					min={min}
					max={max}
					placeholder="0"
					value={current}
					readOnly
				/>
				<button className={styles.CountButton} onClick={handlePlus}>
					<FaPlus />
				</button>
			</div>
		</motion.div>
	);
};

export default GuestInput;
