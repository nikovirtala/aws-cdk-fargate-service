import cdk = require("@aws-cdk/core");
import ec2 = require("@aws-cdk/aws-ec2");
import ecs = require("@aws-cdk/aws-ecs");
import route53 = require("@aws-cdk/aws-route53");
import certmgr = require("@aws-cdk/aws-certificatemanager");
import ecs_patterns = require("@aws-cdk/aws-ecs-patterns");
import path = require("path");

export class AwsCdkFargateServiceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // define vpc and fargate cluster
    const vpc = new ec2.Vpc(this, "MyVpc", { maxAzs: 3 });
    const cluster = new ecs.Cluster(this, "Cluster", { vpc });

    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: "containerphoe.be",
      privateZone: false
    });

    const certificate = new certmgr.DnsValidatedCertificate(
      this,
      "Certificate",
      {
        domainName: "heal.your.containerphoe.be",
        hostedZone
      }
    );

    // define load balanced ecs/fargate service from local image
    const fargateService = new ecs_patterns.LoadBalancedFargateService(
      this,
      "FargateService",
      {
        cluster,
        image: ecs.ContainerImage.fromAsset(
          path.resolve(__dirname, "../container-image")
        ),
        containerPort: 80,
        domainZone: hostedZone,
        domainName: "heal.your.containerphoe.be",
        certificate: certificate
      }
    );

    // define auto-scaling policy
    const autoScaling = fargateService.service.autoScaleTaskCount({
      minCapacity: 1,
      maxCapacity: 2
    });
    autoScaling.scaleOnCpuUtilization("CpuScaling", {
      targetUtilizationPercent: 90,
      scaleInCooldown: cdk.Duration.seconds(60),
      scaleOutCooldown: cdk.Duration.seconds(60)
    });
  }
}
