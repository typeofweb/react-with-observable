# react-with-observable
[![Build Status](https://travis-ci.org/mmiszy/react-with-observable.svg?branch=master)](https://travis-ci.org/mmiszy/react-with-observable)
[![Coverage Status](https://coveralls.io/repos/github/mmiszy/react-with-observable/badge.svg?branch=master)](https://coveralls.io/github/mmiszy/react-with-observable?branch=master)
[![npm](https://img.shields.io/npm/v/react-with-observable.svg)](https://www.npmjs.com/package/react-with-observable)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react-with-observable.svg)](https://www.npmjs.com/package/react-with-observable)


`react-with-observable`: use Observables declaratively in ⚛️  React!

* ✅ Supports any Observable implementation compatible with ECMAScript Observable (e.g. **RxJS**)!
* ✅ Inspired by the `AsyncPipe` from Angular!
* ✅ Very extensible by composing Observable operators!
* ✅ TypeScript definitions included!

It handles subscribing and unsubscribing automatically and, hence, you don't have to worry about memory leaks or updating state when new values come!

Inspired by the `AsyncPipe` from Angular. Uses React's [`create-subscription`](https://github.com/facebook/react/tree/master/packages/create-subscription) under the hood.

## Install
```javascript
npm install --save react-with-observable create-subscription
```

## Usage
The component supports any Observable library compatible with the [Observables for ECMAScript draft proposal](https://github.com/tc39/proposal-observable).

### Basics
This package exports a single named component `Subscribe`. It expects you to provide an Observable as its only child:

```javascript
const source$ = Observable.of('Hello, world!');
// …
<Subscribe>{source$}</Subscribe>
```

This results in "Hello, world!" being displayed.

### Reactivity
The component automatically updates whenever a new value is emitted by the Observable:

```javascript
const source$ = Observable.interval(1000);
// …
<Subscribe>{source$}</Subscribe>
```

As a result, the next integer is displayed every second.


### Operators
You can transform the Observable as you wish, as long as the final result is also an Observable:

```javascript
const source$ = Observable.interval(1000);
// …
<Subscribe>
  {source$.pipe(
    map(val => 10 * val),
    scan((acc, val) => acc + val, 0),
    map(val => <input value={val} />)
  )}
</Subscribe>
```

As the result, an `<input>` element is rendered. Its value is changed every second to 0, 10, 30, 60, 100,  and so on.

### Initial value
Use your Observable library! `react-with-observable` doesn't implement any custom way to provide the default value and it doesn't need to. For example, with RxJS, you can use the `startWith` operator:

```javascript
<Subscribe>
  {source$.pipe(
    startWith(null)
  )}
</Subscribe>
```

## Example
You can find more interactive examples here: https://mmiszy.github.io/react-with-observable/

```javascript
import * as React from 'react';
import { Link } from 'react-router-dom';
import { map, startWith } from 'rxjs/operators';
import { Subscribe } from 'react-with-observable';

// myContacts$ is an Observable of an array of contacts

export class ContactsList extends React.Component {
  render() {
    return (
      <div>
        <h2>My Contacts</h2>
        <Subscribe>
          {myContacts$.pipe(
            startWith(null),
            map(this.renderList)
          )}
        </Subscribe>
      </div>
    );
  }

  renderList = (contacts) => {
    if (!contacts) {
      return 'Loading…';
    }

    if (!contacts.length) {
      return 'You have 0 contacts. Add some!';
    }

    return (
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <Link to={`/courses/${contact.id}`}>
              {contact.fullName} — {contact.description}
            </Link>
          </li>
        ))}
      </ul>
    );
  };
}
```

## Bugs? Feature requests?
Feel free to create a new issue: [issues](https://github.com/mmiszy/react-with-observable/issues). Pull requests are also welcome!
