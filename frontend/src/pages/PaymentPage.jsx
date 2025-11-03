// Components & fonction
import PageTemplate from "../components/PageTemplate";
import PaymentForm from "./PaymentForm";
import { useLocalization } from "../state/contexts/LocalizationContext";

// Constants
import LOCALIZE from "../ressources/text/localize";

export function PaymentPage() {
    const language = useLocalization();
    
    return (
        <PageTemplate title={LOCALIZE.paymentPage.title}>
            <p>{LOCALIZE.paymentPage.text1}</p>
            <PaymentForm />
        </PageTemplate>
    );
}

export default PaymentPage;