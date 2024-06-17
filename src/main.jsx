import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from '@/Context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<UserProvider>
			<App />
		</UserProvider>
	</React.StrictMode>
);

// Service Worker Registrering
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
	  navigator.serviceWorker.register('/service-worker.js').then(registration => {
		console.log('ServiceWorker registration successful with scope: ', registration.scope);
	  }).catch(error => {
		console.log('ServiceWorker registration failed: ', error);
	  });
	});
  }
  
  // Tilføjelse til Hjemskærm Prompt
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
	// Prevent the mini-infobar from appearing on mobile
	e.preventDefault();
	// Stash the event so it can be triggered later.
	deferredPrompt = e;
  
	// Update UI notify the user they can add to home screen
	showAddToHomeScreen();
  });
  
  function showAddToHomeScreen() {
	// Show the add to home screen button
	const addToHomeScreenButton = document.querySelector('.add-to-home-screen-button');
	addToHomeScreenButton.style.display = 'block';
  
	addToHomeScreenButton.addEventListener('click', addToHomeScreen);
  }
  
  function addToHomeScreen() {
	// Hide the add to home screen button
	const addToHomeScreenButton = document.querySelector('.add-to-home-screen-button');
	addToHomeScreenButton.style.display = 'none';
  
	// Show the prompt
	deferredPrompt.prompt();
  
	// Wait for the user to respond to the prompt
	deferredPrompt.userChoice.then((choiceResult) => {
	  if (choiceResult.outcome === 'accepted') {
		console.log('User accepted the A2HS prompt');
	  } else {
		console.log('User dismissed the A2HS prompt');
	  }
	  deferredPrompt = null;
	});
  }