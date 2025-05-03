'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { CreateUserInterface, createUserSchema } from '@/services/interfaces/create-user.interface';
import { Input } from '../ui/Input';
import Link from 'next/link';

export function UserForm({
    initialData,
    onSubmit,
    isSubmitting,
}: {
    initialData?: CreateUserInterface;
    onSubmit: (data: CreateUserInterface) => Promise<void>;
    isSubmitting: boolean;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUserInterface>({
        resolver: zodResolver(createUserSchema),
        defaultValues: initialData || {
            name: '',
            email: '',
        },
    });

    return (
        <Card>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <Input id="name" {...register('name')} error={errors.name?.message} />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <Input id="email" type="email" {...register('email')} error={errors.email?.message} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                        </label>
                    </div>
                </div>

                <div className="flex justify-end space-x-3">
                    <Button type="button" variant="secondary">
                        <Link href="/users" className="text-gray-500 hover:text-gray-700">
                            Cancel
                        </Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
