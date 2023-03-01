
// import Logo from '../Logo/Logo';
// import Search from '../Search/Search';
import './index.css';



const Header = ({children}) => {
    return (
        <header className='header'>
            <div className="container">
                <div className="header__wrapper">
                {children}
                </div>
            </div>
        </header>
    )
}

export default Header;