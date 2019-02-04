# react-range

[![npm version](https://img.shields.io/npm/v/react-range.svg?style=flat-square)](https://www.npmjs.com/package/react-range)
[![npm downloads](https://img.shields.io/npm/dm/react-range.svg?style=flat-square)](https://www.npmjs.com/package/react-range)
[![Build Status](https://travis-ci.org/tajo/react-range.svg?branch=master)](https://travis-ci.org/tajo/react-range)

[See all the other examples](https://react-range.netlify.com) and [their source code](https://github.com/tajo/react-range/tree/master/examples)!

## Installation

```
yarn add react react-dom react-range
```

## End to end testing

**This library is tightly coupled to many DOM APIs**. It would be very hard to write unit tests that would not involve a lot of mocking. Or we could re-architect the library to better abstract all DOM interfaces but that would mean more code and bigger footprint.

Instead of that, `react-range` is thoroughly tested by end to end tests powered by [puppeteer](https://github.com/GoogleChrome/puppeteer). It tests all user interactions:

All tests are automatically ran in Travis CI with headless chromium. This way, the public API is well tested, including pixel-perfect positioning. Also, the tests are pretty fast, reliable and very descriptive.

Do you want to run them in the `dev` mode (slows down operations, opens the browser)?

```bash
yarn storybook #start the storybook server
yarn test:e2e:dev #run the e2e tests
```

`CI` mode (storybook started on the background, quick, headless)

```bash
yarn test:e2e
```

## Browser support

- **Chrome** (latest, mac, windows, iOS, Android)
- **Firefox** (latest, mac, windows)
- **Safari** (latest, mac, iOS)
- **Edge** (latest, windows)
- **MSIE 11** (windows)

## Contributing

This is how you can spin up the dev environment:

```
git clone https://github.com/tajo/react-range
cd react-range
yarn
yarn storybook
```

## Shoutouts 🙏

Big big shoutout to [Tom MacWright](https://macwright.org/) for donating the `react-range` npm handle! ❤️

<img src="https://raw.githubusercontent.com/tajo/react-range/master/assets/browserstack-logo.png?raw=true" height="80" title="BrowserStack Logo" alt="BrowserStack Logo" />

Big thanks to [BrowserStack](https://www.browserstack.com) for letting the maintainers use their service to debug browser issues.

## Author

Vojtech Miksu 2019, [miksu.cz](https://miksu.cz), [@vmiksu](https://twitter.com/vmiksu)
