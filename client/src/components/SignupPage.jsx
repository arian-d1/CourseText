export default function SignupPage() {
  return (
    <div>
      <form action="http://localhost:3000/api/sign-up" method="POST">
        <h1>Sign Up</h1>

        <label htmlFor="username">Username:</label>
        <input id="username" name="username" placeholder="" type="text" />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />

        <button type="submit">Sign Up</button>
      </form>

      <a href="/log-in">Login</a>
    </div>
  );
}
