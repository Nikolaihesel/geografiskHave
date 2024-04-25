import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { db } from '../../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

function AdminMain() {
	const [stories, setStories] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const querySnapshot = await getDocs(collection(db, 'stories'));
				const fetchedStories = [];
				querySnapshot.forEach((doc) => {
					fetchedStories.push({ id: doc.id, ...doc.data() });
				});
				setStories(fetchedStories);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1>Admin Main</h1>
			<p>Her kan du administrere stories</p>

			{stories.map((story) => (
				<div key={story.id}>
					<p>{story.title}</p>
					<NavLink to={`/updatestory/${story.id}`}>Update</NavLink>
					{/* NavLink to update route with selected story ID */}
				</div>
			))}
		</div>
	);
}

export default AdminMain;
