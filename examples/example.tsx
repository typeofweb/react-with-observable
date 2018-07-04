import 'symbol-observable';
import * as React from 'react';
import { of, interval } from 'rxjs';

// @ts-ignore
import { Subscribe } from 'react-with-observable';
import { map, scan } from 'rxjs/operators';

const source1$ = of('Hello, world!');
const source2$ = interval(1000);
const source3$ = interval(1000);

export const Example1 = () => <Subscribe>{source1$}</Subscribe>;

export const Example2 = () => <Subscribe>{source2$}</Subscribe>;

export const Example3 = () => (
  <Subscribe>
    {source3$.pipe(
      map(val => 10 * val),
      scan((acc, val) => acc + val, 0),
      map(val => <input value={val} />)
    )}
  </Subscribe>
);
