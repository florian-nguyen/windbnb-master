import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import SearchBar from "../SearchBar/SearchBar";
import styles from "./Header.module.css";
import logo from "../../img/logo.svg";

const Header = ({ stays, set}) => {
	return (
		<AnimatePresence>
			<motion.div
				className={styles.Header}
			>
				<div className={styles.HeaderContainer}>
					<div className={styles.HeaderTopBar}>
						<div className={styles.LogoContainer}>
							<img src={logo} alt="logo windbnb" />
						</div>

						<SearchBar
							stays={stays}
							set={set}
						/>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Header;
