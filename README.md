# RubiX Showcase Repo's

This directory contain a sample application built using the RubiX Framework

## Deploy The App
This guide assumes you have a Knative Cluster running in GKE and the RubiX CLI installed locally. If not follow our guide [here](https://github.com/rubixFunctions/r3x-docs/blob/master/install/README.md).

With the cluster running and RubiX installed clone this repo.
```
$ git clone git@github.com:rubixFunctions/r3x-showcase-apps.git
```
Run `r3x build -p -n <<your docker hub name>>` on the following directories:
- rubix-create
- rubix-delete
- rubix-dictate
- rubix-list

This will build and push each function to your registry. Once complete replace the `image` field in `deployments/service.yaml` with your one image link. 

### Provision Google Services
The following services need to be provisioned. Click each service for guide.
- [Google DataStore](https://cloud.google.com/datastore/docs/quickstart)
- [Google Storage](https://cloud.google.com/storage/docs/quickstart-console)

### Create Service Account
A google service account is needed to allow our showcase interact with our google services. Follow this guide [here](https://developers.google.com/android/management/service-account) to create a new service account, ensure that it has roles to allow access to storage, datastore, compute and speech api, finally export the key in `JSON` format.

### Mount Secret
We can now mount the servicce account key to the cluster:
```
$ kubectl create secret generic google-rubix-secret --from-file=./rubix.json
```
If you follow the naming convention of the previous command, service account key named `rubix.json` and secret titled `google-rubix-secret` then there is no need to update the `deployments/service.yaml`

### Configure Outbound Traffic
We now need to allow our cluster outbound network access. First we need to determining the IP scope of your cluster

You can determine the IP ranges of your cluster in GKE by running the following command. Make sure to replace the variables or export these values first.

```shell
$ gcloud container clusters describe ${CLUSTER_NAME} \
--zone=${CLUSTER_ZONE} | grep -e clusterIpv4Cidr -e servicesIpv4Cidr
```
Now we can set the IP Scope. The `istio.sidecar.includeOutboundIPRanges` parameter in the `config-network`
map specifies the IP ranges that Istio sidecar intercepts. To allow outbound
access, replace the default parameter value with the IP ranges of your cluster.

Run the following command to edit the `config-network` map:

```shell
kubectl edit configmap config-network --namespace knative-serving
```

Then, use an editor of your choice to change the
`istio.sidecar.includeOutboundIPRanges` parameter value from `*` to the IP range
you need. Separate multiple IP entries with a comma. For example:

```
# Please edit the object below. Lines beginning with a '#' will be ignored,
# and an empty file will abort the edit. If an error occurs while saving this file will be
# reopened with the relevant failures.
#
apiVersion: v1
data:
  istio.sidecar.includeOutboundIPRanges: '10.16.0.0/14,10.19.240.0/20'
kind: ConfigMap
metadata:
  ...
```
By default, the `istio.sidecar.includeOutboundIPRanges` parameter is set to `*`,
which means that Istio intercepts all traffic within the cluster as well as all
traffic that is going outside the cluster. Istio blocks all traffic that is
going outside the cluster unless you create the necessary egress rules.

When you set the parameter to a valid set of IP address ranges, Istio will no
longer intercept traffic that is going to the IP addresses outside the provided
ranges, and you don't need to specify any egress rules.

If you omit the parameter or set it to `''`, Knative uses the value of the
`global.proxy.includeIPRanges` parameter that is provided at Istio deployment
time. In the default Knative Serving deployment, `global.proxy.includeIPRanges`
value is set to `*`.

If an invalid value is passed, `''` is used instead.

### Deployment
Apply
   the configuration using `kubectl`:

   ```shell
   kubectl apply --filename service.yaml
   ```

Now that your service is created, Knative will perform the following steps:

   - Create a new immutable revision for this version of the app.
   - Network programming to create a route, ingress, service, and load balance
     for your app.
   - Automatically scale your pods up and down (including to zero active pods).

1. To find the IP address for your service, use these commands to get the
   ingress IP for your cluster. If your cluster is new, it may take sometime for
   the service to get asssigned an external IP address.

   ```shell
   # In Knative 0.2.x and prior versions, the `knative-ingressgateway` service was used instead of `istio-ingressgateway`.
   INGRESSGATEWAY=knative-ingressgateway

   # The use of `knative-ingressgateway` is deprecated in Knative v0.3.x.
   # Use `istio-ingressgateway` instead, since `knative-ingressgateway`
   # will be removed in Knative v0.4.
   if kubectl get configmap config-istio -n knative-serving &> /dev/null; then
       INGRESSGATEWAY=istio-ingressgateway
   fi

   kubectl get svc $INGRESSGATEWAY --namespace istio-system

   NAME                     TYPE           CLUSTER-IP     EXTERNAL-IP      PORT(S)                                      AGE
   xxxxxxx-ingressgateway   LoadBalancer   10.23.247.74   35.203.155.229   80:32380/TCP,443:32390/TCP,32400:32400/TCP   2d
   ```

1. To find the domain URL for your service, use

    ```shell
    kubectl get ksvc r3x-rubix-create --output=custom-columns=NAME:.metadata.name,DOMAIN:.status.domain
    ```

    Example:

    ```shell
    NAME                DOMAIN
    r3x-rubix-create      r3x-rubix-create.default.example.com
   ```
1. Test your app by sending it a request. Use the following `curl` command with
   the domain URL `secrets-go.default.example.com` and `EXTERNAL-IP` address
   that you retrieved in the previous steps:

   ```shell
   curl -X --date '{"title":"message","value":"hello rubix"}' "Host: r3x-rubix-create.default.example.com" http://{EXTERNAL_IP_ADDRESS}
   ```
   You should receive a success response, and the entry should be placed in your datastore.

### TroubleShooting
If you are still having trouble making off-cluster calls, you can verify that
the policy was applied to the pod running your service by checking the metadata
on the pod. Verify that the `traffic.sidecar.istio.io/includeOutboundIPRanges`
annotation matches the expected value from the config-map.

```shell
$ kubectl get pod ${POD_NAME} --output yaml

apiVersion: v1
kind: Pod
metadata:
  annotations:
    serving.knative.dev/configurationGeneration: "2"
    sidecar.istio.io/inject: "true"
    ...
    traffic.sidecar.istio.io/includeOutboundIPRanges: 10.16.0.0/14,10.19.240.0/20
...
```



## Documentation
For full framework documentation please refer to our [repo here.](https://github.com/rubixFunctions/r3x-docs/blob/master/README.md)

## License
This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details