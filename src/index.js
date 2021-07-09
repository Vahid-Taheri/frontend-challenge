import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './components/SignUp';

import './style.scss';

const App = () => {
    return (
        <React.Suspense fallback="Error" >
            <SignUp />
        </React.Suspense>
    );
};

ReactDOM.render(<App />,document.getElementById("root"));