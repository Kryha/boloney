# "Boloney!"

An online multiplayer game showcasing the potential of Aleo's Zero Knowledge Proof platform.

## Getting started

Before running the application, make sure to install the following software:

- [Node.js](https://nodejs.org/en)
- [Yarn](https://yarnpkg.com/getting-started/install)
- [Docker](https://docs.docker.com/engine/install/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) - perform only the first step, titled "Installation"
- [Skaffold](https://skaffold.dev/docs/install/)

Before running Minikube, make sure Docker is running.

Run Minikube:

```bash
minikube start --cpus=max --memory=max
```

Enable ingress add-on:

```bash
minikube addons enable ingress
```

Open a new terminal tab and run:

```bash
sudo minikube tunnel
```

This will allow you to access the deployed applications at the address specified in the ingress configuration so keep it running in the background.

Return to the first terminal tab and run:

```bash
skaffold run
```

This will build the frontend and backend and deploy them on the minikube cluster.

> ⚠️ Occasionally you may see that the deployment fails on db connection because of how Nakama handles it, but most of the times it's actually successful since the backend pod will automatically restart and manage to connect to the db eventually. Whenever you get that kind of error, use the following commands to check the status of the backend pod, it may need to restart 2/3 times before it has a `Running` status.

To check the status of your pods, run:

```bash
kubectl -n boloney-local get pods
```

To read the logs, run:

```bash
# pod_name can be retrieved from the output of the previous command
kubectl -n boloney-local logs <pod_name> -f
```

If the pods are running correctly, the services should be accessible at the following addresses:

- Frontend: <http://frontend.localhost>
- Nakama dashboard: <http://backend.localhost>
- Nakama API: <http://api.localhost>

> ⚠️ On MacOS you may need to configure `dnsmasq` in order to access custom domain names. Consider following this [guide](https://www.stevenrombauts.be/2018/01/use-dnsmasq-instead-of-etc-hosts/#2-only-send-test-and-box-queries-to-dnsmasq) and use `.localhost` instead of `.test` and `.box`.

### Run frontend in dev mode

If you are developing the frontend application, you can run a development server:

```bash
cd frontend/
yarn dev
```

The development application will be available at the URL printed in the command output.

## Adding files to `backend/` or `frontend/`

Whenever adding a file (necessary for the applications' build) directly to `frontend/` or `backend/` root directories:

1. Open the `Dockerfile` related to that deployment
2. In the build phase, add `COPY frontend/<file_name>.<ext> ./frontend/<file_name>.<ext>` (write `backend` instead of `frontend` for the backend build)
