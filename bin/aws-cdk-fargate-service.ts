#!/usr/bin/env node
import "source-map-support/register";
import cdk = require("@aws-cdk/core");
import { AwsCdkFargateServiceStack } from "../lib/aws-cdk-fargate-service-stack";

const app = new cdk.App();
new AwsCdkFargateServiceStack(app, "AwsCdkFargateServiceStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});

app.synth();
