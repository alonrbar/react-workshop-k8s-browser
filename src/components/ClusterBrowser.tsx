import * as k8s from '@kubernetes/client-node';
import * as React from 'react';
import { PodDetails } from './PodDetails';
import { PodsList } from './PodsList';

class ClusterBrowserState {
    selectedPod: k8s.V1Pod;
    podsList: k8s.V1PodList;
}

export class ClusterBrowser extends React.PureComponent<{}, ClusterBrowserState> {

    constructor(props: any) {
        super(props);
        this.state = new ClusterBrowserState();
    }

    public async componentDidMount() {
        const kube = this.createKubeApiClient();
        const res = await kube.listNamespacedPod('kube-system');
        this.setState({
            podsList: res.body
        });
    }

    public render() {
        if (this.state.selectedPod) {
            return this.renderPodDetails();
        }

        return (
            <PodsList
                pods={this.state.podsList?.items}
                onPodClick={pod => this.setState({ selectedPod: pod })}
            />
        );
    }

    private renderPodDetails() {
        return (
            <div>
                <button
                    onClick={() => this.setState({ selectedPod: null })}
                >
                    Back
                </button>
                <br />

                <PodDetails
                    pod={this.state.selectedPod}
                />
            </div>
        )
    }

    private createKubeApiClient() {
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();
        return kc.makeApiClient(k8s.CoreV1Api);
    }
}