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
    <div>
      <section>
        <h2>First example</h2>
        <pre>
          <code>
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
        <pre>
          <code>
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
        <pre>
          <code>
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
