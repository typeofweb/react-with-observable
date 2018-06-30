# react-with-observable
[![Build Status](https://travis-ci.org/mmiszy/react-with-observable.svg?branch=master)](https://travis-ci.org/mmiszy/react-with-observable)
[![Coverage Status](https://coveralls.io/repos/github/mmiszy/react-with-observable/badge.svg?branch=master)](https://coveralls.io/github/mmiszy/react-with-observable?branch=master)
[![npm](https://img.shields.io/npm/v/react-with-observable.svg)](https://www.npmjs.com/package/react-with-observable)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/react-with-observable.svg)](https://www.npmjs.com/package/react-with-observable)


`react-with-observable` is a component which allows you to use Observables declaratively.

* ✅ Supports any Observable implementation compatible with ECMAScript Observable (eg. **RxJS**)!
* ✅ Inspired by `AsyncPipe` from Angular!
* ✅ Very extensible simply by composing Observable operators!

It handles subscribing and unsubscribing automatically, and, hence, you don't have to worry about memory leaks or updating state when new values come!

Inspired by the `AsyncPipe` from Angular. Uses [`create-subscription`](https://github.com/facebook/react/tree/master/packages/create-subscription) under the hood.

## Install
```javascript
npm install --save react-with-observable create-subscription
```

## Usage
The component supports any Observable library compatible with the [Observables for ECMAScript draft proposal](https://github.com/tc39/proposal-observable).

### Basics
This package exports a single named component `Subscribe`. It expects you to provide a an Observable as its only child:

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

As a result, next integer is displayed every second.


### Operators
You can transform the Observable as you wish, as long as the final result is also an Observable.

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
As a result, an `<input>` element is rendered. It's value is changed every second to 0, 10, 30, 60, 100 and so on.

### Initial value
Use your Observable library! The library doesn't provide any custom way to provide the default value and it doesn't need to. For example, with rxjs, you can use the `startWith` operator:

```javascript
<Subscribe>
  {source$.pipe(
    startWith(null)
  )}
</Subscribe>
```

## Example
```javascript
import * as React from 'react';
import { Link } from 'react-router-dom';
import { map, startWith } from 'rxjs/operators';
import { Subscribe } from 'react-with-observable';

// myContacts$ is contains a reactive list of contacts

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
