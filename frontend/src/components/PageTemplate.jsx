// Components
import ChangeLanguage from "./header/ChangeLanguage";

function PageTemplate({ children, title }) {
  return (
    <>
      <h1>{title}</h1>
      <ChangeLanguage />
      {children}
    </>
  );
}

export default PageTemplate;
