import { NavigationConfig } from '@/types/navigation';

// Static registry of all navigation pages
// This approach avoids Next.js TypeScript conflicts with page exports
export const NAVIGATION_REGISTRY: Record<string, NavigationConfig> = {
  '/dashboard': {
    title: 'Dashboard',
    sidebar: {
      enabled: true,
      section: 'Dashboard',
      icon: 'Home',
    },
    breadcrumb: {
      path: ['Dashboard'],
    },
  },

  '/subscriptions': {
    title: 'Subscriptions',
    sidebar: {
      enabled: true,
      section: 'Subscriptions',
      icon: 'Settings',
    },
    breadcrumb: {
      path: ['Subscriptions'],
    },
  },

  '/dev/testnav': {
    title: 'Test Navigation',
    sidebar: {
      enabled: true,
      section: 'TestNav',
      icon: 'Home',
    },
    breadcrumb: {
      path: ['TestNav'],
    },
  },
  
  '/dev/testnav/analytics': {
    title: 'Analytics Overview',
    sidebar: {
      enabled: true,
      section: 'Analytics',
      icon: 'BarChart3',
    },
    breadcrumb: {
      path: ['TestNav', 'Analytics'],
    },
  },

  '/dev/testnav/analytics/reports': {
    title: 'Analytics Reports',
    sidebar: {
      enabled: true,
      section: 'Analytics',
      subsection: 'Reports',
      icon: 'FileText',
    },
    breadcrumb: {
      path: ['TestNav', 'Analytics', 'Reports'],
    },
  },

  '/dev/testnav/analytics/reports/users': {
    title: 'User Reports',
    sidebar: {
      enabled: true,
      section: 'Analytics',
      subsection: 'Reports',
      icon: 'Users',
    },
    breadcrumb: {
      path: ['TestNav', 'Analytics', 'Reports', 'Users'],
    },
  },

  '/dev/testnav/settings': {
    title: 'Settings Overview',
    sidebar: {
      enabled: true,
      section: 'Settings',
      icon: 'Settings',
    },
    breadcrumb: {
      path: ['TestNav', 'Settings'],
    },
  },

  '/dev/testnav/settings/profile': {
    title: 'Profile Settings',
    sidebar: {
      enabled: true,
      section: 'Settings',
      subsection: 'Profile',
      icon: 'User',
    },
    breadcrumb: {
      path: ['TestNav', 'Settings', 'Profile'],
    },
  },
};