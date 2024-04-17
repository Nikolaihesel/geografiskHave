import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

// Components
import MainView from './Views/MainView';
import Nav from './Components/Nav';
import MapView from './Views/MapView';

function App() {
	return (
		<main>
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route
						path='/'
						element={<MainView />}
					/>
					<Route
						path='map'
						element={<MapView />}
					/>
				</Routes>
			</BrowserRouter>
		</main>
	);
}

export default App;
