import * as React from 'react';
import * as k8s from '@kubernetes/client-node';
import * as fs from 'fs';
import * as path from 'path';

export interface PodDetailsProps {
    pod: k8s.V1Pod
}

export class PodDetails extends React.PureComponent<PodDetailsProps> {
    public render() {
        return (
            <div>
                <button
                    onClick={this.exportPod}
                >
                    Export
                </button>
                <pre>
                    {JSON.stringify(this.props.pod, null, 4)}
                </pre>
            </div>
        );
    }

    private exportPod = async () => {
        const filePath = path.join("c:\\temp", this.props.pod.metadata.name + ".json");
        const details = JSON.stringify(this.props.pod, null, 4);
        fs.writeFileSync(filePath, details, { encoding: 'utf8' });
    }
}