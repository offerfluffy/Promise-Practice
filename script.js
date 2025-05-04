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

/*
getWeather()
  .then(getWeatherIcon) // resolve
  .then(onSuccess) // (onSuccess, onFailure)
  .catch(onFailure) // reject
  .finally(() => {
    // settled
    console.log("Finally");
  });
*/

// 1)
function randomPromise(time) {
  const random = Math.floor(Math.random() * 2);

  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (random === 1) {
        resolve(`Resolved in ${time}ms`);
      } else {
        reject(`Rejected in ${time}ms`);
      }
    }, time);
  });
}

/* randomPromise(1000)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
*/

// 2)

const promises = [
  randomPromise(1000),
  randomPromise(2000),
  randomPromise(3000),
];

// All operations need to be resolved for success
Promise.all(promises)
  .then((data) => {
    console.log(`All resolved: ${data}`);
  })
  .catch((err) => {
    console.log(`One failed: ${err}`);
  });

// 3)

function errorPromise() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject("Something went wrong");
    }, 1000);
  });
}

// catch handles any error in the chain before it
errorPromise().catch((err) => {
  console.log(err);
});

// 4)

function fetchData() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("Data fetched");
    }, 2000);
  });
}

function processData(data) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(`${data} processed`);
    }, 1000);
  });
}

fetchData()
  .then(processData)
  .then((data) => {
    console.log(data);
  });

// 5)

function p1() {
  return new Promise(function (resolve, reject) {
    resolve(`Data 1`);
  });
}

function p2() {
  return new Promise(function (resolve, reject) {
    reject(`Error 2`);
  });
}

Promise.allSettled([p1(), p2()]).then((data) => console.log(data));
/* 
  [
  { status: "fulfilled", value: "Data 1" },
  { status: "rejected", reason: "Error 2" }
  ]
*/

// 6)

function p3() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve("Data 1"), 3000);
  });
}

function p4() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve("Data 2"), 1000);
  });
}

// If reject in any, entier would reject
Promise.race([p3(), p4()]).then((data) => console.log(data));

// 7)

function fetchRequest() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve("Data Fetch"), 5000);
  });
}

function fetchRejectRequest() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => reject("Timeout"), 2000);
  });
}

Promise.race([fetchRequest(), fetchRejectRequest()])
  .then((data) => console.log("Race", data))
  .catch((err) => console.log("Race", err));

// First resolved
// Rejects only if all are rejected
Promise.any([fetchRequest(), fetchRejectRequest()])
  .then((data) => console.log("Any", data))
  .catch((err) => console.log("Any", err));
