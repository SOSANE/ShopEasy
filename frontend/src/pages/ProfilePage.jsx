// Composantes & fonctions
import PageTemplate from "../composantes/PageTemplate";
import { useAuth } from "../state/contexts/AuthContext";
import { logout } from "../api/authentification";
import { useNavigate } from "react-router";
import { User, LogOut } from "lucide-react";

// Constantes
import LOCALIZE from "../ressources/text/localize";
import PATH from "../ressources/routes/paths";

function ProfilePage() {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    setCurrentUser(null);
    navigate(PATH.home);
  }

  if (!currentUser) {
    navigate(PATH.login);
    return null;
  }

  return (
    <PageTemplate>
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-8 flex flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-sm md:flex-row md:items-start md:gap-8">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-stone-100 text-stone-400">
            <User className="h-10 w-10" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-stone-900">{currentUser.username}</h2>
            <p className="text-stone-500">{currentUser.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full! border border-stone-200! bg-stone-950! px-4 py-2 text-sm font-medium text-stone-50! transition hover:bg-stone-200! hover:text-stone-950!"
          >
            <LogOut className="h-4 w-4" />
            {LOCALIZE.header.navbarLogoutTitle}
          </button>
        </div>
      </div>
    </PageTemplate>
  );
}

export default ProfilePage;
