import 'symbol-observable';
import createSubscriptionModule from 'create-subscription';
import { Subscription as SubscriptionComponent } from 'create-subscription';
import React from 'react';
export { SubscriptionComponent };

const { createSubscription } = createSubscriptionModule;

export declare class Observable<T> {
  constructor(subscriber: SubscriberFunction<T>);

  // Subscribes to the sequence with an observer
  subscribe(observer: Observer<T>): Subscription;

  // Subscribes to the sequence with callbacks
  subscribe(onNext: Function, onError?: Function, onComplete?: Function): Subscription;

  // Returns itself
  [Symbol.observable](): Observable<T>;

  // Converts items to an Observable
  static of<U>(...items: U[]): Observable<U>;

  // Converts an observable or iterable to an Observable
  static from<U>(observable: U): Observable<U>;
}

export declare interface Subscription {
  // Cancels the subscription
  unsubscribe(): void;

  // A boolean value indicating whether the subscription is closed
  closed: boolean;
}

export declare interface SubscriberFunction<T> {
  (observer: SubscriptionObserver<T>): (() => void) | Subscription;
}

export declare interface Observer<T> {
  // Receives the subscription object when `subscribe` is called
  start?(subscription: Subscription): void;

  // Receives the next value in the sequence
  next?(value: T): void;

  // Receives the sequence error
  error?(errorValue: Error): void;

  // Receives a completion notification
  complete?(): void;
}

export declare interface SubscriptionObserver<T> {
  // Sends the next value in the sequence
  next(value: T): void;

  // Sends the sequence error
  error(errorValue: Error): void;

  // Sends the completion notification
  complete(): void;

  // A boolean value indicating whether the subscription is closed
  closed(): boolean;
}

export class Subscribe<T> extends React.Component<{ children: Observable<T> }> {
  render() {
    return this.getSubscription();
  }

  getSubscription() {
    const observable = (React.Children.only(this.props.children) as any) as Observable<T>;
    const SubscriptionComponent = createSubscription<Observable<T>, T | undefined>({
      getCurrentValue(_observable) {
        return undefined;
      },
      subscribe(observable, callback) {
        const subscription = observable.subscribe(callback);
        return () => subscription.unsubscribe();
      },
    });

    return <SubscriptionComponent source={observable}>{val => val}</SubscriptionComponent>;
  }
}
