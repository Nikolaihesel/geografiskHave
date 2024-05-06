import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

// CSS modules
import Style from '../../assets/styles/components/modules/admin.module.scss';

function AdminMain() {
	const [stories, setStories] = useState([]);
	const [clickedIndex, setClickedIndex] = useState(-1);
	const [storyId, setStoryId] = useState('');

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

	const handleImageClick = (index) => {
		setClickedIndex(index === clickedIndex ? -1 : index);
		setStoryId(stories[index]);
	};
	const handleDelete = async (id) => {
		try {
			await deleteDoc(doc(db, 'stories', id));
			setStories((prevStories) =>
				prevStories.filter((story) => story.id !== id)
			);
			console.log('Document deleted successfully!');
		} catch (error) {
			console.error('Error deleting document:', error);
		}
	};

	return (
		<div>
			<h1>Admin Main</h1>
			<p>Her kan du administrere stories</p>

			<button
				className={Style.deleteButton}
				onClick={() => handleDelete(storyId.id)}>
				Delete post
			</button>

			{stories.map((story, index) => (
				<div
					onClick={() => handleImageClick(index)}
					style={{
						background: index === clickedIndex ? 'lightgrey' : 'grey',
						padding: '1em',
						borderRadius: '6px',
						margin: '1em',
					}}
					key={story.id}>
					<p>{story.title}</p>
					<NavLink to={`/updatestory/${story.id}`}>Update</NavLink>
				</div>
			))}
			{storyId && <p>{storyId.id}</p>}
		</div>
	);
}

export default AdminMain;
