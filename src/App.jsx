import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import MainView from './Views/MainView';
import Nav from './Components/Nav';
import MapView from './Views/MapView';
import Admin from './Views/admin/Admin';
import AddStory from './Views/admin/childComponents/AddStory';
import UpdateStory from './Views/admin/childComponents/UpdateStory';
import AdminMain from './Views/admin/AdminMain';
import Auth from '@/Components/auth/Auth';
import { useAuth } from '@/Context/AuthContext';

// tests

import MapTest from '@/Views/MapTest';

function App() {
	const { user } = useAuth();
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
						path='maptest'
						element={<MapTest />}
					/>
					<Route
						path='/map/:storyId'
						element={<MapView />}
					/>

					<Route
						path='/'
						element={!user ? <Auth /> : <Admin />}>
						<Route
							path='/addstory'
							element={<AddStory />}
						/>
						<Route
							path='/updatestory/:id'
							element={<UpdateStory />}
						/>
						<Route
							path='/admin'
							element={<AdminMain />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</main>
	);
}

export default App;
