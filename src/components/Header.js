import { NavLink } from 'react-router-dom';
import { pages } from '../utils/utils';
import './Header.css';

function Header() {

    return <>
        <div className="header">
            <div className="logo">Retailer Shop</div>
            <div className="user-info">
                <div className="user-name">Admin Name</div>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#04AA6D" className="feather feather-user">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm0 1.5c-2.49 0-7.5 1.26-7.5 3.75V18h15v-1.75c0-2.49-5.01-3.75-7.5-3.75z"></path>
                </svg>
            </div>
        </div>
        <div className="nav">
            {pages.map((record, key) => (
                <NavLink key={`page-${key}`} to={`${record.path}`}
                className={({isActive})=>{
                    return isActive ? 'active-nav':''
                }}
                >{record.name}</NavLink>
            ))}
        </div>
    </>
}

export default Header;
