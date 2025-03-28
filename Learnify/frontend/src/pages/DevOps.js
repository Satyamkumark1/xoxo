// Roadmap data
const roadmapItems = [
    {
      id: "foundations",
      title: "Foundations",
      icon: "code",
      description: "Before diving into DevOps tools, you need to understand the fundamentals of programming, operating systems, and networking.",
      skillsTitle: "Essential Skills",
      skills: [
        {
          title: "Programming Basics",
          description: "Learn at least one scripting language (Python, Bash)"
        },
        {
          title: "Linux Fundamentals",
          description: "Command line operations, file system, permissions"
        },
        {
          title: "Networking",
          description: "TCP/IP, DNS, HTTP, SSH, basic network troubleshooting"
        },
        {
          title: "Git",
          description: "Version control basics, branching, merging, pull requests"
        }
      ],
      projects: [
        "Create a simple script to automate repetitive tasks",
        "Set up a basic git repository with branching workflow",
        "Configure a Linux server with proper security practices"
      ],
      estimatedTime: "4-6 weeks",
      progressPercentage: 15
    },
    {
      id: "infrastructure",
      title: "Infrastructure as Code (IaC)",
      icon: "cloud",
      description: "IaC allows you to manage and provision infrastructure through code instead of manual processes, making it reproducible and version-controlled.",
      skillsTitle: "Key Technologies",
      skills: [
        {
          title: "Terraform",
          description: "Infrastructure provisioning across multiple cloud providers"
        },
        {
          title: "Ansible",
          description: "Configuration management and application deployment"
        },
        {
          title: "CloudFormation/ARM Templates",
          description: "Cloud-specific IaC solutions"
        }
      ],
      projects: [
        "Create a Terraform script to provision a web server in the cloud",
        "Use Ansible to configure multiple servers with identical settings",
        "Build a complete infrastructure stack with networking components"
      ],
      estimatedTime: "4-5 weeks",
      progressPercentage: 30
    },
    {
      id: "containerization",
      title: "Containerization & Orchestration",
      icon: "cube",
      description: "Containers provide a consistent environment for applications, making them easier to deploy and manage across different environments.",
      skillsTitle: "Key Technologies",
      skills: [
        {
          title: "Docker",
          description: "Creating and managing containers"
        },
        {
          title: "Kubernetes",
          description: "Container orchestration platform"
        },
        {
          title: "Helm",
          description: "Package manager for Kubernetes"
        },
        {
          title: "Container Registries",
          description: "Docker Hub, AWS ECR, Azure Container Registry"
        }
      ],
      projects: [
        "Containerize a multi-tier application with Docker Compose",
        "Deploy a microservices application to a Kubernetes cluster",
        "Create Helm charts for standardized application deployment"
      ],
      estimatedTime: "6-8 weeks",
      progressPercentage: 45
    },
    {
      id: "cicd",
      title: "Continuous Integration & Delivery",
      icon: "refresh-cw",
      description: "CI/CD automates the process of integrating code changes, testing, and deploying applications, enabling faster and more reliable releases.",
      skillsTitle: "Key Technologies",
      skills: [
        {
          title: "Jenkins",
          description: "Automation server for building CI/CD pipelines"
        },
        {
          title: "GitHub Actions/GitLab CI",
          description: "Integrated CI/CD platforms"
        },
        {
          title: "ArgoCD",
          description: "Declarative, GitOps continuous delivery tool for Kubernetes"
        },
        {
          title: "Testing Frameworks",
          description: "Unit, integration, and end-to-end testing"
        }
      ],
      projects: [
        "Set up a complete CI/CD pipeline for a web application",
        "Implement automated testing at different stages of the pipeline",
        "Configure GitOps workflow with ArgoCD for Kubernetes deployments"
      ],
      estimatedTime: "5-7 weeks",
      progressPercentage: 60
    },
    {
      id: "monitoring",
      title: "Monitoring & Observability",
      icon: "bar-chart",
      description: "Monitoring and observability tools help track application health, performance, and troubleshoot issues in production environments.",
      skillsTitle: "Key Technologies",
      skills: [
        {
          title: "Prometheus",
          description: "Monitoring and alerting toolkit"
        },
        {
          title: "Grafana",
          description: "Visualization and analytics platform"
        },
        {
          title: "ELK Stack/Elasticsearch",
          description: "Log aggregation and analysis"
        },
        {
          title: "Jaeger/Zipkin",
          description: "Distributed tracing systems"
        }
      ],
      projects: [
        "Set up Prometheus and Grafana to monitor a Kubernetes cluster",
        "Implement centralized logging with the ELK stack",
        "Create alerting rules and notification channels for critical services"
      ],
      estimatedTime: "4-6 weeks",
      progressPercentage: 75
    },
    {
      id: "cloud",
      title: "Cloud Platforms",
      icon: "cloud-cog",
      description: "Understanding major cloud platforms and their services is essential for modern DevOps practices, enabling scalable and resilient infrastructure.",
      skillsTitle: "Key Technologies",
      skills: [
        {
          title: "AWS",
          description: "EC2, S3, RDS, Lambda, EKS, ECS, CloudFormation"
        },
        {
          title: "Azure",
          description: "Virtual Machines, Blob Storage, AKS, App Service, ARM templates"
        },
        {
          title: "Google Cloud",
          description: "Compute Engine, GKE, Cloud Storage, Cloud Functions"
        },
        {
          title: "Multi-cloud Management",
          description: "Strategies and tools for multi-cloud deployments"
        }
      ],
      projects: [
        "Design and deploy a highly available application architecture on AWS",
        "Implement a serverless application with cloud-native services",
        "Create a disaster recovery plan for cloud-hosted applications"
      ],
      estimatedTime: "8-10 weeks",
      progressPercentage: 90
    },
    {
      id: "devsecops",
      title: "DevSecOps",
      icon: "shield",
      description: "DevSecOps integrates security practices within the DevOps process, ensuring that security is built into applications from the beginning.",
      skillsTitle: "Key Focus Areas",
      skills: [
        {
          title: "Security Scanning",
          description: "SAST, DAST, dependency scanning"
        },
        {
          title: "Infrastructure Security",
          description: "Network policies, secrets management"
        },
        {
          title: "Compliance as Code",
          description: "Security policies, automated auditing"
        },
        {
          title: "Container Security",
          description: "Image scanning, runtime protection"
        }
      ],
      projects: [
        "Implement security scanning in a CI/CD pipeline",
        "Set up a secrets management solution (HashiCorp Vault, AWS Secrets Manager)",
        "Create security policies for Kubernetes using Open Policy Agent"
      ],
      estimatedTime: "4-6 weeks",
      progressPercentage: 100
    }
  ];

// Mobile menu functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMobileMenu() {
  mobileMenu.classList.toggle('active');
  const menuIcon = mobileMenuToggle.querySelector('.menu-icon');
  
  if (mobileMenu.classList.contains('active')) {
    menuIcon.style.background = 'transparent';
    menuIcon.style.transform = 'rotate(180deg)';
    menuIcon.previousElementSibling?.style.transform = 'rotate(45deg) translate(6px, 6px)';
    menuIcon.nextElementSibling?.style.transform = 'rotate(-45deg) translate(6px, -6px)';
  } else {
    menuIcon.style.background = '';
    menuIcon.style.transform = '';
    menuIcon.previousElementSibling?.style.transform = '';
    menuIcon.nextElementSibling?.style.transform = '';
  }
}

mobileMenuToggle.addEventListener('click', toggleMobileMenu);

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

function setActiveLink() {
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
      
      mobileNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Close mobile menu when clicking links
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    toggleMobileMenu();
  });
});