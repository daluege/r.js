# record-js
[![NPM](https://img.shields.io/npm/v/polycode.svg?maxAge=2592000&style=flat-square)](https://www.npmjs.com/package/polycode)
[![License](https://img.shields.io/npm/l/polycode.svg?style=flat-square)](https://github.com/checle/record-js/blob/master/LICENSE)
[![Coding style](https://img.shields.io/badge/code%20style-standard-blue.svg?style=flat-square)](http://standardjs.com/)
[![Dependencies](https://img.shields.io/david/checle/record-js.svg?maxAge=2592000&style=flat-square)](https://david-dm.org/checle/record-js)
[![Build status](https://img.shields.io/travis/checle/record-js/master.svg?style=flat-square)](https://travis-ci.org/checle/record-js)
[![GitHub issues](https://img.shields.io/github/issues/checle/record-js.svg?style=flat-square)](https://github.com/checle/record-js/issues)
[![Tonic test](https://img.shields.io/badge/npm-test-brightgreen.svg?style=flat-square)](https://tonicdev.com/npm/polycode)

## Installation

Install the package using the NPM toolchain:

    npm install polycode

Record for JS offers a `record` command-line interface. To make it available on your machine, install `record` globally:

    sudo npm install polycode -g

## Status

Unstable and non-functional: early proof of concept.

## Usage

**Command-line interface** `record`

**Node developer console** `npm run console`

## Contributions

### Conventions

* [Coding style](https://github.com/feross/standard/blob/master/RULES.md)
* [TypeScript coding guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines)
* [Module best practices](https://github.com/mattdesl/module-best-practices)
* Align names with [Java API](https://docs.oracle.com/javase/7/docs/api/overview-summary.html) counterparts if applicable
* *Naming:*
  1. Primitive constant identifiers: `const PRIMITIVE_CONSTANT = 1`
  2. Types, interfaces, classes: `type TypeName`
  3. Variables, properties, methods, functions: `let variableName`
  4. POSIX identifiers are converted accordingly: `pid_t` becomes `Pid`, `struct FILE` becomes `File`

MIT © 2016 Filip Dalüge ([see for full text](./LICENSE))
