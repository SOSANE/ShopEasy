// Composantes & fonctions
import NavBar from "./NavBar";
import { useLocalization } from "../../state/contexts/LocalizationContext";

import { useEffect, useState } from "react";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const language = useLocalization();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setHidden(true); // cache quand on descend
      } else {
        setHidden(false); // montre quand on remonte
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    
    <header
      
      className={`bg-[#ffffff] sticky top-0 w-full z-50 shadow-md transition-transform duration-500 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {<NavBar />}
    </header>
  );
}
