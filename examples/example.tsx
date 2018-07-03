import 'symbol-observable';
import * as React from 'react';
import { of, interval } from 'rxjs';

// @ts-ignore
import { Subscribe } from 'react-with-observable';
import { map, scan } from 'rxjs/operators';
import { ContactsExample } from './contactsList';

const source1$ = of('Hello, world!');
const source2$ = interval(1000);
const source3$ = interval(1000);

export const MyComponent: React.SFC = () => {
  return (
    <div className="examples-container">
      <h1>
        <code>react-with-observable</code> — examples
      </h1>
      <p className="subtitle">Use Observables with React declaratively!</p>

      <section>
        <h2>Before you start</h2>
        <p>
          The following examples are created with RxJS. Make sure to include the{' '}
          <code>Symbol.observable</code> polyfill before you start:
        </p>

        <pre className="language-jsx">
          <code className="language-jsx">
            {`
import 'symbol-observable';
import { of, interval, BehaviorSubject } from 'rxjs';
import { map, startWith, scan } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Subscribe } from 'react-with-observable';
`.trim()}
          </code>
        </pre>
        <h2>First example</h2>
        <pre className="language-jsx">
          <code className="language-jsx">
            {`
const source1$ = of('Hello, world!');
<Subscribe>{source1$}</Subscribe>
`.trim()}
          </code>
        </pre>
        <Subscribe>{source1$}</Subscribe>
      </section>

      <section>
        <h2>Timer example</h2>
        <pre className="language-jsx">
          <code className="language-jsx">
            {`
const source2$ = interval(1000);
<Subscribe>{source2$}</Subscribe>
`.trim()}
          </code>
        </pre>
        <Subscribe>{source2$}</Subscribe>
      </section>

      <section>
        <h2>Operators example</h2>
        <pre className="language-jsx">
          <code className="language-jsx">
            {`
const source3$ = interval(1000);
<Subscribe>
  {source3$.pipe(
    map(val => 10 * val),
    scan((acc, val) => acc + val, 0),
    map(val => <input value={val} />)
  )}
</Subscribe>
`.trim()}
          </code>
        </pre>
        <Subscribe>
          {source3$.pipe(
            map(val => 10 * val),
            scan((acc, val) => acc + val, 0),
            map(val => <input value={val} />)
          )}
        </Subscribe>
      </section>

      <section>
        <h2>Contacts list example</h2>
        <ContactsExample />
      </section>
    </div>
  );
};
