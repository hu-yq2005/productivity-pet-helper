# Time Limit Feature Description

## Feature Overview
Added time limit functionality for each to-do item. Users can set time limits when creating tasks, and the system will automatically countdown and mark tasks as failed when time expires.

## Main Features

### 1. Set Time Limit
- When adding new tasks, click "Add Time Limit" button
- Can set hours (0-24) and minutes (0-59)
- Maximum time limit is 24 hours
- If no time limit is set, task will have no time restriction

### 2. Countdown Display
- For tasks with time limits, remaining time is displayed
- Format: `Xh Ym remaining`
- Updates every minute

### 3. Auto-failure Mechanism
- When time expires, task is automatically marked as "Task Failed"
- Failed tasks display red border and background
- Failed tasks move to "Failed Tasks" collapsible panel

### 4. Failed Task Handling
- Failed tasks can be restarted by clicking resume button
- Restarting resets the timer
- Failed tasks cannot be paused or completed, must be restarted first

## Interface Changes

### Add Task Form
- New "Add Time Limit" button
- Time input area (hours and minutes)
- Maximum time limit prompt

### Task Display
- Task items show remaining time
- Timed-out tasks show "Time's up!"
- Failed tasks show "Task Failed"
- Failed tasks have special visual styling

### Task List
- New "Failed Tasks" collapsible panel
- Failed tasks displayed together
- Reset function clears failed tasks

## Technical Implementation

### Data Structure
```javascript
{
  text: "Task content",
  key: timestamp,
  status: "pending|paused|completed|failed",
  timeLimit: minutes, // optional
  createdAt: creation timestamp
}
```

### State Management
- New `FAIL_ITEM` action
- Updated `useItems` hook to support failed status
- Auto-failure logic implemented in `useEffect`

### Style Updates
- Special styling for failed status
- Time limit display styling
- Responsive design remains unchanged

## Usage Examples

1. **Create Time-limited Task**
   - Enter task content
   - Click "Add Time Limit"
   - Set 2 hours 30 minutes
   - Click add button

2. **Monitor Task Progress**
   - Task shows "2h 30m remaining"
   - Time gradually decreases
   - Shows "Time's up!" when expired

3. **Handle Failed Tasks**
   - Task automatically moves to "Failed Tasks"
   - Click resume button to restart
   - Timer resets

## Notes

- Time limit is optional, no limit if not set
- Paused tasks don't countdown, resume countdown when resumed
- Failed tasks need to be restarted to continue
- Reset function clears all failed tasks
- Time precision is at minute level