# This site is deployed using AWS CDK!

## Setup

Setup consists of the following AWS services:

- AWS Fargate
- Amazon Route 53
- AWS Certificate Manager
- AWS Auto Scaling
- Amazon CloudWatch

among many others, and is deploy using AWS Cloud Development Kit.</p>

## Source Code

Source code is available in <a href="https://github.com/nikovirtala/aws-cdk-fargate-service">GitHub</a>.

## To-Do

- Make `domainName` configurable.

## License

MIT © <a href="https://twitter.com/nikovirtala">Niko Virtala</a>

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template
