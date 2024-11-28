import React, { memo } from 'react';
import { User } from './types';
import './styles/userItem.scss';

interface UserItemProps {
    user: User;
    onUserSelect: (user: User) => void;
    className: string;
}

const UserItem: React.FC<UserItemProps> = memo(({ user, onUserSelect, className }: UserItemProps) => {
    const placeholder = user.last_name.charAt(0).toUpperCase();

    return (
      <button className={'list-item ' + className} onClick={() => onUserSelect(user)}>
        <li className='list-item__container'>
            <div className='list-item__icon'>
                {placeholder}
            </div>
            <div className='list-item__text'>
                <div>{`${user.last_name} ${user.first_name}, `}</div>
                <div>{user.job || 'Нет должности'}</div>
            </div>
        </li>
      </button>
    );
});

export default UserItem;