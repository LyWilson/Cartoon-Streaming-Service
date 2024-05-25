import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import {svrURL} from "./constants.js";

export const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setAuthToken } = useAuth();

    const handleRegister = async () => {
        setError("");
        try {
            const response = await fetch(svrURL + "/auth/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password })
            });

            if (!response.ok) {
                throw new Error("Failed to register");
            }

            const data = await response.json();
            setAuthToken(data.token);
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <div className="container">
            <div className="section">
                <div className="content">
                    <div className="field">
                        <label className="label">email</label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="email"
                                placeholder="e2254323@site.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">username</label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="username"
                                placeholder="e2254323"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control has-icons-left">
                            <input
                                className="input"
                                type="password"
                                placeholder="*******"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        {error && <p className="help is-danger">{error}</p>}
                        <div className="control">
                            <button className="button is-success" onClick={handleRegister}>Inscrire</button>
                            <button className="button is-danger" onClick={handleCancel}>Annuler</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

