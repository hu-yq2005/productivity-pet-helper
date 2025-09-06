import { useRef, useState } from "react";
import { useAppReducer } from "../AppContext.jsx";
import styles from "./AddItemForm.module.css";

// Form to populate todo items
function AddItemForm() {
	const dispatch = useAppReducer();
	let inputRef = useRef();
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [showTimeLimit, setShowTimeLimit] = useState(false);

	function addItem(e) {
		const totalMinutes = hours * 60 + minutes;
		const timeLimit = totalMinutes > 0 ? totalMinutes : null;
		
		const newItem = {
			text: inputRef.current.value,
			key: Date.now(),
			status: "pending",
			timeLimit: timeLimit,
			createdAt: Date.now(),
		};
		if (newItem.text.trim()) {
			dispatch({ type: "ADD_ITEM", item: newItem });
		}
		e.preventDefault();
		inputRef.current.value = "";
		setHours(0);
		setMinutes(0);
		setShowTimeLimit(false);
		inputRef.current.focus();
	}

	function handleHoursChange(e) {
		const value = parseInt(e.target.value) || 0;
		if (value >= 0 && value <= 24) {
			setHours(value);
		}
	}

	function handleMinutesChange(e) {
		const value = parseInt(e.target.value) || 0;
		if (value >= 0 && value <= 59) {
			setMinutes(value);
		}
	}

	function toggleTimeLimit() {
		setShowTimeLimit(!showTimeLimit);
		if (!showTimeLimit) {
			setHours(0);
			setMinutes(0);
		}
	}

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={addItem}>
				<input ref={inputRef} placeholder="Add new item" autoFocus />
				<button type="submit" />
			</form>
			<div className={styles.timeLimitSection}>
				<button 
					type="button" 
					className={styles.timeLimitToggle}
					onClick={toggleTimeLimit}
				>
					{showTimeLimit ? "Hide" : "Add"} Time Limit
				</button>
				{showTimeLimit && (
					<div className={styles.timeLimitInputs}>
						<div className={styles.timeInput}>
							<input
								type="number"
								min="0"
								max="24"
								value={hours}
								onChange={handleHoursChange}
								placeholder="0"
							/>
							<label>hours</label>
						</div>
						<div className={styles.timeInput}>
							<input
								type="number"
								min="0"
								max="59"
								value={minutes}
								onChange={handleMinutesChange}
								placeholder="0"
							/>
							<label>minutes</label>
						</div>
						<div className={styles.timeLimitInfo}>
							Max: 24 hours
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default AddItemForm;
