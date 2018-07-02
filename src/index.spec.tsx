import { Subscribe } from './index';
import { of, interval, BehaviorSubject, Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';

describe('test', () => {
  it('should render the value', () => {
    const source$ = of(1);
    const el = mount(<Subscribe>{source$}</Subscribe>);
    expect(el.text()).toEqual('1');

    el.unmount();
  });

  it('should render next values', () => {
    jest.useFakeTimers();

    const source$ = interval(100);

    const el = mount(<Subscribe>{source$}</Subscribe>);
    for (let i = 0; i < 10; ++i) {
      jest.advanceTimersByTime(100);
      expect(el.text()).toEqual(String(i));
    }

    el.unmount();
  });

  it('works fine with operators', () => {
    jest.useFakeTimers();

    const source$ = interval(100);

    const el = mount(
      <Subscribe>
        {source$.pipe(
          map(val => 10 * val),
          scan((acc, val) => acc + val, 0)
        )}
      </Subscribe>
    );

    jest.advanceTimersByTime(100);
    expect(el.text()).toEqual('0');
    jest.advanceTimersByTime(100);
    expect(el.text()).toEqual('10');
    jest.advanceTimersByTime(100);
    expect(el.text()).toEqual('30');
    jest.advanceTimersByTime(100);
    expect(el.text()).toEqual('60');
    jest.advanceTimersByTime(100);
    expect(el.text()).toEqual('100');

    el.unmount();
  });

  it('allows rendering elements', () => {
    jest.useFakeTimers();

    const source$ = interval(100);

    const el = mount(
      <Subscribe>
        {source$.pipe(
          map(val => 10 * val),
          scan((acc, val) => acc + val, 0),
          map(val => <input value={val} />)
        )}
      </Subscribe>
    );

    let input: HTMLInputElement;

    // @todo why el.find('input') or el.is('input') are not working?
    jest.advanceTimersByTime(100);
    input = el.getDOMNode() as HTMLInputElement;
    expect(input.tagName).toBe('INPUT');
    expect(input.value).toBe('0');

    jest.advanceTimersByTime(100);
    input = el.getDOMNode() as HTMLInputElement;
    expect(input.tagName).toBe('INPUT');
    expect(input.value).toBe('10');

    jest.advanceTimersByTime(100);
    input = el.getDOMNode() as HTMLInputElement;
    expect(input.tagName).toBe('INPUT');
    expect(input.value).toBe('30');

    jest.advanceTimersByTime(100);
    input = el.getDOMNode() as HTMLInputElement;
    expect(input.tagName).toBe('INPUT');
    expect(input.value).toBe('60');

    jest.advanceTimersByTime(100);
    input = el.getDOMNode() as HTMLInputElement;
    expect(input.tagName).toBe('INPUT');
    expect(input.value).toBe('100');

    el.unmount();
  });

  it('should work with BehaviourSubject', () => {
    const source$ = new BehaviorSubject(123);
    const el = mount(<Subscribe>{source$}</Subscribe>);
    expect(el.text()).toEqual('123');

    el.unmount();
  });

  it('should return empty render for an observable of undefined', () => {
    const source$ = of(undefined);
    const el = mount(<Subscribe>{source$}</Subscribe>);
    expect(el.childAt(0).isEmptyRender()).toBe(true);

    el.unmount();
  });

  it('should return empty render for an observable of null', () => {
    const source$ = of(null);
    const el = mount(<Subscribe>{source$}</Subscribe>);
    expect(el.childAt(0).isEmptyRender()).toBe(true);

    el.unmount();
  });

  it('should return empty render for an observable without a value', () => {
    const source$ = new Observable();

    const el = mount(<Subscribe>{source$}</Subscribe>);
    expect(el.childAt(0).isEmptyRender()).toBe(true);

    el.unmount();
  });

  it('should throw an error when no obserable is passed', () => {
    const source$ = {} as any;

    // stfu React
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    let el: ReactWrapper | undefined;
    const test = () => {
      el = mount(<Subscribe>{source$}</Subscribe>);
    };
    expect(test).toThrow();

    el && el.unmount();
  });
});
