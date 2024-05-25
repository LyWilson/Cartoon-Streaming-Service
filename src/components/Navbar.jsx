import { Link } from "react-router-dom";
import { useAuth } from "../Auth";

export function Navbar() {
    const { isAuthenticated, clearAuthToken } = useAuth();

    const handleLogout = () => {
        clearAuthToken();
        window.location.href = "/";

    };

    return (
        <nav className="navbar has-background-link" role="navigation" aria-label="main navigation">
            <div className="navbar-brand has-background-link">
                <Link className="navbar-item has-text-white" to="/">
                    TP2
                </Link>
            </div>
            <div className="navbar-menu has-background-link">
                {!isAuthenticated && (
                    <div className="navbar-end">
                        <Link className="has-text-white navbar-item" to="/register">
                            Sign up
                        </Link>
                        <Link className="has-text-white navbar-item" to="/login">
                            Log in
                        </Link>
                        <Link className="has-text-white navbar-item" to="/about">
                            About
                        </Link>
                    </div>
                )}
                {isAuthenticated && (
                    <div className="navbar-end">
                    <Link className="has-text-white navbar-item" to="/history">
                    History
                    </Link>
                    <Link className="has-text-white navbar-item" to="/profile">
                    Profile
                    </Link>
                    <button className="has-text-white navbar-item has-background-link" onClick={handleLogout}>
                    Logout
                    </button>
                        <Link className="has-text-white navbar-item" to="/about">
                            About
                        </Link>
                    </div>
    )
}
</div>

        </nav>
    );
}

