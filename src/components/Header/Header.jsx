
// import Logo from '../Logo/Logo';
import s from './Header.module.css';
import cn from 'classnames';




const Header = ({user, updateUserHandle, children}) => {
    const handleClickButtonEdit = (e) => {
        e.preventDefault();
        updateUserHandle({name: "Арсений Филимонов", about: 'Разработчик'});
    }
    return (
        <header className={cn(s.header, 'js-click')}>
            <div className="container">
                {user?.email && <span>{user?.email}</span>}
                {user?.name ? <span>{user?.name}</span> : null}

                <button onClick={handleClickButtonEdit}>Изменить</button>

                <div className={s.wrapper}>
                    {children}
                </div>
            </div>
        </header>
    )
}

export default Header;