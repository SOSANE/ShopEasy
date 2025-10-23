// Components & fonction
import PageTemplate from "../../components/PageTemplate";
import { useLocalization } from "../../state/contexts/LocalizationContext";

// Constants
import LOCALIZE from "../../ressources/text/localize";


export function CreateProductPage() {
    const language = useLocalization();
    
    return (<PageTemplate title={LOCALIZE.createProductPage.title}></PageTemplate>);
}

export default CreateProductPage;