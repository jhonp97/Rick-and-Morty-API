import { NavLink } from 'react-router-dom'
import ThemeToggle from '@/components/ThemeToggle'

const Nav = () => {
    return (
        <header className="Header">
            <nav className="Nav">
                <NavLink to="/personajes">Personajes</NavLink>
                <NavLink to="/lugares">Lugares</NavLink>
                <NavLink to="/episodios">Episodios</NavLink>
                <ThemeToggle />
            </nav>
        </header>
    );
}

export default Nav;
