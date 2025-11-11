'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { NAVIGATION_REGISTRY } from '@/lib/navigation-registry';

export default function DashboardPage() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const navigationConfig = NAVIGATION_REGISTRY[pathname];

  if (loading) {
    return (
      <MainLayout config={navigationConfig} pathname={pathname}>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return null; // Middleware will redirect
  }

  return (
    <MainLayout config={navigationConfig} pathname={pathname}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back, {user?.fullName || user?.email}!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Account Info</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Email:</span> {user?.email}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Member since:</span>{' '}
                  {new Date(user?.createdAt || '').toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Email verified:</span>{' '}
                  {user?.emailConfirmed ? 'Yes' : 'No'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your authentication is working! 🎉
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This is a protected page that requires authentication.
                </p>
                <div className="pt-2">
                  <LogoutButton variant="destructive" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}