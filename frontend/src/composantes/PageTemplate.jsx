// Composantes & fonctions
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { useLocalization } from "../state/contexts/LocalizationContext";


function PageTemplate({ children, title }) {
  const language = useLocalization();

  return (
    <>
      <Header />
      <main className="max-w-full text-stone-900">
        <h1 className="mb-6 font-semibold">{title}</h1>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default PageTemplate;
