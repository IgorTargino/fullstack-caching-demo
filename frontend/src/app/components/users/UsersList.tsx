/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useQuery } from '@tanstack/react-query';
import { Table } from '../ui/Table';
import { Button } from '../ui/Button';
import { API } from '@/services/api';
import { Card } from '../ui/Card';
import Link from 'next/link';

export function UserList({ initialData }: { initialData?: any }) {
    const {
        data: users,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['users'],
        queryFn: API.getAll,
        initialData,
    });

    if (isLoading) return <div>Loading users...</div>;
    if (error) return <div>Error loading users</div>;

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await API.delete(id);
                await users.refetch();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <Card>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Users</h2>
                <Button>
                    <Link href="/users/new" className="text-white">
                        Add User
                    </Link>
                </Button>
            </div>

            <Table headers={['Name', 'Email', 'Role', 'Status']}>
                {users?.data?.map((user: any) => (
                    <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                        {/* <td className="px-6 py-4 whitespace-nowrap">
                            <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}
                            >
                                {user.status}
                            </span>
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link href={`/users/${user.id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                                Edit
                            </Link>
                            <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </Table>
        </Card>
    );
}
