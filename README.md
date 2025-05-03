# 📘 JavaScript Promises – The Complete Guide

A **Promise** is an object that represents the **eventual completion (or failure)** of an asynchronous operation.

It acts as a placeholder for a value that’s not immediately available, allowing developers to write cleaner asynchronous code without deeply nested callbacks.

---

## 🔹 Promise States

Every promise has three possible states:

1. **Pending** – the initial state, neither fulfilled nor rejected.
2. **Fulfilled (Resolved)** – the operation completed successfully.
3. **Rejected** – the operation failed, typically with an error.

Once a promise is settled (fulfilled or rejected), it becomes **immutable**—its state cannot change again.

---

## 🔹 Promise Involves Two Sides

1. **Promise Maker (Producer)**
   The function or code that initiates the asynchronous operation and returns a promise.

2. **Promise Receiver (Consumer)**
   The code that uses `.then()`, `.catch()`, or `.finally()` to handle the promise result.

---

## 🔹 Creating a Promise

```js
function getWeather() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("cloudy");
    }, 2000);
  });
}
```

* `resolve(value)` → operation succeeded, move to **fulfilled** state.
* `reject(reason)` → operation failed, move to **rejected** state.

---

## 🔹 Consuming a Promise

```js
getWeather()
  .then(getWeatherIcon)    // gets result from resolve
  .then(onSuccess)         // result passed again
  .catch(onFailure)        // handles rejection anywhere above
  .finally(() => {
    console.log("Finally"); // always runs
  });
```

### Notes:

* Each `.then()` returns a new promise, enabling **chaining**.
* `.catch()` handles any error in the chain.
* `.finally()` runs once the promise is **settled**, no matter what.

---

## 🔹 Underwater Rocks (Common Mistakes)

1. **Not returning a promise in `.then()`**

   ```js
   .then((data) => {
     getSomething(data); // 🔴 breaks the chain
   });
   ```

   ✅ Fix:

   ```js
   .then((data) => {
     return getSomething(data);
   });
   ```

2. **Nested promises (callback hell reborn)**
   Avoid:

   ```js
   getWeather().then((weather) => {
     getWeatherIcon(weather).then((icon) => {
       console.log(icon);
     });
   });
   ```

   ✅ Use chaining instead:

   ```js
   getWeather()
     .then(getWeatherIcon)
     .then(console.log);
   ```

3. **Forgetting `.catch()`**
   Leads to unhandled promise rejections.

4. **Expecting data in `.finally()`**
   `.finally()` doesn’t receive resolved/rejected data.

---

## 🔹 Static Promise Methods

### `Promise.all([p1, p2, p3])`

* Waits for all to resolve.
* Fails if **any** promise rejects.
* Returns array of results.

### `Promise.allSettled([p1, p2, p3])`

* Waits for all to **settle**.
* Never rejects.
* Returns array of `{ status, value | reason }`.

### `Promise.race([p1, p2, p3])`

* Resolves/rejects as soon as the **first** promise settles.

### `Promise.any([p1, p2, p3])`

* Resolves with the **first fulfilled** promise.
* Rejects only if **all** promises reject (throws `AggregateError`).

---

## 🔹 Summary Table

| Method                 | Resolves When...      | Rejects When...          | Use Case                            |
| ---------------------- | --------------------- | ------------------------ | ----------------------------------- |
| `Promise.all()`        | All promises fulfill  | Any promise rejects      | Wait for all, but fail fast         |
| `Promise.allSettled()` | All promises settle   | Never                    | Get all outcomes (success/failure)  |
| `Promise.race()`       | First promise settles | First rejects (if first) | Timeout logic, fastest response     |
| `Promise.any()`        | First fulfills        | All reject               | Return first success, ignore errors |

---

## ✅ In Summary

* A **Promise** is an object representing an async operation’s **future success or failure**.
* It improves readability and maintainability compared to callbacks.
* Use `.then()` to handle success, `.catch()` for errors, and `.finally()` for cleanup.
* Static methods like `Promise.all`, `race`, and `any` offer control over multiple async tasks.
* Watch out for common mistakes: missing returns, nesting, unhandled errors.
