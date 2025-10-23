// Components & fonction
import PageTemplate from "../../components/PageTemplate";
import { useLocalization } from "../../state/contexts/LocalizationContext";

// Constants
import LOCALIZE from "../../ressources/text/localize";


export function ProductDetailsPage() {
    const language = useLocalization();
    
    return (<PageTemplate title={LOCALIZE.productDetailsPage.title}></PageTemplate>);
}

export default ProductDetailsPage;