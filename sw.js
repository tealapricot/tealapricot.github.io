// Change this to your repository name
var GHPATH = "/";

// Choose a different app prefix name
var APP_PREFIX = "gppwa_";

// The version of the cache. Every time you change any of the files
// you need to change this version (version_01, version_02…).
// If you don't change the version, the service worker will give your
// users the old files!
var VERSION = "version_00";

// The files to make available for offline use. make sure to add
// others to this list
var URLS = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/css/styles.css`,
  `${GHPATH}/css/bootstrap.min.css`,
  `${GHPATH}/css/boxicons.css`,
  `${GHPATH}/css/clock.css`,
  `${GHPATH}/css/offcanvas.css`,
  `${GHPATH}/js/script.js`,
  `${GHPATH}/js/clock.js`,
  `${GHPATH}/js/offcanvas.js`,
  `${GHPATH}/js/moment.min.js`,
];

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

// …

registerServiceWorker();
