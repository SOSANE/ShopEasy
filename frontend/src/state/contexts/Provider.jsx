import { LocalizationProvider } from "./LocalizationProvider";

/**
 * Pour composer plusieurs providers ensemble.
 * https://dev.to/fariasmateuss/compose-multiple-react-providers-4oc4
 */
function compose(providers) {
  return providers.reduce((Prev, Curr) => ({ children }) => (
    <Prev>
      <Curr>{children}</Curr>
    </Prev>
  ));
}

export const Provider = compose([LocalizationProvider]); // NP: Inclure tous les autres providers crees ici
