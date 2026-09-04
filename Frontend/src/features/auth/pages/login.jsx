import React from 'react';
import '../auth.form.scss';
import { Link } from 'react-router';
import { useAuth } from '../auth.context.jsx';

function Login() {
    const { loading, handleLogin } = useAuth();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(email, password);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <div className="form-container">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email:</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password:</label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className="button primary-button"
                        type="submit"
                    >
                        Login
                    </button>
                </form>

                <p>
                    Don't have an account?{' '}
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </main>
    );
}

export default Login;