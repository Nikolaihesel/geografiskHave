import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { useAuth } from '@/Context/AuthContext.jsx';

function Auth() {
	const navigate = useNavigate();
	const { user, setUser, isLoggedIn, setIsLoggedIn } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [succes, setSucces] = useState('');

	const handleSignIn = async () => {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				setUser(user);
				setIsLoggedIn(true);
				setSucces('User signed in');
				navigate('/admin/');
				console.log('User signed in');
			})

			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error('Error signing in:', errorCode, errorMessage);
			});
	};

	const CheckLogIn = () => {
		console.log('user:', user, 'Logged in?:', isLoggedIn);
	};

	return (
		<div>
			<input
				type='text'
				placeholder='Email'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button onClick={handleSignIn}> Sign In </button>
			<button onClick={CheckLogIn}> Am i logged in? </button>
			<br />
			{user && <p> {succes}</p>}
		</div>
	);
}

export default Auth;
