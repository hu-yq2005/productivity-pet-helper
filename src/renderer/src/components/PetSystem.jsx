import { useState, useEffect, useRef } from "react";
import { useAppState, useAppReducer } from "../AppContext.jsx";
import PetShop from "./PetShop.jsx";
import styles from "./PetSystem.module.css";

function PetSystem() {
	const [pet, setPet] = useState(() => {
		// Load pet data from localStorage
		const savedPet = localStorage.getItem("petData");
		return savedPet ? JSON.parse(savedPet) : {
			name: "Helper",
			type: "cat",
			level: 1,
			experience: 0,
			health: 100,
			coins: 0,
			mood: "happy",
			appearance: "normal",
		};
	});

	const [showShop, setShowShop] = useState(false);
	const { items } = useAppState();
	const dispatch = useAppReducer();
	
	// Use useRef to track processed tasks, avoiding circular dependencies
	const processedTasks = useRef(new Set());

	// Save pet data to localStorage
	useEffect(() => {
		localStorage.setItem("petData", JSON.stringify(pet));
	}, [pet]);

	// Monitor task status changes - fixed version
	useEffect(() => {
		// Only check tasks with status completed or failed
		const completedTasks = items.filter(item => item.status === "completed");
		const failedTasks = items.filter(item => item.status === "failed");
		
		// Check for newly completed tasks
		const newCompleted = completedTasks.filter(task => {
			const taskKey = `${task.key}-completed`;
			return !processedTasks.current.has(taskKey);
		});
		
		if (newCompleted.length > 0) {
			const task = newCompleted[0];
			handleTaskCompleted(task);
			// Mark as processed
			processedTasks.current.add(`${task.key}-completed`);
		}
		
		// Check for newly failed tasks
		const newFailed = failedTasks.filter(task => {
			const taskKey = `${task.key}-failed`;
			return !processedTasks.current.has(taskKey);
		});
		
		if (newFailed.length > 0) {
			const task = newFailed[0];
			handleTaskFailed(task);
			// Mark as processed
			processedTasks.current.add(`${task.key}-failed`);
		}
	}, [items]); // Only depend on items, removed pet.lastTaskResult

	const handleTaskCompleted = (task) => {
		const rewards = {
			coins: 10,
			exp: 5,
			health: 0, // Don't increase health when task is completed
		};

		setPet(prevPet => {
			const newExp = prevPet.experience + rewards.exp;
			const newLevel = Math.floor(newExp / 100) + 1;
			
			return {
				...prevPet,
				coins: prevPet.coins + rewards.coins,
				experience: newExp,
				level: newLevel,
				health: prevPet.health, // Health value remains unchanged
				mood: "happy",
				appearance: "excited",
			};
		});

		// Show reward animation
		showRewardAnimation(rewards);
	};

	const handleTaskFailed = (task) => {
		const penalty = {
			health: -15,
		};

		setPet(prevPet => ({
			...prevPet,
			health: Math.max(0, prevPet.health + penalty.health),
			mood: "sad",
			appearance: "hurt",
		}));

		// Show failure animation
		showFailureAnimation();
	};

	const handlePurchase = (item) => {
		setPet(prevPet => {
			let newPet = { ...prevPet };
			
			// Deduct coins
			newPet.coins -= item.price;
			
			// Apply item effects
			if (item.effect.health) {
				newPet.health = Math.min(100, newPet.health + item.effect.health);
			}
			
			if (item.effect.exp) {
				const newExp = newPet.experience + item.effect.exp;
				newPet.experience = newExp;
				newPet.level = Math.floor(newExp / 100) + 1;
			}
			
			if (item.effect.level) {
				newPet.level += item.effect.level;
			}
			
			if (item.effect.mood) {
				newPet.mood = item.effect.mood;
			}
			
			return newPet;
		});

		// Show purchase success animation
		showPurchaseAnimation(item);
	};

	const showRewardAnimation = (rewards) => {
		const animation = document.createElement("div");
		animation.className = styles.rewardAnimation;
		animation.innerHTML = `
			<div class="${styles.coinEffect}">+${rewards.coins} 🪙</div>
			<div class="${styles.expEffect}">+${rewards.exp} ✨</div>
		`;
		document.body.appendChild(animation);
		
		setTimeout(() => {
			document.body.removeChild(animation);
		}, 2000);
	};

	const showFailureAnimation = () => {
		const animation = document.createElement("div");
		animation.className = styles.failureAnimation;
		animation.innerHTML = `
			<div class="${styles.healthEffect}">-15 ❤️</div>
		`;
		document.body.appendChild(animation);
		
		setTimeout(() => {
			document.body.removeChild(animation);
		}, 2000);
	};

	const showPurchaseAnimation = (item) => {
		const animation = document.createElement("div");
		animation.className = styles.purchaseAnimation;
		animation.innerHTML = `
			<div class="${styles.purchaseEffect}">${item.icon} ${item.name}</div>
		`;
		document.body.appendChild(animation);
		
		setTimeout(() => {
			document.body.removeChild(animation);
		}, 2000);
	};

	const getPetEmoji = () => {
		const petEmojis = {
			cat: { happy: "😸", sad: "😿", excited: "😺", tired: "😾" },
			dog: { happy: "🐕", sad: "🐕‍🦺", excited: "🐕", tired: "🐕‍🦺" },
			rabbit: { happy: "🐰", sad: "🐰", excited: "🐰", tired: "🐰" }
		};
		
		return petEmojis[pet.type]?.[pet.mood] || petEmojis.cat[pet.mood];
	};

	const getHealthColor = () => {
		if (pet.health >= 80) return "#4CAF50";
		if (pet.health >= 50) return "#FF9800";
		if (pet.health >= 20) return "#F44336";
		return "#D32F2F";
	};

	return (
		<>
			<div className={styles.petContainer}>
				<div className={`${styles.petCard} ${styles[pet.mood]}`}>
					<div className={styles.petAvatar}>
						<span className={styles.petEmoji}>{getPetEmoji()}</span>
					</div>
					
					<div className={styles.petInfo}>
						<div className={styles.petName}>{pet.name}</div>
						<div className={styles.petLevel}>Level {pet.level}</div>
						
						<div className={styles.petStats}>
							<div className={styles.healthBar}>
								<div className={styles.healthLabel}>Health</div>
								<div className={styles.healthProgress}>
									<div 
										className={styles.healthFill}
										style={{ 
											width: `${pet.health}%`,
											backgroundColor: getHealthColor()
										}}
									></div>
								</div>
								<div className={styles.healthValue}>{pet.health}/100</div>
							</div>
							
							<div className={styles.coinDisplay}>
								<span className={styles.coinIcon}>🪙</span>
								<span className={styles.coinValue}>{pet.coins}</span>
							</div>
						</div>
						
						<div className={styles.petMood}>
							Mood: {pet.mood === "happy" ? "Happy" : 
								pet.mood === "sad" ? "Sad" :
								pet.mood === "excited" ? "Excited" : "Tired"}
						</div>
						
						<button 
							className={styles.shopButton}
							onClick={() => setShowShop(true)}
						>
							Shop
						</button>
					</div>
				</div>
			</div>
			
			{showShop && (
				<PetShop 
					pet={pet}
					onPurchase={handlePurchase}
					onClose={() => setShowShop(false)}
				/>
			)}
		</>
	);
}

export default PetSystem; 