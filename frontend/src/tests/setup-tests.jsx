import { render } from "@testing-library/react";
import { Provider } from "./ProviderTest";

// renderProvider sera utilisé pour remplacer render() de @testing-library/react
// afin de prendre en compte les contextes (localization/auth)
export function renderProvider(children, { props }) {
  render(<Provider {...props}>{children}</Provider>);
}
