'use strict';

let deferredInstallPrompt = null;
const installButton = document.getElementById('install');
installButton.addEventListener('click', installPWA);

// event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);


/**
 * Event handler for beforeinstallprompt event.
 *   Saves the event & shows install button.
 *
 * @param {Event} evt
 */
function saveBeforeInstallPromptEvent(evt) {
  // code to save event & show the install button.
  deferredInstallPrompt = evt;
  installButton.removeAttribute('hidden');
}


/**
 * Event handler for install button - Does the PWA installation.
 *
 * @param {Event} evt
 */
function installPWA(evt) {
  // code show install prompt & hide the install button.
  deferredInstallPrompt.prompt();
  // Hide the install button, it can't be called twice.
  evt.srcElement.setAttribute('hidden', true);
  // Log user response to prompt.
  deferredInstallPrompt.userChoice
      .then((choice) => {
        if (choice.outcome === 'accepted') {
          console.log('Usuario accepto instalar la App', choice);
        } else {
          console.log('User rechazo instalar la App', choice);
        }
        deferredInstallPrompt = null;
      });
}

// event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);

/**
 * Event handler for appinstalled event.
 *   Log the installation to analytics or save the event somehow.
 *
 * @param {Event} evt
 */
function logAppInstalled(evt) {
  // code to log the event
  console.log('Juego de disparos App fue instalada.', evt);

}