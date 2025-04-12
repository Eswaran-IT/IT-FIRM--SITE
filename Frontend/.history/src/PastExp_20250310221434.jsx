import React from 'react';

const PastPerformance = () => {
  return (
    <section className="py-40 bg-gray-100 text-black" style={{ backgroundColor: 'whitesmoke' }}>
      <div className="container space-y-3">
        <div className="space-y-1">
          <h4 className="text-xl capitalize border-b-2 w-fit px-4" style={{ borderColor: 'rgb(150, 246, 85)' }}>
            Past Performance
          </h4>
          <h2 className="text-4xl font-bold">Our Past Performance Includes</h2>
        </div>

        <div className="flex gap-8 justify-center mt-8 flex-wrap">
          {[
            {
              title: 'Cross-Account DynamoDB Migration & Automation',
              tech: ['Python', 'AWS DynamoDB', 'Step Functions', 'Lambda', 'CI/CD'],
              tasks: [
                'Automated data migration between AWS accounts for testing.',
                'Used Lambda & Step Functions for backup, cross-account copy, and restore.',
                'Integrated with CI/CD for seamless deployment.',
              ],
            },
            {
              title: 'S3 File Virus Scanning & Management',
              tech: ['AWS Lambda', 'S3', 'ClamAV'],
              tasks: [
                'Automated virus scanning of S3 file uploads.',
                'Infected files quarantined; clean files moved to production.',
                'Improved security & storage efficiency.',
              ],
            },
            {
              title: 'Bitbucket Repository Branch Restriction Automation',
              tech: ['Bitbucket API', 'Python'],
              tasks: [
                'Automated branch restriction enforcement across repositories.',
                'Ensured compliance and consistency using configuration files.',
              ],
            },
            {
              title: 'Dynamic Lambda Provisioned Concurrency Management',
              tech: ['AWS Lambda', 'CodeBuild', 'Bash Scripting'],
              tasks: [
                'Automated scaling of Lambda provisioned concurrency based on workload demand.',
                'Optimized resource allocation and performance.',
              ],
            },
            {
              title: 'API Integration for Fund Management',
              tech: ['Power Automate', 'Python', 'Appian', 'MuleSoft'],
              tasks: [
                'Integrated multiple SaaS applications via APIs.',
                'Automated workflows, increasing productivity and reducing error rates.',
              ],
            },
            {
              title: 'Azure Stack HCI Deployment',
              tech: ['Microsoft Azure HCI Stack'],
              tasks: [
                'Migrated VMware infrastructure to Azure HCI.',
                'Reduced operational costs and improved hybrid cloud management for data centers.',
              ],
            },
            {
              title: 'Citrix VDI Deployment',
              tech: ['Citrix Hybrid VDI (On-Prem & Azure Cloud)'],
              tasks: [
                'Designed and deployed Citrix VDI platform across 13 African sites.',
                'Enabled secure remote access and reduced infrastructure costs.',
              ],
            },
          ].map((item, index) => (
            <div key={index} className="min-w-[300px] max-w-[350px] px-4 py-3 rounded shadow item border">
              <div className="flex gap-4 items-center">
                <p className="text-xl font-bold">{item.title}</p>
              </div>
              <ul className="list-disc pl-5">
                {item.tech.map((tech, idx) => (
                  <li key={idx} className="text-sm">{tech}</li>
                ))}
                {item.tasks.map((task, idx) => (
                  <li key={idx} className="text-sm">{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center text-md !mt-8"></div>
      </div>
    </section>
  );
};

export default PastExp;
