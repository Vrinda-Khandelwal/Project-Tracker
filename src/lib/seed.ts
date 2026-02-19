import type { Project } from './types'

export const seedProjects: Project[] = [
  {
    id: 'p_aurora_001',
    name: 'Aurora KPI Audit',
    clientName: 'Aurora Health',
    status: 'Audit',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    description:
      'Discovery and audit of current analytics setup, KPI definitions, and reporting cadence. Goal is to align stakeholders and identify measurement gaps.',
    phase: 'Discovery + Audit',
    notes:
      'Access granted to GA4 and HubSpot. KPI list drafted; pending validation with Head of Growth. Identified event naming inconsistencies across web + app.',
    nextAction: 'Run stakeholder workshop and finalise KPI taxonomy.',
  },
  {
    id: 'p_northwind_002',
    name: 'Northwind Funnel Optimisation',
    clientName: 'Northwind Labs',
    status: 'Optimisation',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    description:
      'Improve trial-to-paid conversion by refining onboarding, messaging, and activation triggers. A/B tests and qualitative feedback loops.',
    phase: 'Experimentation',
    notes:
      'Hypothesis backlog created. Test 1 (shorter onboarding) shows +7% activation in early read. Need to verify with full sample size.',
    nextAction: 'Ship Test 2 for pricing page clarity and track cohort results.',
  },
  {
    id: 'p_summit_003',
    name: 'Summit Scaling Sprint',
    clientName: 'Summit Robotics',
    status: 'Scaling',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    description:
      'Scale acquisition and operations for new markets. Focus on channel expansion, monitoring, and process reliability.',
    phase: 'Scale-up',
    notes:
      'Paid search structure reworked. Weekly performance dashboard live. Ops checklist updated for new market launches.',
    nextAction: 'Define guardrails and alerts for CAC and lead quality by region.',
  },
  {
    id: 'p_ember_004',
    name: 'Ember Retrospective',
    clientName: 'Ember Finance',
    status: 'Completed',
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    description:
      'Wrap-up, documentation, and handover after a successful optimisation cycle including dashboards and playbooks.',
    phase: 'Handover',
    notes:
      'Documentation delivered. Team trained on dashboard usage. Final report shared with stakeholders.',
    nextAction: 'Optional: quarterly check-in to review KPI drift and new initiatives.',
  },
]
