import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

// Components
import MainView from './Views/MainView';
import Nav from './Components/Nav';
import MapView from './Views/MapView';
import FetchTest from './Views/FetchTest';
import GetTest from './Views/GetTest';
import AuthTest from './Views/AuthTest';
import UpdateTest from './Views/UpdateTest';

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
					<Route
						path='fetchtest'
						element={<FetchTest />}
					/>
					<Route
						path='gettest'
						element={<GetTest />}
					/>
					<Route
						path='authTest'
						element={<AuthTest />}
					/>
					<Route
						path='updateTest'
						element={<UpdateTest />}
					/>
				</Routes>
			</BrowserRouter>
		</main>
	);
}

export default App;
