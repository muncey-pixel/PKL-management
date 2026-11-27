
function Login() {
  return (
    <div className="login-page">
      <form className="login-card">
        <h2>PKL System</h2>
        <p>Silakan masuk ke akun kamu.</p>

        <label>Email</label>
        <input
          type="email"
          placeholder="Masukkan email"
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Masukkan password"
        />

        <button type="button" className="primary-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
