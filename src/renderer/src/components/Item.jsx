import { useAppReducer } from "../AppContext.jsx";
import { useState, useEffect } from "react";
import styles from "./Item.module.css";

// Individual todo item
function Item({ item }) {
	const dispatch = useAppReducer();
	let text = item.text;
	let paused = item.status === "paused";
	let completed = item.status === "completed";
	let failed = item.status === "failed";
	
	const [timeRemaining, setTimeRemaining] = useState(null);

	// Calculate remaining time and handle timeout
	useEffect(() => {
		if (item.timeLimit && item.createdAt && !completed && !failed) {
			const updateTimeRemaining = () => {
				const now = Date.now();
				const elapsed = Math.floor((now - item.createdAt) / (1000 * 60)); // minutes
				const remaining = item.timeLimit - elapsed;
				
				if (remaining <= 0) {
					setTimeRemaining("Time's up!");
					// Automatically mark as failed when time is up
					if (item.status !== "failed") {
						dispatch({ type: "FAIL_ITEM", item });
					}
				} else {
					const hours = Math.floor(remaining / 60);
					const minutes = remaining % 60;
					setTimeRemaining(`${hours}h ${minutes}m remaining`);
				}
			};

			updateTimeRemaining();
			const interval = setInterval(updateTimeRemaining, 60000); // Update every minute

			return () => clearInterval(interval);
		}
	}, [item.timeLimit, item.createdAt, completed, failed, item.status, dispatch]);

	function deleteItem() {
		dispatch({ type: "DELETE_ITEM", item });
	}

	function pauseItem() {
		const pausedItem = { ...item, status: "paused" };
		dispatch({ type: "UPDATE_ITEM", item: pausedItem });
	}

	function resumeItem() {
		const pendingItem = { ...item, status: "pending" };
		dispatch({ type: "UPDATE_ITEM", item: pendingItem });
	}

	function completeItem() {
		const completedItem = { ...item, status: "completed" };
		dispatch({ type: "UPDATE_ITEM", item: completedItem });
	}

	function retryItem() {
		const pendingItem = { 
			...item, 
			status: "pending",
			createdAt: Date.now() // Reset the timer
		};
		dispatch({ type: "UPDATE_ITEM", item: pendingItem });
	}

	const isOverdue = timeRemaining === "Time's up!";

	return (
		<div className={`${styles.item} ${isOverdue || failed ? styles.overdue : ""} ${failed ? styles.failed : ""}`} tabIndex="0">
			<div className={styles.itemContent}>
				<div className={styles.itemname}>{text}</div>
				{item.timeLimit && (
					<div className={`${styles.timeLimit} ${isOverdue || failed ? styles.overdueText : ""}`}>
						{failed ? "Task Failed" : timeRemaining}
					</div>
				)}
			</div>
			<div
				className={`${styles.buttons} ${
					completed ? styles.completedButtons : ""
				}`}
			>
				{completed && <button className={styles.empty} tabIndex="0"></button>}
				<button
					className={styles.delete}
					onClick={deleteItem}
					tabIndex="0"
				></button>
				{!paused && !completed && !failed && (
					<button
						className={styles.pause}
						onClick={pauseItem}
						tabIndex="0"
					></button>
				)}
				{(paused || completed || failed) && (
					<button
						className={styles.resume}
						onClick={failed ? retryItem : resumeItem}
						tabIndex="0"
					></button>
				)}
				{!completed && !failed && (
					<button
						className={styles.complete}
						onClick={completeItem}
						tabIndex="0"
					></button>
				)}
			</div>
		</div>
	);
}

export default Item;
