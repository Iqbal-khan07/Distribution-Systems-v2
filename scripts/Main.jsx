import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as SocketIO from 'socket.io-client';

export var Socket = SocketIO.connect();

ReactDOM.render(<h1>Temp</h1>, document.getElementById('content'));