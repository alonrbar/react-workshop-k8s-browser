import * as React from 'react';
import { ClusterBrowser } from './ClusterBrowser';

export const App: React.SFC = () => (
    <div>
        <div style={{ margin: '10px auto', width: 700 }}>
            <h1>My Kubernetes cluster:</h1>
            <ClusterBrowser />
        </div>
    </div>
);