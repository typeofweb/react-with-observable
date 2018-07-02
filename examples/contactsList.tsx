import * as React from 'react';
import { map, startWith, scan } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ajax } from 'rxjs/ajax';

// @ts-ignore
import { Subscribe } from 'react-with-observable';

type Contact = {
  id: string;
  fullName: string;
  description: string;
};
const myContacts$ = new BehaviorSubject<Contact[] | null>(null);

// simulate empty contacts list with a delay
setTimeout(() => {
  myContacts$.next([]);
}, 2000);

class ContactsList extends React.Component {
  allContacts$ = myContacts$.pipe(
    scan((acc, contacts) => {
      return [...(acc || []), ...(contacts || [])];
    })
  );

  recentContacts$ = myContacts$.pipe(startWith(null as Contact[] | null));

  render() {
    return (
      <div>
        <h3>My Contacts</h3>
        <h4>Recently fetched contacts</h4>
        <pre>
          <code>
            {`
recentContacts$ = myContacts$.pipe(startWith(null as Contact[] | null));
<Subscribe>{recentContacts$.pipe(map(this.renderList))}</Subscribe>
`.trim()}
          </code>
        </pre>
        <Subscribe>{this.recentContacts$.pipe(map(this.renderList))}</Subscribe>

        <h4>All contacts</h4>
        <pre>
          <code>
            {`
allContacts$ = myContacts$.pipe(
  scan((acc, contacts) => {
    return [...(acc || []), ...(contacts || [])];
  })
);
<Subscribe>{allContacts$.pipe(map(this.renderList))}</Subscribe>
`.trim()}
          </code>
        </pre>
        <Subscribe>{this.allContacts$.pipe(map(this.renderList))}</Subscribe>
      </div>
    );
  }

  renderList = (contacts: Contact[] | null) => {
    if (!contacts) {
      return 'Loading…';
    }

    if (!contacts.length) {
      return 'No contacts.';
    }

    return (
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.fullName} — {contact.description}
          </li>
        ))}
      </ul>
    );
  };
}

export class ContactsExample extends React.Component {
  render() {
    return (
      <div>
        <button type="button" onClick={this.addContacts}>
          Add random contacts from the API
        </button>
        <ContactsList />
      </div>
    );
  }

  addContacts() {
    const count = Math.floor(Math.random() * 3) + 3;
    myContacts$.next(null);
    ajax
      .get('https://randomuser.me/api/?results=' + count)
      .pipe(
        map(res => {
          const results: Array<any> = res.response.results;
          return results.map<Contact>(r => ({
            id: r.login.uuid,
            fullName: `${r.name.title} ${r.name.first} ${r.name.last}`,
            description: r.email,
          }));
        })
      )
      .subscribe(val => myContacts$.next(val));
  }
}
