// Composantes & fonctions
import { Link } from "react-router";
import { useLocalization } from "../state/contexts/LocalizationContext";
import PageTemplate from "../composantes/PageTemplate";
import { Home } from "lucide-react";

// Constantes
import LOCALIZE from "../ressources/text/localize";
import PATH from "../ressources/routes/paths";

function Error404Page() {
  const language = useLocalization();

  return (
    <PageTemplate>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-9xl font-black text-stone-200!">{LOCALIZE.error404page.error}</h1>
        <h2 className="mt-4 text-2xl font-bold text-stone-900!">{LOCALIZE.error404page.title}</h2>
        <p className="mt-2 max-w-md text-stone-500!">{LOCALIZE.error404page.text1}</p>

        <Link
          to={PATH.home}
          className="mt-8 flex items-center gap-2 rounded-full bg-stone-900! px-6 py-3 font-medium text-white! transition hover:bg-stone-800!"
        >
          <Home className="h-4 w-4" />
          {LOCALIZE.error404page.backHome}
        </Link>
      </div>
    </PageTemplate>
  );
}

export default Error404Page;
