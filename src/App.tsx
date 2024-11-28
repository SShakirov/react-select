import  { useEffect, useState } from 'react';
import Select from './Select';
import { Response, User } from './types';
import './styles/app.scss'
const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchUsers = async (page: number) => {
      setLoading(true);
      const response = await fetch(`https://frontend-test-middle.vercel.app/api/users?page=${page}&limit=50`);
      const data: Response = await response.json();
      setUsers(prev => page === 1 ? [...data.data] :[...prev, ...data.data]);
      setHasMore(data.meta.to < data.meta.total);
      setLoading(false);
  };

  useEffect(() => {
      fetchUsers(page);
  }, [page]);

  const handleUserSelect = (user: User) => {
      setSelectedUser(user);
  };

  return (
      <div className='content'>
        <div className="">
          <div>Users</div>
          <Select users={users} onUserSelect={handleUserSelect} loading={loading} hasMore={hasMore} setPage={setPage} />
          
        </div>
      </div>
  );
};

export default App
