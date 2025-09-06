import TodoDate from "./components/TodoDate.jsx";
import ItemList from "./components/ItemList.jsx";
import PetSystem from "./components/PetSystem.jsx";
import { AppStateProvider } from "./AppContext.jsx";

function App() {
	return (
		<AppStateProvider>
			<PetSystem />
			<TodoDate />
			<ItemList />
		</AppStateProvider>
	);
}

export default App;
