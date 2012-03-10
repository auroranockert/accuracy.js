accuracy.js
================================================================================

Highly work in progress, but intended to be a tool for testing numerical accuracy in browsers.

Currently all tests pass (but note that some functions have lower accuracy requirements than others), but that is just because I know we cannot fuzz the trigonometric functions, at least not for large values.

To test, use js-test-driver from http://code.google.com/p/js-test-driver/downloads/list, they have a quick start guide.