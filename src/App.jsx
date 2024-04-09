import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'


// Components
import MainView from './Views/MainView';
import Nav from './Components/Nav';

function App() {

	return (
			<main>
				<BrowserRouter>
				<Nav />	
					<Routes>
						<Route path="/" element={<MainView />} />
					</Routes>
				</BrowserRouter>
			</main>
		);
}

export default App;
