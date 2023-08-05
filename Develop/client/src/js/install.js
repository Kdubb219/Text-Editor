const butInstall = document.getElementById('buttonInstall');

let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // Prevent the default prompt from showing

  // Store the event for later use
  deferredPrompt = event;

  // Show your custom install button or UI here
  butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
      // Show the PWA installation prompt
      deferredPrompt.prompt();
  
      // Wait for the user's choice (installation or dismissal)
      const choiceResult = await deferredPrompt.userChoice;
  
      // Reset the deferredPrompt variable after user choice
      deferredPrompt = null;
  
      // Handle the user's choice (e.g., track analytics or UI changes)
      console.log('User choice:', choiceResult.outcome);
    }
  
    // Hide the custom install button or UI
    butInstall.style.display = 'none';
  });
  
  // Add a handler for the `appinstalled` event
  window.addEventListener('appinstalled', (event) => {
    // The PWA has been successfully installed.
    // You can perform any necessary actions here.
    console.log('PWA installed successfully!');
  });







//const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
//window.addEventListener('beforeinstallprompt', (event) => {});

// TODO: Implement a click event handler on the `butInstall` element
//butInstall.addEventListener('click', async () => {});

// TODO: Add an handler for the `appinstalled` event
//window.addEventListener('appinstalled', (event) => {});
