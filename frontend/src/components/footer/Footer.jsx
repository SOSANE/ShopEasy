import { useLocalization } from "../../state/contexts/LocalizationContext";

// Constants
import LOCALIZE from "../../ressources/text/localize";

function Footer() {
  const language = useLocalization();

  return (
    <footer className="footer fixed-bottom">
      <div className="text-center py-3">
        © 2025 Copyright:
        <a href="#"> {LOCALIZE.title}</a>
      </div>
    </footer>
  );
}

export default Footer;
