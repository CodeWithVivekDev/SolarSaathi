# SolarSaathi Cloud Infrastructure (AWS SAM)

This directory contains Infrastructure-as-Code definitions for provisioning SolarSaathi cloud resources planned for **Phase 6**.

## AWS Resources
- **API Gateway**: REST API with stages, CORS preflight handlers, and throttling.
- **AWS Lambda**: Serverless Python 3.12 functions with least-privilege IAM roles.
- **Amazon DynamoDB**: Key-value cache table for solar irradiance coordinates (`solarsaathi-cache`).
- **AWS Amplify Hosting**: Static website hosting with global CloudFront CDN distribution and custom domain SSL.
- **Amazon CloudWatch**: Log groups and alarm metrics.
