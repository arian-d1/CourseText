export default function UserDashboard({ username }) {
  return (
    <div className="dashboard">
      <h1>Welcome, {username}!</h1>

      <div className="user-info">
        <p>
          <strong>Username:</strong> {username}
        </p>
      </div>

      <div className="actions">
        <button>Edit Profile</button>
        <button>Log Out</button>
      </div>
    </div>
  );
}
