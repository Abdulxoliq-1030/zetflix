import { Link, NavLink } from "react-router-dom";

function NavBar({ user, onLogout }) {
  return (
    <nav className='navbar navbar-dark bg-dark '>
      <div className='container justify-content-between'>
        <Link
          style={{ fontSize: 50, cursor: "pointer" }}
          className='navbar-brand m-0 h1'
          to={user ? "/" : "/login"}>
          Zetflix
        </Link>
        <ul className='nav mb-2 mb-md-0'>
          {!user ? (
            <>
              <li className='nav-item'>
                <NavLink
                  activeClassName='nav-active'
                  className='nav-link'
                  to='/login'>
                  Login
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  activeClassName='nav-active'
                  className='nav-link'
                  to='/register'>
                  Register
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <div className='nav-link' onClick={onLogout}>
                {user.name}
              </div>
              <div className='nav-link' onClick={onLogout}>
                Log Out
              </div>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
