import React, { useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'
import {AuthContext} from '../context/auth'
const MenuBar = () => {

    const {user:{user},logout} = useContext(AuthContext)

    const history = useHistory();
    const params = history.location.pathname
    const path = params === '/' ? 'home' : params.substr(1);
    const [activeItem, setActiveItem] = useState(path);
    
    const handleItemClick = (e,{name}) => {
        setActiveItem(name);
    }


    const menuBar = user ? (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item name={user.email} content={user.email} active as={Link} to="/" />
            <Menu.Menu position="right">
                <Menu.Item name="logout" onClick={handleItemClick} />
            </Menu.Menu>
        </Menu>
    ) : (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
                name="home"
                active={activeItem === "home"}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />
            <Menu.Item
                right
                name="login"
                active={activeItem === "login"}
                onClick={handleItemClick}
                as={Link}
                to="/login"
            />
            <Menu.Item
                name="register"
                active={activeItem === "register"}
                onClick={handleItemClick}
                as={Link}
                to="/register"
            />
            <Menu.Menu position="right">
                <Menu.Item
                    name="logout"
                    active={activeItem === "logout"}
                    onClick={handleItemClick}
                />
            </Menu.Menu>
        </Menu>
    );

    return menuBar
}


export default MenuBar;