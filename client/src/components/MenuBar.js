import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

const MenuBar = () => {
    const history = useHistory();
    const params = history.location.pathname
    const path = params === '/' ? 'home' : params.substr(1);
    const [activeItem, setActiveItem] = useState(path);
    
    const handleItemClick = (e,{name}) => {
        setActiveItem(name);
    }
    
    

    return (
        <Menu pointing secondary size="massive" color="teal">
            <Menu.Item
                name="home"
                active={activeItem === "home"}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />
            <Menu.Item right
                name="login"
                active={activeItem === "login"}
                onClick={handleItemClick}
                as={Link}
                to='/login'
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
}


export default MenuBar;