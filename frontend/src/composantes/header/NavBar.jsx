import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { User } from "lucide-react";
// Composantes & fonctions
import { useLocalization } from "../../state/contexts/LocalizationContext";
import ChangeLanguage from "./ChangeLanguage";
import shopEasyLogo from "../../assets/shopping-bag.svg";
import { useAuth } from "../../state/contexts/AuthContext";
import { logout } from "../../api/authentification";

import PATH from "../../ressources/routes/paths";
import LOCALIZE from "../../ressources/text/localize";

function NavBar() {
  const language = useLocalization();
  const { currentUser, setCurrentUser } = useAuth();
  async function handleLogout() {
    const isLoggedOut = await logout();
    if (isLoggedOut) {
      setCurrentUser(null);
    }
  }

  return (
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
      <Link to={PATH.home} className="flex items-center">
        <img className="size-8" src={shopEasyLogo} alt={LOCALIZE.header.logoAltText} />
        <span className="ml-2 text-2xl font-semibold text-stone-900">{LOCALIZE.title}</span>
      </Link>
      <NavigationMenu className="relative py-4 after:absolute after:inset-x-0 after:bottom-0 after:h-px">
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            {currentUser ? (
              <>
                <NavigationMenuTrigger className="text-stone-50!">
                  <User className="mr-2 h-4 w-4" />
                  {LOCALIZE.header.myProfile}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to={PATH.profile}
                          className="hover:text-accent-foreground! focus:bg-accent! focus:text-accent-foreground! flex w-full items-center! rounded-md border-none! bg-transparent! p-3 text-sm! leading-none! font-medium! text-stone-950! no-underline! transition-colors! outline-none! select-none hover:bg-stone-200!"
                        >
                          {LOCALIZE.header.myProfile}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="mr-2 h-full w-full border-none! bg-transparent! text-sm! font-medium! text-stone-950! hover:border-none! hover:bg-stone-200! focus-visible:outline-none!"
                      >
                        {LOCALIZE.header.navbarLogoutTitle}
                      </button>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  to={PATH.login}
                  className={`text-stone-950! ${navigationMenuTriggerStyle()} ${location.pathname === PATH.login ? "border border-black" : ""}`}
                >
                  {LOCALIZE.header.navbarLoginTitle}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                to={PATH.cart}
                className={`${navigationMenuTriggerStyle()} ${location.pathname === PATH.cart ? "border border-black" : ""}`}
              >
                {LOCALIZE.header.verifyCart}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ChangeLanguage />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default NavBar;
