import { initials } from "../../utils/helpers.js";
import "./ProfileShell.css";

export default function ProfileShell({ user, roleLabel, onLogout, children }) {
  return (
    <div className="mc-profile">
      <header className="mc-pheader">
        <div className="mc-pheader-left">
          <span className="mc-avatar">{initials(user.name)}</span>
          <div>
            <h1>{user.name}</h1>
            <p className="mc-pid">
              {user.id} · {roleLabel}
            </p>
          </div>
        </div>
        <button className="mc-logout" onClick={onLogout}>
          Log out
        </button>
      </header>
      <div className="mc-pbody">{children}</div>
    </div>
  );
}
