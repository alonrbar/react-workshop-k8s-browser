import * as React from 'react';
import * as k8s from '@kubernetes/client-node';

export interface PodsListProps {
    pods: k8s.V1Pod[];
    onPodClick: (pod: k8s.V1Pod) => void;
}

export class PodsList extends React.PureComponent<PodsListProps> {
    public render() {
        const cellStyle: React.CSSProperties = {
            padding: 10
        };

        return (
            <table>
                <thead>
                    <tr>
                        <th>Pod</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>

                    {!this.props.pods && (
                        <tr>
                            <td colSpan={2}>No pods...</td>
                        </tr>
                    )}

                    {this.props.pods?.map(pod => (
                        <tr
                            key={pod.metadata.name}
                            onClick={() => this.props.onPodClick(pod)}
                            style={{
                                cursor: 'pointer'
                            }}
                        >
                            <td style={cellStyle}>{pod.metadata.name}</td>
                            <td style={cellStyle}>{pod.spec.containers[0].image}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        );
    }
}