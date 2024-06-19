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
// Brugeren kan tilføje appen til hjemskærmen, nemmere adgang til appen.
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Undgå, at prompten vises automatisk
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;

  // Opdater UI for at informere brugeren om, at de kan tilføje til hjemskærmen
  showAddToHomeScreen();
});

function showAddToHomeScreen() {
  // Vis add to home screen knappen
  const addToHomeScreenButton = document.querySelector('.add-to-home-screen-button');
  addToHomeScreenButton.style.display = 'block';

  addToHomeScreenButton.addEventListener('click', addToHomeScreen);
}

function addToHomeScreen() {
  // Gem add to home screen knappen
  const addToHomeScreenButton = document.querySelector('.add-to-home-screen-button');
  addToHomeScreenButton.style.display = 'none';

  // vis prompten
  deferredPrompt.prompt();

  // Vent på brugerens respons
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  });
}
