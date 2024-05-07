
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
