# Guardian News App

It uses the Guardian news api and provides search functionality where you can then swipe through pages of data and connect to the individual articles.
Please have a look through and any feedback is welcome.

## Getting Started

I have attempted the single use command prompt below. Fork the repository and run the following command line code. This is dependant on having xcode / android studio installed for running a virtual device.

```
git clone <forked repo url> && cd tote-test/rn-tote-app && npm install && npm run start-ios
```

You can change start-ios to start-android for android virtual devices.

### Set-up Api Key

The above command prompt will run the api requests in 'test' mode. To use the api you are required to have an api-key from https://open-platform.theguardian.com/access/.
Place your api key in api-key.js as below

```js
const apiKey = "test"; // change 'test' for your own api key

module.exports = apiKey;
```

### References

The icons used are availble at icons8. https://icons8.com/icons/set/loader.
