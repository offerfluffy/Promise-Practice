// A Promise always involves two parts:
// 1) Promise Creator (Producer)
// 2) Promise Consumer (Receiver)

// A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation.
// It has 3 states:
// 1) Pending (initial state)
// 2) Fulfilled (resolved successfully)
// 3) Rejected (error occurred)


function getWeather() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("cloudy");
    }, 2000);
  });
}

// const promise = getWeather();
// console.log(promise);

function getWeatherIcon(weather) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (weather === "sunny") {
        resolve("Icon Sunny");
      } else if (weather === "cloudy") {
        resolve("Icon Cloudy");
      } else {
        reject("Invalid weather");
      }
    }, 2000);
  });
}

function onSuccess(data) {
  console.log(`Success ${data}`);
}

function onFailure(data) {
  console.log(`Failure ${data}`);
}

// Data from resolve/reject automatically goes to next function as a parametr through .then() chain

getWeather()
  .then(getWeatherIcon) // resolve
  .then(onSuccess) // (onSuccess, onFailure)
  .catch(onFailure) // reject
  .finally(() => { // settled
    console.log("Finally")
  });
