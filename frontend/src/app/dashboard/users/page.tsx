import { UserList } from '@/app/components/users/UsersList';
import { API } from '@/services/api';

export default async function UsersPage() {
    let users = [];

    try {
        const response = await API.getAll();
        users = response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }

    return <UserList initialData={users} />;
}
