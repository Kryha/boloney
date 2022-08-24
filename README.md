# Liar's Dice

An online multiplayer game showcasing the potential of Aleo's Zero Knowledge Proof platform.

## Local deployment

### Prerequisites

- Setup [dnsmasq](https://www.stevenrombauts.be/2018/01/use-dnsmasq-instead-of-etc-hosts/#2-only-send-test-and-box-queries-to-dnsmasq)
- Install [Docker](https://docs.docker.com/get-docker/)
- Install [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl-macos/#install-with-homebrew-on-macos): `brew install kubectl`
- Install [Minikube](https://minikube.sigs.k8s.io/docs/start/): `brew install minikube`
- Install [Skaffold](https://skaffold.dev/docs/install/#standalone-binary): `brew install skaffold`

### Run minikube

Be sure Docker is running, `cd` into the project root directory and run the following commands:

```sh
minikube start --cpus=max --memory=max
minikube addons enable ingress
minikube addons enable registry
```

### Build and deploy the project

To build and deploy everything to the cluster, run:

```sh
skaffold run
```

If you want Skaffold to watch for code changes, run:

```sh
skaffold dev
```

### Access the application

Open a tunnel to the cluster by running:

```sh
sudo minikube tunnel
```

Keep the process open in the background.

You can access the frontend at `frontent.localhost` and the backend at `backend.localhost`.
