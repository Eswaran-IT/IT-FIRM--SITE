import React from 'react';

const Services = () => {
  return (
    <div>
      <section data-section="section-list">
        <div data-section="section-list-subsection">
          <section
            data-section="services"
            className="py-40 relative"
            data-navigation="services:Services"
            style={{ color: 'black', backgroundColor: 'whitesmoke' }}
          >
            <div
              className="absolute z-10 w-full h-full bg-center bg-cover top-0 md:w-1/2 md:h-full opacity-15"
              style={{
                backgroundImage: 'url("assets/images/background/services.webp")',
                right: '0px',
              }}
            ></div>
            <div className="container space-y-3 relative z-20">
              <div className="text-center space-y-1">
                <h4
                  className="text-xl capitalize border-b-2 w-fit mx-auto px-4"
                  style={{ borderColor: 'rgb(150, 246, 85)' }}
                >
                  Services
                </h4>
                <h2 className="text-4xl font-bold">Our Services Offerings Include</h2>
              </div>
              <div className="flex gap-x-4 gap-y-8 pt-8 flex-wrap justify-center">
                {[
                  {
                    title: 'Cloud Computing & Infrastructure',
                    icon: 'cloud.webp',
                  },
                  {
                    title: 'Cybersecurity & Compliance Solutions',
                    icon: 'security-1.webp',
                  },
                  {
                    title: 'Artificial Intelligence & Data Analytics',
                    icon: 'head-puzzle.webp',
                  },
                  {
                    title: 'IT Automation & Process Optimization',
                    icon: 'business-systems.webp',
                  },
                  {
                    title: 'Secure API Integration & IT Consulting',
                    icon: 'consulting-1.webp',
                  },
                  {
                    title: 'Helpdesk',
                    icon: 'business-systems.webp',
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="w-[300px] relative px-4 pt-5 pb-3 bg-white rounded-lg shadow border-l-4 border-b-4 space-y-1 item"
                    style={{ borderColor: 'rgb(150, 246, 85)' }}
                  >
                    <div
                      className="absolute -top-5 left-5 px-1 py-1 h-10 w-10 rounded flex items-center justify-center"
                      style={{ backgroundColor: 'rgb(150, 246, 85)' }}
                    >
                      <picture>
                        <source srcSet={`assets/images/icon/${service.icon}`} />
                        <img
                          className="w-auto h-[20px]"
                          style={{ filter: 'none' }}
                          alt={service.title}
                        />
                      </picture>
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                    <ul className="list-disc pl-5"></ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            data-section="why-us"
            className="py-40 relative"
            data-navigation="why-us:Why Us"
            style={{ color: 'white', backgroundColor: 'black' }}
          >
            <div className="container space-y-3">
              <div className="space-y-1">
                <h4
                  className="text-xl capitalize border-b-2 w-fit px-4"
                  style={{ borderColor: 'rgb(150, 246, 85)' }}
                >
                  Why Us
                </h4>
                <h2 className="text-4xl font-bold">Why Choose GS Tech Groups LLC</h2>
                <p>
                  GS TECH GROUPS LLC stands out by delivering reliable, cutting-edge solutions that
                  empower both government agencies and private sector organizations to achieve their
                  goals with confidence.
                </p>
                <div className="space-y-8 mt-8">
                  {[
                    {
                      number: 1,
                      text: 'Proven track record in delivering mission-critical IT solutions for public and private organizations.',
                    },
                    {
                      number: 2,
                      text: 'Client-focused approach with customized, scalable systems that drive growth and efficiency.',
                    },
                    {
                      number: 3,
                      text: 'Trusted partner for secure, innovative, and cost-effective digital transformation.',
                    },
                    {
                      number: 4,
                      text: 'Integrated expertise in cloud computing, cybersecurity, and AI for both government and private sector clients.',
                    },
                    {
                      number: 5,
                      text: 'Tailored, compliant solutions that prioritize security, scalability, and innovation across industries.',
                    },
                    {
                      number: 6,
                      text: 'Cost savings through optimized IT infrastructure, automation, and efficient resource allocation.',
                    },
                    {
                      number: 7,
                      text: 'Specialized knowledge in regulatory compliance (government) and competitive advantage (private sector).',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="relative flex gap-x-4 gap-y-8 after:content-[''] after:bg-white after:h-full after:left-4 after:absolute after:top-[2rem] after:w-[1px] last-of-type:after:hidden item"
                    >
                      <div className="rounded-full w-8 h-8 bg-white shadow flex items-center justify-center font-bold text-black">
                        {item.number}
                      </div>
                      <div className="w-[calc(100%-4rem)]">
                        <div className="flex gap-2 items-center">
                          <p className="text-xl font-bold">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            data-section="past-performance"
            className="py-40 [&_.item]:border-white relative"
            data-navigation="past-performance:Past Performance"
            style={{ color: 'black', backgroundColor: 'whitesmoke' }}
          >
            <div className="container space-y-3">
              <div className="space-y-1">
                <h4
                  className="text-xl capitalize border-b-2 w-fit px-4"
                  style={{ borderColor: 'rgb(150, 246, 85)' }}
                >
                  Past Performance
                </h4>
                <h2 className="text-4xl font-bold">Our Past Performance Includes</h2>
                <div className="flex gap-8 justify-center mt-8 flex-wrap">
                  {[
                    {
                      title: 'Cross-Account DynamoDB Migration & Automation',
                      technologies: 'Python, AWS DynamoDB, Step Functions, Lambda, CI/CD',
                      tasks:
                        'Automated data migration between AWS accounts for testing. Used Lambda & Step Functions for backup, cross-account copy, and restore. Integrated with CI/CD for seamless deployment.',
                    },
                    {
                      title: 'S3 File Virus Scanning & Management',
                      technologies: 'AWS Lambda, S3, ClamAV',
                      tasks:
                        'Automated virus scanning of S3 file uploads. Infected files quarantined; clean files moved to production. Improved security & storage efficiency.',
                    },
                    {
                      title: 'Bitbucket Repository Branch Restriction Automation',
                      technologies: 'Bitbucket API, Python',
                      tasks:
                        'Automated branch restriction enforcement across repositories using configuration files, ensuring compliance and consistency.',
                    },
                    {
                      title: 'Dynamic Lambda Provisioned Concurrency Management',
                      technologies: 'AWS Lambda, CodeBuild, Bash Scripting',
                      tasks:
                        'Automated scaling of Lambda provisioned concurrency based on workload demand, optimizing resource allocation and performance.',
                    },
                    {
                      title: 'API Integration for Fund Management',
                      technologies: 'Power Automate, Python, Appian, MuleSoft',
                      tasks:
                        'Integrated multiple SaaS applications via APIs, automating workflows, increasing productivity, and reducing error rates.',
                    },
                    {
                      title: 'Azure Stack HCI Deployment',
                      technologies: 'Microsoft Azure HCI Stack',
                      tasks:
                        'Migrated VMware infrastructure to Azure HCI, reducing operational costs and improving hybrid cloud management for data centers.',
                    },
                    {
                      title: 'Citrix VDI Deployment',
                      technologies: 'Citrix Hybrid VDI (On-Prem & Azure Cloud)',
                      tasks:
                        'Designed and deployed Citrix VDI platform across 13 African sites, enabling secure remote access and reducing infrastructure costs.',
                    },
                  ].map((performance, index) => (
                    <div
                      key={index}
                      className="min-w-[300px] max-w-[350px] px-4 py-3 rounded shadow item border"
                    >
                      <div className="flex gap-4 items-center">
                        <p className="text-xl font-bold">{performance.title}</p>
                      </div>
                      <ul className="list-disc pl-5">
                        <li className="text-sm">Technologies: {performance.technologies}</li>
                        <li className="text-sm">Tasks: {performance.tasks}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Services;
