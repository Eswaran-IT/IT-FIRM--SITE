import React from "react";
import {
  CloudIcon,
  LockClosedIcon,
  ServerIcon,
  CodeBracketIcon,
  BoltIcon,
  CircleStackIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

const PastExp = () => {
  const projects = [
    {
      title: "Seamless DynamoDB Migration & Automation",
      tech: ["Python", "AWS DynamoDB", "Step Functions", "Lambda", "CI/CD"],
      tasks: [
        "Enabled automated cross-account data transfer for testing.",
        "Implemented backup, transfer, and restore using Step Functions & Lambda.",
        "Integrated CI/CD pipeline for efficiency.",
      ],
      icon: CloudIcon,
      iconColor: "bg-blue-500 group-hover:bg-blue-700",
    },
    {
      title: "Advanced S3 File Security & Management",
      tech: ["AWS Lambda", "S3", "ClamAV"],
      tasks: [
        "Automated virus scanning for every S3 file upload.",
        "Quarantined infected files & securely stored clean files.",
        "Enhanced security and optimized storage solutions.",
      ],
      icon: LockClosedIcon,
      iconColor: "bg-red-500 group-hover:bg-red-700",
    },
    {
      title: "Automated Branch Restrictions for Bitbucket",
      tech: ["Bitbucket API", "Python"],
      tasks: [
        "Developed automation to enforce branch security policies.",
        "Maintained compliance using structured configuration files.",
      ],
      icon: CodeBracketIcon,
      iconColor: "bg-purple-500 group-hover:bg-purple-700",
    },
    {
      title: "Smart Lambda Concurrency Optimization",
      tech: ["AWS Lambda", "CodeBuild", "Bash Scripting"],
      tasks: [
        "Dynamically adjusted Lambda concurrency based on demand.",
        "Optimized resource utilization and response time.",
      ],
      icon: BoltIcon,
      iconColor: "bg-yellow-500 group-hover:bg-yellow-700",
    },
    {
      title: "Intelligent API Connectivity for Fund Management",
      tech: ["Power Automate", "Python", "Appian", "MuleSoft"],
      tasks: [
        "Streamlined API integration across multiple SaaS applications.",
        "Enhanced workflow automation, reducing manual errors.",
      ],
      icon: ServerIcon,
      iconColor: "bg-green-500 group-hover:bg-green-700",
    },
    {
      title: "Effortless Azure Stack HCI Migration",
      tech: ["Microsoft Azure HCI Stack"],
      tasks: [
        "Migrated VMware-based systems to Azure HCI.",
        "Achieved cost savings and improved hybrid cloud efficiency.",
      ],
      icon: CircleStackIcon,
      iconColor: "bg-indigo-500 group-hover:bg-indigo-700",
    },
    {
      title: "Scalable Citrix VDI Deployment",
      tech: ["Citrix Hybrid VDI (On-Prem & Azure Cloud)"],
      tasks: [
        "Designed and implemented Citrix VDI across 13 African locations.",
        "Enabled secure remote access while reducing infrastructure costs.",
      ],
      icon: ComputerDesktopIcon,
      iconColor: "bg-gray-500 group-hover:bg-gray-700",
    },
  ];

  return (
    <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent animate-pulse"></div>

      <div className="container mx-auto px-6 space-y-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <h4 className="text-4xl font-bold w-fit mx-auto px-8 pb-4 uppercase tracking-wider">
            Past Performance
          </h4>
          <h2 className="text-4xl font-bold text-green-300">
            Innovations We Have Delivered
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mt-8">
          {projects.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-lg shadow-lg bg-gray-800 border border-gray-700 transform transition-all duration-300 hover:scale-105 hover:border-green-400 hover:shadow-green-500/50 relative overflow-hidden flex flex-col"
              >
                <div className="absolute inset-0 bg-green-500 opacity-10 blur-lg scale-125 hidden group-hover:block transition-all duration-500"></div>

                {/* Icon & Title Row */}
                <div className="flex gap-3 items-start">
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full ${item.iconColor} transition duration-300`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition duration-300 w-full">
                    {item.title}
                  </h3>
                </div>

                {/* Tech Stack */}
                <div className="mt-4 ml-[3.75rem]"> {/* Same as icon width + gap (48px + 12px) */}
                  <ul className="flex flex-wrap">
                    {item.tech.map((tech, idx) => (
                      <li
                        key={idx}
                        className="text-xs bg-green-700/20 text-green-400 px-2 py-1 rounded-md mr-2 mb-1"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tasks */}
                <div className="mt-4 flex-1 ml-[3.75rem]">
                  <ul className="space-y-2 text-sm text-gray-300">
                    {item.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-400">✔</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-8 text-gray-300">
          <p>
            Want to collaborate?{" "}
            <a
              href="#contact"
              className="text-green-400 font-semibold hover:underline hover:text-green-500 transition duration-300"
            >
              Let's connect!
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PastExp;
