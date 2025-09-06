import { useState } from "react";
import styles from "./PetShop.module.css";

function PetShop({ pet, onPurchase, onClose }) {
	const [selectedItem, setSelectedItem] = useState(null);

	const shopItems = [
		{
			id: "health_potion",
			name: "Health Potion",
			description: "Restore pet health +30",
			price: 50,
			icon: "💊",
			effect: { health: 30 }
		},
		{
			id: "super_food",
			name: "Super Food",
			description: "Restore health +20, gain experience +10",
			price: 80,
			icon: "🍖",
			effect: { health: 20, exp: 10 }
		},
		{
			id: "toy",
			name: "Toy",
			description: "Improve pet mood",
			price: 30,
			icon: "🎾",
			effect: { mood: "happy" }
		},
		{
			id: "collar",
			name: "Collar",
			description: "Increase pet level +1",
			price: 100,
			icon: "🔗",
			effect: { level: 1 }
		}
	];

	const handlePurchase = (item) => {
		if (pet.coins >= item.price) {
			onPurchase(item);
			setSelectedItem(null);
		}
	};

	const canAfford = (price) => pet.coins >= price;

	return (
		<div className={styles.shopOverlay}>
			<div className={styles.shopModal}>
				<div className={styles.shopHeader}>
					<h2>Pet Shop</h2>
					<button className={styles.closeButton} onClick={onClose}>×</button>
				</div>
				
				<div className={styles.coinDisplay}>
					<span className={styles.coinIcon}>🪙</span>
					<span className={styles.coinValue}>{pet.coins}</span>
				</div>
				
				<div className={styles.shopItems}>
					{shopItems.map((item) => (
						<div 
							key={item.id}
							className={`${styles.shopItem} ${!canAfford(item.price) ? styles.disabled : ''}`}
							onClick={() => canAfford(item.price) && handlePurchase(item)}
						>
							<div className={styles.itemIcon}>{item.icon}</div>
							<div className={styles.itemInfo}>
								<div className={styles.itemName}>{item.name}</div>
								<div className={styles.itemDescription}>{item.description}</div>
								<div className={styles.itemPrice}>
									<span className={styles.priceIcon}>🪙</span>
									<span className={styles.priceValue}>{item.price}</span>
								</div>
							</div>
							{!canAfford(item.price) && (
								<div className={styles.insufficientFunds}>
									Insufficient coins
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default PetShop; 