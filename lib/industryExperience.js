export const EXPERIENCE_TRACKS = [
  { slug: 'software-development', title: 'Software Development', summary: 'Work across modern web development, Git, APIs, databases, debugging and deployment workflows.', skills: ['Frontend & backend tasks', 'Git & GitHub workflow', 'APIs and databases', 'Debugging and code review', 'Deployment workflow'] },
  { slug: 'software-testing-qa', title: 'Software Testing & QA', summary: 'Build practical testing experience from requirements through execution, defects, retesting and regression.', skills: ['Test scenarios & cases', 'Defect reporting', 'Regression testing', 'UAT support', 'Agile delivery workflow'] },
  { slug: 'business-analysis', title: 'Business Analysis', summary: 'Translate business needs into clear requirements, user stories, process maps and acceptance criteria.', skills: ['Requirements analysis', 'User stories', 'Acceptance criteria', 'Process mapping', 'Stakeholder documentation'] },
  { slug: 'project-management', title: 'Project Management', summary: 'Gain hands-on exposure to planning, delivery tracking, RAID management, Agile ceremonies and reporting.', skills: ['Project plans & WBS', 'RAID management', 'Agile ceremonies', 'Status reporting', 'Delivery tracking'] },
  { slug: 'data-analytics', title: 'Data Analytics', summary: 'Use business data to produce useful analysis, reporting, dashboards and decision support.', skills: ['Data preparation', 'Excel & SQL exposure', 'Dashboards', 'Business reporting', 'Insight development'] },
  { slug: 'digital-marketing', title: 'Digital Marketing', summary: 'Work with digital campaigns, content, SEO, social channels and performance reporting.', skills: ['Campaign planning', 'SEO research', 'Social media', 'Content workflow', 'Analytics & reporting'] },
  { slug: 'ui-ux-product', title: 'UI/UX & Product', summary: 'Work on user journeys, usability, product requirements, wireframes and feature prioritisation.', skills: ['User journeys', 'Wireframes', 'Usability reviews', 'Product requirements', 'Backlog prioritisation'] },
  { slug: 'it-operations-support', title: 'IT Operations & Support', summary: 'Develop practical IT operations experience through support, troubleshooting, documentation and service processes.', skills: ['Incident handling', 'Request management', 'Troubleshooting', 'Knowledge documentation', 'Operational reporting'] },
  { slug: 'hr-people-operations', title: 'HR & People Operations', summary: 'Learn practical people operations through recruitment, onboarding, documentation and employee processes.', skills: ['Recruitment workflow', 'Candidate screening', 'Onboarding', 'HR documentation', 'People operations'] },
  { slug: 'business-operations', title: 'Business Operations', summary: 'Work on operational processes, SOPs, reporting, administration and continuous improvement.', skills: ['SOP development', 'Process improvement', 'Operational reporting', 'Administration', 'Workflow coordination'] },
  { slug: 'sales-customer-success', title: 'Sales & Customer Success', summary: 'Gain exposure to CRM, lead management, onboarding, customer support and account workflows.', skills: ['CRM workflow', 'Lead qualification', 'Customer onboarding', 'Support processes', 'Account reporting'] },
  { slug: 'event-technology-operations', title: 'Event Technology & Operations', summary: 'Work with digital ticketing, event setup, check-in operations, customer workflows and reconciliation.', skills: ['Event setup', 'Ticketing operations', 'Check-in workflow', 'Customer support', 'Reporting & reconciliation'] },
  { slug: 'ai-automation', title: 'AI & Automation', summary: 'Apply AI tools and automation to real business workflows, prototypes and operational use cases.', skills: ['AI workflow design', 'Prompt engineering', 'Automation use cases', 'Prototype development', 'Integration thinking'] },
]

export const EXPERIENCE_PACKAGES = [
  { code: 'foundation-1m', name: 'Foundation Experience', months: 1, price: 399, hours: 'Approx. 5 hours/week', description: 'Focused practical exposure, supervision, feedback and completion record.' },
  { code: 'professional-3m', name: 'Professional Experience', months: 3, price: 799, hours: 'Approx. 5–8 hours/week', description: 'Meaningful role-specific project exposure, mentoring and detailed completion/reference record.', popular: true },
  { code: 'advanced-6m', name: 'Advanced Professional Experience', months: 6, price: 1299, hours: 'Approx. 5–8 hours/week', description: 'Deeper multi-stage project exposure, regular feedback and detailed reference eligibility.' },
]

export const VISA_OPTIONS = [
  'New Zealand Citizen',
  'New Zealand Permanent Resident',
  'Resident Visa',
  'Student Visa',
  'Post Study Work Visa',
  'Accredited Employer Work Visa',
  'Partner Work Visa',
  'Other Work Visa',
  'Visitor Visa',
  'Other',
]

export function getTrack(slug) {
  return EXPERIENCE_TRACKS.find((track) => track.slug === slug)
}

export function getPackage(code) {
  return EXPERIENCE_PACKAGES.find((item) => item.code === code)
}
