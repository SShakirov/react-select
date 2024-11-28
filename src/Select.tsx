import React, {useState} from 'react';
import UserItem from './UserItem';
import {User} from './types';
import './styles/select.scss';

interface SelectUsersProps {
  users: User[];
  onUserSelect: (user: User) => void;
  loading: boolean;
  hasMore: boolean;
  setPage: (page: number) => void;
}

const Select: React.FC<SelectUsersProps> = ({
  users,
  onUserSelect,
  loading,
  hasMore,
  setPage,
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
    const element = event.currentTarget;
    if (
      element.scrollTop + element.clientHeight >= element.scrollHeight &&
      hasMore &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    onUserSelect(user);
  };

  const toggleSelect = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='select'>
      <div onClick={toggleSelect} className='select__input'>
        <div className=''>
          {selectedUser && (
            <span>{`${selectedUser.last_name} ${selectedUser.first_name}`}</span>
          )}
        </div>

        <div
          className={'select__icon' + (isOpen ? ' select__icon-active' : '')}
        />
      </div>

      {isOpen && (
        <div className='select__wrapper'>
          <div className='select-list'>
            <ul onScroll={handleScroll} className=' select-list__container'>
              {users.map((user) => (
                <UserItem
                  key={user.id}
                  user={user}
                  className={
                    'select-list__item ' +
                    (selectedUser && user.id === selectedUser.id
                      ? 'select-list__item-active'
                      : '')
                  }
                  onUserSelect={handleUserSelect}
                />
              ))}

              {loading && <li>Loading...</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
