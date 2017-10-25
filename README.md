[![GitHub issues](https://img.shields.io/github/issues/tzellman/hyperapp-boilerplate.svg)](https://github.com/tzellman/hyperapp-boilerplate/issues)
[![dependencies](https://david-dm.org/tzellman/hyperapp-boilerplate.svg)](https://david-dm.org/tzellman/hyperapp-boilerplate)

# [HyperApp](https://github.com/hyperapp/hyperapp) Boilerplate

The purpose of this example was to create a starting-point for a [HyperApp](https://github.com/hyperapp/hyperapp) project.

I decided to use [Taskr](https://github.com/lukeed/taskr) along with [Rollup](https://github.com/rollup/rollup), since the
combination of the two seems to create a pleasant development/build experience.

I suppose this example can also be used as a starting point for a Taskr/Rollup app.

## Getting started

```bash
npm install
npm start
```

Your browser should have automatically launched [http://localhost:4000](http://localhost:4000)!

Any changes you make to your code will also automatically be reflected in the browser.

You can also view the example app here: [https://tzellman.github.io/hyperapp-boilerplate/](https://tzellman.github.io/hyperapp-boilerplate/).

## Building a release

```bash
npm run build
```

This will generate a `release` directory with your minified/rev'd assets.


## Using `serve`

```bash
npm run serve
```

This will use [serve](https://github.com/zeit/serve) to statically serve your app from the `release` directory.

## Credits

The basis of the counter code was mostly copied from @selfup's [hyperapp-one]()https://github.com/selfup/hyperapp-one) example.
I also thank @lukeed and @jbucaran for all of the `taskr` examples, and the library itself.

## Author

Tom Zellman ([@tzellman](https://twitter.com/tzellman))
