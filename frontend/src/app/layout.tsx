import { ReactNode } from 'react';
import type { Metadata } from 'next';
import './styles/globals.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Our API Server',
    description: 'A cool API server.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html>
            <body>
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <h1 className="text-xl font-semibold text-gray-900">User Management</h1>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"> {children}</main>
            </body>
        </html>
    );
}
