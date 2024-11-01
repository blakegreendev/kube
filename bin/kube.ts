import * as cdk from "aws-cdk-lib";
import * as blueprints from "@aws-quickstart/eks-blueprints";
import { KubecostAddOn } from "@kubecost/kubecost-eks-blueprints-addon";

const app = new cdk.App();
const account = "278334135690";
const region = "us-east-1";
const version = "auto";

blueprints.HelmAddOn.validateHelmVersions = true; // optional if you would like to check for newer versions

const addOns: Array<blueprints.ClusterAddOn> = [
  new blueprints.addons.ArgoCDAddOn(),
  new blueprints.addons.MetricsServerAddOn(),
  new blueprints.addons.AwsLoadBalancerControllerAddOn(),
  new blueprints.addons.VpcCniAddOn(), // support network policies ootb
  new blueprints.addons.CoreDnsAddOn(),
  new blueprints.addons.KubeProxyAddOn(),
  new blueprints.addons.KarpenterAddOn(),
  new KubecostAddOn(),
];

const stack = blueprints.EksBlueprint.builder()
  .account(account)
  .region(region)
  .version(version)
  .addOns(...addOns)
  .useDefaultSecretEncryption(true) // set to false to turn secret encryption off (non-production/demo cases)
  .build(app, "eks-blueprint");
