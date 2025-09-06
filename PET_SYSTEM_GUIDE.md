# 🐾 Pet System User Guide

## System Overview

The pet system adds fun and motivation to your to-do app. Each user has a dedicated pet that reacts to your task completion, receiving rewards or penalties.

## 🎯 Core Features

### 1. Pet Attributes
- **Name**: Customizable pet name
- **Level**: Increased by completing tasks
- **Health**: 0-100, affects pet status
- **Coins**: Earned from completed tasks, used to buy items
- **Mood**: Changes based on task results
- **Experience**: Accumulates to increase level

### 2. Reward Mechanism

#### Task Completion Rewards
- **Basic Rewards**: +10 coins, +5 experience
- **Time Limit Rewards**: Tasks with time limits get extra +5 health
- **Consecutive Completion**: Extra rewards for consecutive task completions

#### Task Failure Penalties
- **Health Deduction**: -15 health
- **Mood Impact**: Pet becomes sad

### 3. Pet Status

#### Mood States
- **😸 Happy**: When tasks are completed
- **😿 Sad**: When tasks fail
- **😺 Excited**: When completing tasks consecutively
- **😾 Tired**: When health is low

#### Health Impact
- **100-80**: Normal status, pet is active
- **79-50**: Slightly tired, movements are slower
- **49-20**: Obviously tired, movements are sluggish
- **19-0**: Severely tired, needs rest

## 🛒 Pet Shop

### Available Items

1. **💊 Health Potion** (50 coins)
   - Restores health +30
   - Suitable for pets with low health

2. **🍖 Super Food** (80 coins)
   - Restores health +20
   - Increases experience +10
   - Best value item

3. **🎾 Toy** (30 coins)
   - Improves pet mood
   - Makes pet happy

4. **🔗 Collar** (100 coins)
   - Increases pet level +1
   - Quick level up option

### Purchase Strategy
- **Beginner**: Prioritize health potions to maintain pet health
- **Intermediate**: Buy super food to balance health and experience
- **Advanced**: Buy collars for quick level ups

## 🎨 Visual Effects

### Animation Effects
- **Reward Animation**: Coins and experience float upward
- **Failure Animation**: Health deduction shake effect
- **Purchase Animation**: Item purchase success confirmation
- **Mood Animation**: Pet expression changes accordingly

### Interface Design
- **Pet Card**: Fixed display in top-right corner
- **Health Bar**: Color changes based on health value
- **Coin Display**: Highlighted in gold
- **Shop Modal**: Full-screen overlay design

## 📱 How to Use

### 1. Check Pet Status
- Pet information displayed in top-right corner
- Real-time display of health, coins, level
- Click pet to view detailed information

### 2. Complete Tasks
- Normal task completion earns rewards
- Tasks with time limits get extra rewards
- Failed tasks deduct health

### 3. Purchase Items
- Click "Shop" button to open store
- Select needed items
- Confirm purchase to apply effects

### 4. Manage Pet
- Regularly check pet health
- Timely purchase recovery items
- Pay attention to pet mood changes

## 🔧 Technical Features

### Data Persistence
- Pet data saved in localStorage
- Data preserved after app restart
- Supports multi-device sync (manual export required)

### Responsive Design
- Desktop: Fixed display in top-right corner
- Mobile: Centered display at top
- Adaptive to different screen sizes

### Performance Optimization
- Animations use CSS3 hardware acceleration
- State updates minimize re-renders
- Memory usage optimization

## 🎮 Gamification Elements

### Level System
- Gain 1 level every 100 experience points
- Higher levels mean stronger pet abilities
- Level affects reward multipliers

### Achievement System
- Consecutive task completions
- Reaching specific levels
- Purchasing specific items

### Collection System
- Different pet types
- Various decorative items
- Special effect items

## 💡 Usage Tips

### Beginner Guide
1. Complete a few simple tasks to familiarize with the system
2. Accumulate initial coins to buy health potions
3. Keep pet health above 80

### Intermediate Tips
1. Prioritize tasks with time limits
2. Reasonably allocate coins for purchases
3. Pay attention to pet mood changes

### Advanced Strategy
1. Create task completion plans
2. Optimize coin usage efficiency
3. Pursue high-level pets

## 🐛 FAQ

### Q: What to do when pet health is 0?
A: Buy health potions or super food to restore health.

### Q: What to do when not enough coins to buy items?
A: Complete more tasks to earn coins, or wait for next task completion.

### Q: What's the use of pet level?
A: Higher levels mean more rewards from completed tasks.

### Q: Can I change pet type?
A: Currently supports cat, dog, and rabbit types, can be changed in settings.

## 🚀 Future Plans

### Upcoming Features
- More pet types
- Pet customization system
- Social features
- Achievement system
- Leaderboard

### User Feedback
- Welcome suggestions and feedback
- We'll continuously improve based on user feedback
- Regular updates with new features

---

**Enjoy completing tasks with your pet!** 🎉