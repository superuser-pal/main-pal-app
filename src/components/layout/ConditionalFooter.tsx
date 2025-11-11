'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './footer';

// Routes where the footer should NOT be displayed (authenticated app routes)
const APP_ROUTES = [
  '/dashboard',
  '/settings',
  '/profile',
  '/subscriptions',
  '/library',
  '/prompts',
  '/dev/testnav',  // Test navigation pages
  '/dev/sidebar-demo',  // Sidebar demo page
];

export function ConditionalFooter() {
  const pathname = usePathname();

  // Check if current path is an app route
  const isAppRoute = APP_ROUTES.some(route => pathname.startsWith(route));

  // Don't render footer on app routes
  if (isAppRoute) {
    return null;
  }

  // Render footer on public pages
  return <Footer />;
}
