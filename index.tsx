import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Example1, Example2, Example3 } from './example';
import { ContactsExample } from './contactsList';

ReactDOM.render(<Example1 />, document.getElementById('example-1') as HTMLElement);
ReactDOM.render(<Example2 />, document.getElementById('example-2') as HTMLElement);
ReactDOM.render(<Example3 />, document.getElementById('example-3') as HTMLElement);
ReactDOM.render(<ContactsExample />, document.getElementById('example-contacts') as HTMLElement);
