import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Search, User, ShoppingCart, Store, Languages } from "lucide-react";
// Composantes & fonctions
import { useLocalization } from "../../state/contexts/LocalizationContext";
import ChangeLanguage from "./ChangeLanguage";
import shopEasyLogo from "../../assets/shopping-bag.svg";
import { Link } from "react-router";
import { useAuth } from "../../state/contexts/AuthContext";
import { logout } from "../../api/authentification";

// Constantes
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
    // <nav className="relative py-4 shadow-md after:absolute after:inset-x-0 after:bottom-0 after:h-px">
    //   <div className="mx-auto flex items-center px-8">
    //     <div className="w-2/3 max-w-full">
    //       <Link to={PATH.home} className="flex w-full items-center justify-start">
    //         <img className="size-8" src={shopEasyLogo} alt={LOCALIZE.header.logoAltText} />
    //         <span className="ml-2 text-2xl font-semibold text-stone-900">{LOCALIZE.title}</span>
    //       </Link>
    //     </div>

    //     <div className="flex w-1/3 items-center justify-end bg-white">
    //       <Link to={PATH.cart} className="pr-3">
    //         {LOCALIZE.header.verifyCart}
    //       </Link>
    //       {currentUser ? (
    //         <button
    //           onClick={() => handleLogout()}
    //           className="mr-2 bg-transparent! text-stone-950! hover:bg-stone-200!"
    //         >
    //           {LOCALIZE.header.navbarLogoutTitle}
    //         </button>
    //       ) : (
    //         <Link to={PATH.login} className="pr-3">
    //           {LOCALIZE.header.navbarLoginTitle}
    //         </Link>
    //       )}

    //       <ChangeLanguage />
    //     </div>
    //   </div>
    // </nav>
    <NavigationMenu className="relative py-4 after:absolute after:inset-x-0 after:bottom-0 after:h-px">
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem className="mx-auto flex items-center px-8 text-stone-50!">
          <NavigationMenuLink className="w-2/3 max-w-full" asChild>
            <Link to={PATH.home} className="flex w-full items-center justify-start">
              <img className="size-8" src={shopEasyLogo} alt={LOCALIZE.header.logoAltText} />
              <span className="ml-2 text-2xl font-semibold text-stone-900">{LOCALIZE.title}</span>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>

      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem className="flex">
          <NavigationMenuLink asChild>
            <Link to={PATH.cart} className="pr-3">
              {LOCALIZE.header.verifyCart}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="flex">
          <ChangeLanguage />
        </NavigationMenuItem>
        <NavigationMenuItem className="flex">
          {currentUser ? (
            <>
              <NavigationMenuTrigger className="text-stone-50!">
                <User className="mr-2" />
                {LOCALIZE.header.myProfile}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-4">
                  <li>
                    {/* <NavigationMenuLink> */}
                    <button
                      onClick={() => handleLogout()}
                      className="mr-2 h-full w-full bg-transparent! text-stone-950! hover:border-none! hover:bg-stone-200! focus-visible:outline-none!"
                    >
                      {LOCALIZE.header.navbarLogoutTitle}
                    </button>
                    {/* </NavigationMenuLink> */}
                  </li>
                  <li>
                    <NavigationMenuLink>
                      <Link to={PATH.profile} className="pr-3">
                        {LOCALIZE.header.myProfile}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </>
          ) : (
            <NavigationMenuLink asChild>
              <Link to={PATH.login} className="pr-3">
                {LOCALIZE.header.navbarLoginTitle}
              </Link>
            </NavigationMenuLink>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavBar;
