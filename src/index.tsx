import 'symbol-observable';

import * as createSubscriptionModule from 'create-subscription';
import { Subscription as SubscriptionComponent } from 'create-subscription';
import * as React from 'react';
export { SubscriptionComponent };

// rollup quirk
const { createSubscription } = createSubscriptionModule;

export interface Observable<T> {
  subscribe(onNext: (val: T) => any, onError?: Function, onComplete?: Function): Subscription;
  [Symbol.observable](): this;
}

export interface Subscription {
  unsubscribe(): void;
}

export interface SubscribeProps<T> {
  children: SubscribeChildren<T>;
}

// @todo rxjs has incorrect typings because it lacks `[Symbol.observable](): this` method
// so I added `subscribe` here to make it compatible with rxjs
type SubscribeChildren<T> =
  | { subscribe: Observable<T>['subscribe'] }
  | { [Symbol.observable](): Observable<T> };

export class Subscribe<T = any> extends React.Component<SubscribeProps<T>> {
  private SubscriptionComponent = this.getSubscriptionComponent();

  render() {
    const observable = this.getObservableFromChildren();

    return (
      <this.SubscriptionComponent source={observable}>
        {val => {
          if (typeof val === 'undefined') {
            return '';
          }
          return val;
        }}
      </this.SubscriptionComponent>
    );
  }

  private getObservableFromChildren() {
    const child = this.props.children as Observable<T>;

    const observable: Observable<T> | undefined =
      typeof child[Symbol.observable] === 'function' ? child[Symbol.observable]() : undefined;

    if (!observable) {
      throw new Error(
        `<Subscribe>: Expected children to be a single Observable instance with a [Symbol.observable] method. See more: https://github.com/tc39/proposal-observable`
      );
    }

    return observable;
  }

  private getSubscriptionComponent() {
    const SubscriptionComponent = createSubscription<Observable<T>, T | undefined>({
      getCurrentValue(_observable) {
        return undefined;
      },
      subscribe(observable, callback) {
        const subscription = observable.subscribe(callback);
        return () => subscription.unsubscribe();
      },
    });

    return SubscriptionComponent;
  }
}
