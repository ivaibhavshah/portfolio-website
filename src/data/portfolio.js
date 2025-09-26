const portfolio = {
  meta: {
    title: "Vaibhav Shah | Backend & DevOps Engineer",
    description:
      "Backend developer and cloud engineer delivering resilient APIs, data platforms, and DevOps automation across AWS and Google Cloud.",
  },
  personal: {
    name: "Vaibhav Shah",
    role: "Backend Developer | GCP Certified",
    headline:
      "Designing scalable REST APIs, intelligent approval systems, and cloud-native delivery pipelines for high-growth teams.",
    location: "Gujarat, India",
    availability: "Open to senior backend roles and platform engineering mandates.",
    phone: "+91 99136 92148",
    email: "vaibhav.anjar@gmail.com",
    linkedin: "https://www.linkedin.com/in/ivaibhavshah",
    github: "https://github.com/ivaibhavshah",
    summary:
      "Experienced Backend Developer and DevOps Engineer with a foundation in JavaScript, Python, FASTAPI, Express.js, and modern DevOps practices. Proven ability to design, develop, and operate scalable REST APIs, implement dynamic approval systems, and integrate AI-powered solutions. Skilled in infrastructure automation, containerization, and cloud platforms like AWS and Google Cloud.",
  },
  contact: {
    email: "vaibhav.anjar@gmail.com",
    phone: "+91 99136 92148",
    linkedin: "https://www.linkedin.com/in/ivaibhavshah",
    github: "https://github.com/ivaibhavshah",
    calendar: null,
  },
  tech: {
    primary: [
      "Node.js & Express",
      "Python & FastAPI",
      "Google Cloud (GCE, Cloud Run, Pub/Sub)",
      "AWS (Lambda, SQS, API Gateway)",
    ],
    secondary: [
      "DevOps automation",
      "CI/CD pipelines",
      "Container orchestration",
      "Infrastructure as Code",
    ],
    tooling: ["Terraform", "Docker", "GitHub Actions", "Cloud Build", "PostgreSQL", "MySQL"],
  },
  metrics: [
    { label: "Team Members Led", value: "12+" },
    { label: "Project Managed", value: "5+" },
    { label: "Integrations deployed", value: "15+" },
    { label: "Deployment frequency", value: "Weekly" },
    { label: "Incident recovery", value: "< 15 min" },
  ],
  skills: [
    {
      name: "Cloud Native APIs",
      description: "Event-driven and REST workloads hardened for latency and scale.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
      focus: "Node.js / FastAPI",
    },
    {
      name: "DevOps Automation",
      description: "Delivery pipelines and observability that keep releases boring.",
      image:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=900&q=80",
      focus: "Terraform / Docker / GitHub Actions",
    },
    {
      name: "Cloud Platforms",
      description: "Production experience across Google Cloud and AWS ecosystems.",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80",
      focus: "GCP / AWS / Hybrid workloads",
    },
    {
      name: "Data Engineering",
      description: "Designing reliable data flows, warehousing, and analytics visibility.",
      image:
        "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=900&q=80",
      focus: "PostgreSQL / MySQL / BigQuery",
    },
  ],
  experience: [
    {
      company: "AeonX Digital",
      role: "Backend Developer",
      period: "April 2025 - Present",
      duration: "6 months",
      location: "Bhuj, Gujarat, India",
      impact: [
        "Leading and managing projects for Web Development.",
        "Scaled approval workflows with AI-assisted routing and audit-ready observability dashboards.",
        "Championed incident runbooks and SLOs that keep recovery under 15 minutes.",
      ],
      stack: ["Node.js", "Express", "GCP", "PostgreSQL", "BigQuery"],
    },
    {
      company: "AeonX Digital",
      role: "Jr. Backend Developer",
      period: "August 2024 - March 2025",
      duration: "8 months",
      location: "Bhuj, Gujarat, India",
      impact: [
        "Built internal tooling for data reconciliation and KPI visualisation.",
        "Delivered greenfield API platform powering partner onboarding and billing.",
        "Introduced automated testing and CI workflows that cut release time by 40%.",
      ],
      stack: ["Node.js", "FastAPI", "AWS", "Docker"],
    },
    {
      company: "AeonX Digital",
      role: "Trainee Developer",
      period: "August 2023 - July 2024",
      duration: "1 year",
      location: "Bhuj, Gujarat, India",
      impact: [
        "Integrated third-party services with resilient retry and dead-letter patterns.",
        "Containerised legacy workloads and migrated them to managed compute.",
        "Provided on-call support and playbooks for critical production services.",
      ],
      stack: ["Node.js", "Python", "MySQL", "Docker"],
    },
    {
      company: "TechSture Technologies India Pvt. Ltd.",
      role: "Trainee Database Engineer",
      period: "February 2023 - May 2023",
      duration: "4 months",
      location: "Ahmedabad, Gujarat, India",
      impact: [
        "Designed database schemas for analytics workloads with performance guardrails.",
        "Automated ETL routines and validation for daily reporting.",
        "Collaborated with backend squad to expose data services securely.",
      ],
      stack: ["MS SQL", "Python", "Arduino"],
    },
  ],
  projects: [
    {
      name: "Red Activity",
      description: "A Stock and Invoicing mobile app solution for Retailers.",
      problem: "Slow and error-prone Stock Maintenance and Invoicing.",
      solution:
        "Implemented a mobile application solution for real-time stock maintenance and invoicing.",
      impact: "Cut decision latency by 55% and delivered audit-ready trails for regulators.",
      stack: ["Node.js", "Hostinger", "MySQL"],
      link: null,
    },
    {
      name: "Terraform Templates with AWS",
      description: "Terraform and CI templates standardising cloud environment provisioning.",
      problem: "Manual deployments took 3 days to complete.",
      solution: "Built reusable Terraform modules with AWS CI/CD pipelines for automated deployments and ECS cluster management with S3 Static Hosting with workspace Environments.",
      impact: "Reduced environment bring-up from 3 days to under 3 hours across teams.",
      stack: ["Terraform", "AWS CodeBuild-> CodeDeploy", "ECS", "Docker"],
      link: "https://github.com/ivaibhavshah/terraform_infra_practice.git",
    },
    {
      name: "AeonXus Portal",
      description: "A Complete in-house CRM solution for AeonX Digital",
      problem: "Leaders lacked real-time visibility into throughput and utilisation of resources.",
      solution: "Implemented solution which includes Sales, Marketing, and HR modules with ESS integration.",
      impact: "Streamlined operations and increased efficiency by 30%.",
      stack: ["MySQL", "Node.js", "AWS Services", "Docker"],
      link: null,
    },
  ],
  certifications: [
    {
      name: "Professional Cloud Developer",
      issuer: "Google Cloud",
      year: "2025",
      badge: "pcd.png",
      credentialId: null,
      link: "https://www.credly.com/badges/cb2e72ab-0729-4b3f-abf5-3e9e371c1077/public_url",
    },
    {
      name: "Professional Cloud Architect",
      issuer: "Google Cloud",
      year: "2025",
      badge: "pca.png",
      credentialId: null,
      link: "https://www.credly.com/badges/494bc54f-2e57-43eb-87f7-b0b357543812/public_url",
    },
    {
      name: "Associate Cloud Engineer",
      issuer: "Google Cloud",
      year: "2024",
      badge: "ace.png",
      credentialId: null,
      link: "https://www.credly.com/badges/d24c6027-1119-42a2-9f77-ae6851ee12f3/public_url",
    },
    {
      name: "GitHub Foundations",
      issuer: "GitHub",
      year: "2024",
      badge: "github-foundations.png",
      credentialId: null,
      link: "https://www.credly.com/badges/dd7c4714-de4e-4448-a316-1aa4fa5ca854/public_url",
    },
    {
      name: "HackerRank Problem Solving (Basic)",
      issuer: "HackerRank",
      year: "2023",
      badge: "hackerrank.png",
      credentialId: null,
      link: "https://www.hackerrank.com/",
    },
  ],
};

export default portfolio;



