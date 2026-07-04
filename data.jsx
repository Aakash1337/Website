// Data file - shared by all modes
const PORTFOLIO = {
  name: "Aakash Joshi",
  handle: "@aakash1337",
  role: "Security Engineer",
  tagline: "Threat hunter. Incident responder. Blue team operator.",
  bio: "Cybersecurity analyst with experience in threat hunting, SIEM-based monitoring, incident response support, and cyber investigations. Skilled in alert triage, log analysis, evidence collection, and investigative documentation.",
  location: "University Park, PA",
  email: "[contact via LinkedIn]",
  phone: "+1 (814) 270-0077",
  links: {
    github: "https://github.com/Aakash1337",
    linkedin: "#",
    email: "mailto:#",
    resume: "uploads/Resume.pdf"
  },
  education: [
    {
      school: "Pennsylvania State University",
      location: "University Park, PA",
      degree: "M.S. Cybersecurity Analytics and Operations",
      period: "Aug 2024 — Present",
      gpa: "3.93 / 4.00"
    },
    {
      school: "Vardhaman College of Engineering",
      location: "Hyderabad, Telangana",
      degree: "B.Tech, Information Technology",
      period: "Dec 2020 — May 2024",
      gpa: "7.55 / 10.00"
    }
  ],
  experience: [
    {
      company: "Cybic",
      role: "Security Engineer",
      period: "Feb 2026 — Present",
      location: "Remote",
      bullets: [
        "Conducted end-to-end cyber investigations: alert triage, log analysis, evidence collection, timeline reconstruction for insider threat and security risk activity.",
        "Performed proactive threat hunting across SIEM and enterprise telemetry to detect anomalous behavior and uncover potential data exfiltration.",
        "Analyzed network and security events using TCP/IP, DNS, and HTTP/S to identify suspicious communications and support incident investigations.",
        "Supported SOC and incident response workflows by triaging alerts, escalating actionable findings, and documenting investigative outcomes.",
        "Produced detailed investigative reports and collaborated with cross-functional stakeholders on response to insider and cyber-related incidents."
      ]
    },
    {
      company: "CCSO — Penn State",
      role: "Blue Team Analyst",
      period: "Aug 2024 — Present",
      location: "University Park, PA",
      bullets: [
        "Performed blue-team analysis during competitive cyber defense exercises: alert triage, log review, and investigation of suspicious host and network activity.",
        "Supported incident response and system hardening efforts in simulated enterprise environments by identifying vulnerabilities and validating findings.",
        "Worked in team-based competition settings to analyze attacker behavior, document issues, and communicate remediation priorities under operational pressure."
      ]
    }
  ],
  skills: {
    "Cyber Investigations": ["Alert triage", "Evidence analysis", "Timeline development", "Investigative documentation", "Case reporting"],
    "Threat Detection & Response": ["Threat hunting", "SIEM monitoring", "Log correlation", "Incident response"],
    "Networking & Analysis": ["TCP/IP", "DNS", "HTTP/S", "Network traffic analysis"],
    "Tools": ["Splunk", "Wireshark", "Burp Suite", "Nmap", "BloodHound", "ZAP"],
    "Platforms": ["Linux", "Windows", "Active Directory", "AWS"],
    "Languages": ["Python", "Bash", "PowerShell", "Go", "Rust"]
  },
  skillsLevels: [
    { name: "Threat Hunting", level: 92, cat: "detection" },
    { name: "SIEM / Splunk", level: 88, cat: "detection" },
    { name: "Incident Response", level: 85, cat: "detection" },
    { name: "Log Analysis", level: 90, cat: "detection" },
    { name: "Wireshark / PCAP", level: 82, cat: "network" },
    { name: "Network Forensics", level: 78, cat: "network" },
    { name: "Burp Suite", level: 75, cat: "offensive" },
    { name: "Nmap", level: 84, cat: "offensive" },
    { name: "BloodHound", level: 80, cat: "offensive" },
    { name: "Python", level: 86, cat: "code" },
    { name: "Bash / PowerShell", level: 88, cat: "code" },
    { name: "Go", level: 70, cat: "code" },
    { name: "Rust", level: 62, cat: "code" }
  ],
  projects: [
    {
      id: "siem-lab",
      name: "Home SIEM Lab",
      tag: "[DETECTION]",
      year: "2025",
      stack: ["Splunk", "Sysmon", "Atomic Red Team", "Windows AD"],
      summary: "Multi-VM detection lab simulating an enterprise Active Directory environment with custom Splunk detections for ATT&CK techniques.",
      details: "Self-hosted lab pairing a Windows AD domain with a Splunk indexer + forwarders. Sysmon ships endpoint telemetry; Atomic Red Team scripts replay 40+ ATT&CK techniques. Wrote ~20 SPL detections covering credential dumping, lateral movement, and persistence.",
      severity: "INFO"
    },
    {
      id: "ccdc-blueteam",
      name: "CCDC 2026 — Blue Team Playbook",
      tag: "[BLUE-TEAM]",
      year: "2026",
      stack: ["Linux", "Windows", "Active Directory", "Bash", "PowerShell"],
      summary: "Hardening playbook + automated triage scripts used during the 2026 Collegiate Cyber Defense Competition.",
      details: "First-15-minutes hardening checklist, automated baseline scripts for Windows + Linux hosts, and a triage runbook for common red-team TTPs. Helped team maintain service uptime under live attack.",
      severity: "MED"
    },
    {
      id: "phish-triage",
      name: "phish-triage",
      tag: "[AUTOMATION]",
      year: "2025",
      stack: ["Python", "VirusTotal API", "URLscan", "regex"],
      summary: "CLI tool that ingests suspicious emails and returns a triage verdict with IOC enrichment.",
      details: "Parses .eml files, extracts headers, URLs, and attachments, enriches IOCs through VT and URLscan, scores against weighted heuristics, and emits a JSON triage report consumable by SOAR pipelines.",
      severity: "LOW"
    },
    {
      id: "ad-hunt",
      name: "ad-hunt",
      tag: "[THREAT-HUNT]",
      year: "2025",
      stack: ["BloodHound", "Python", "Neo4j", "PowerShell"],
      summary: "Active Directory attack-path analyzer that flags risky configurations beyond default BloodHound queries.",
      details: "Custom Cypher queries + Python wrapper to surface kerberoastable accounts with high privilege, unconstrained delegation, and shadow-credential primitives. Outputs Markdown report with prioritized remediations.",
      severity: "HIGH"
    },
    {
      id: "ncae-2025",
      name: "NCAE Cybergames 2025",
      tag: "[COMPETITION]",
      year: "2025",
      stack: ["Linux", "Windows", "Snort", "Suricata", "ELK"],
      summary: "Blue-team competition placing focus on real-time defense against simulated APT activity.",
      details: "Competed as defender against live red team. Tuned Suricata + Snort, built ELK dashboards on the fly, and led incident communication for the team.",
      severity: "MED"
    },
    {
      id: "pcap-toolkit",
      name: "pcap-toolkit",
      tag: "[FORENSICS]",
      year: "2024",
      stack: ["Python", "Scapy", "tshark", "Pandas"],
      summary: "Helper toolkit for fast PCAP triage during CTFs and live investigations.",
      details: "Wraps tshark + Scapy with opinionated defaults: extracts HTTP objects, decodes common C2 patterns, builds connection timelines, exports to CSV/Pandas for analysis.",
      severity: "INFO"
    }
  ],
  certs: [
    { name: "CompTIA Security+", status: "earned" },
    { name: "Google Cybersecurity Professional", status: "earned" },
    { name: "Constructing Defense Path — Just Hacking", status: "earned" },
    { name: "NCAE Cybergames — Blue Team", status: "2025" },
    { name: "CCDC", status: "2026" },
    { name: "HTB CPTS", status: "in-progress" }
  ],
  posts: [
    { title: "Detecting Kerberoasting at scale with Splunk", date: "2026.04.18", tag: "DETECTION", read: "8 min" },
    { title: "Inside a CCDC defense — first 15 minutes", date: "2026.03.02", tag: "BLUE-TEAM", read: "12 min" },
    { title: "Building a phishing triage pipeline in Python", date: "2025.11.21", tag: "AUTOMATION", read: "6 min" },
    { title: "AD attack paths I keep finding (and how to fix them)", date: "2025.09.05", tag: "THREAT-HUNT", read: "10 min" }
  ]
};

window.PORTFOLIO = PORTFOLIO;

// ASCII portrait — hooded figure
const ASCII_PORTRAIT = String.raw`                         ▒▒▒▒░░
                       ▒▓▒▒▒▒▒▒▒░
                      ▓▓▒▒░  ░░▒▒▒
                     ▓▓▒░       ▒▒▒
                    ▓▓▒░         ▒▒▒
                   ▓▓▓░           ▒▒▒
                  ▒▓▓▒            ░▒▒░
                  ▓▓▒              ░▒▒
                 ▒▓▓░               ▒▒░
                ░▓▒▒  ░░░░          ▒▒▒░
                ▓▒▒░░▒░░░░░░         ▒▒▒
                ▓▒▒░▒▒▒░░░░░         ░▒▒
                ▓▒░▓▓▓▒░░ ░▒░         ▒▒
                ▓▒░▓▓▓▓▒▒▒▓▒░░        ░▒
                ▓▒░▓▓▓▓▓▓▒▓▒░         ░░
                ▒▒░▓█▓▓▓▓▒▒▒░         ░░
                 ▒▒▒▓▓▓▓▒▒▒░░░░      ░░
                  ▒▒▒▓▓▒▒▒▒░░░░     ░░
                   ░▒▒▓▒▒▒▒░░░     ░
                     ░▒░░░░░     ░
                       ░░░░░░░░░
                      ░▒▒▒▒▒▒▒▒░░░
                   ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
                 ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
                ░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░
               ░░░▒▒▒░░░░░░░░░░░░░░░░░░░░
              ░░░▒░░░░░░░░░  ░░░░░░░░░░░░░
             ░░░▒░  ░░░░░░░  ░░░░░░░░ ░░░░░
             ░░▒░░  ░░░░░░░  ░░░░░░░  ░░░░░
            ░░▒░░░░  ░░░░░░  ░░░░░░░  ░░░░░░
            ░▒░░░░░  ░░░░░░  ░░░░░░  ░░░░░░░
            ░░░░░░░   ░░░░░  ░░░░░░  ░░░░░░░
            ░░░░░░░   ░░░░░  ░░░░░   ░░░░░░░░
           AAKASH JOSHI // SEC-ENGINEER`;

window.ASCII_PORTRAIT = ASCII_PORTRAIT;
