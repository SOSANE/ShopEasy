// Components & fonction
import PageTemplate from "../../components/PageTemplate";
import { useLocalization } from "../../state/contexts/LocalizationContext";

// Constants
import LOCALIZE from "../../ressources/text/localize";


export function EditProductPage() {
    const language = useLocalization();
    
    return (<PageTemplate title={LOCALIZE.editProductPage.title}></PageTemplate>);
}

export default EditProductPage;