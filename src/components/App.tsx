import * as React from 'react';

export const App: React.SFC = () => (
    <div>
        <h1>Hello Electron!</h1>
        <p>
            We are using Node.js {process.versions.node}, <br />
            Chromium {process.versions.chrome}, <br />
            and Electron {process.versions.electron}.
        </p>
    </div>
);