// const popup = document.querySelector(".popup")

// let isOnline = true

// const checkConnection = async () => {
//   try {
//     // try to fetch random data from API. If the status code is between 200 and 300, the network connection is considered online.
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//     isOnline = response.status >= 200 && response.status < 300
//   } catch (error) {
//     isOnline = false // if there is an error, the connection is considered offline
//   }
//   handlePopup(isOnline)
// };
// const handlePopup = (status) => {
//   if (status) {
//     return popup.classList.remove("show")
//   }
//   popup.classList.add("show")
// }

// // check the connection status every 3 seconds
// setInterval(checkConnection, 3000);

// // An alternative method for checking network connectivity is to use the navigator.onLine property. However, this method may not always reliable, and a better approach is to call an API and check the response status.

const popup = document.querySelector(".popup");
wifiIcon = document.querySelector(".icon i");
popupTitle = document.querySelector(".popup .title");
popupDesc = document.querySelector(".desc");
reconnectBtn = document.querySelector(".reconnect");

let isOnline = true,
  intervalId,
  timer = 10;

const checkConnection = async () => {
  try {
    // try to fetch random data from API. If the status code is between 200 and 300, the network connection is considered online.
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
  } catch (error) {
    isOnline = false; // if there is an error, the connection is considered offline
  }
  timer = 10;
  clearInterval(intervalId);
  handlePopup(isOnline);
};
const handlePopup = (status) => {
  if (status) { // if the status is true (online), update icon, title, and description accordingly
    wifiIcon.className = "uil uil-wifi";
    popupTitle.innerHTML = "Restored Connection";
    popupDesc.innerHTML =
      "Your device is now successfully connected to the internet.";
    popup.classList.add("online")
    return setTimeout(() => popup.classList.remove("show"), 2000);
  }
  // If the status is false (offline)
  wifiIcon.className = "uil uil-wifi-slash";
  popupTitle.innerHTML = "Lost Conntection";
  popupDesc.innerHTML =
    "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.";
  popup.className = "popup show";

  intervalId = setInterval(() => {
    // set an interval to decrease the time by 1 every second
    timer--;
    if (timer === 0) checkConnection(); // if the timer reaches 0, check the connection again
    popup.querySelector(".desc b").innerHTML = timer;
  }, 1000);
};

// Only if isOnline is true, check the connection status every 3 seconds
setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection)
// An alternative method for checking network connectivity is to use the navigator.onLine property. However, this method may not always reliable, and a better approach is to call an API and check the response status.
