export default function LoginPage() {
  return (
    <div>
      <form
        action="/log-in"
        method="POST"
    >
        <h1>Log in</h1>

        <label htmlFor="username">Username:</label>
        <input id="username" name="username" placeholder="" type="text" />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />

        <button type="submit">Sign Up</button>
      </form>
      <a href="/sign-up">SignUp</a>
    </div>
  );
}
