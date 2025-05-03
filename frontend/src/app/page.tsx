import { Button } from './components/ui/Button';
import type { Metadata } from 'next';
import Link from 'next/link';
import Layout from './layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const metadata: Metadata = {
    title: 'User Management System',
    description: 'Dashboard for managing users',
};

const queryClient = new QueryClient();

export default function HomePage() {
    // redirect('/users');

    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
                    <div className="text-center space-y-6 max-w-md">
                        1<h1 className="text-3xl font-bold tracking-tight text-gray-900">User Management System</h1>
                        <p className="text-lg text-gray-600">
                            Welcome to the user management dashboard. You&apos;ll be redirected to the users page.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button>
                                <Link href="/users" className="text-white">
                                    Go to Users
                                </Link>
                            </Button>
                            <Button variant="secondary">
                                <Link href="/users/new" className="text-white">
                                    Create New User
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Layout>
        </QueryClientProvider>
    );
}
