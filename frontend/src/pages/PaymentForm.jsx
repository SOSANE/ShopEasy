import { useState } from "react";

// Components & fonction
import PageTemplate from "../components/PageTemplate";
import { useLocalization } from "../state/contexts/LocalizationContext";

// Constants
import LOCALIZE from "../ressources/text/localize";

export function PaymentForm() {
    const language = useLocalization();
    const [formData, setFormData] = useState({
        name: "",
        num: "",
        dateExp: "",
        cvv: "",
    });

    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    // Fonction pour gérer les changements dans les inputs
    function handleChange(e) {
        const { name, value } = e.target;
        
        let formattedValue = value;

        // Formatage automatique selon le champ
        switch(name) {
            case 'num':
                // Formater le numéro de carte avec des espaces tous les 4 chiffres
                formattedValue = value
                    .replace(/\s/g, '') // Enlever les espaces
                    .replace(/\D/g, '') // Garder seulement les chiffres
                    .replace(/(\d{4})/g, '$1 ') // Ajouter un espace tous les 4 chiffres
                    .trim()
                    .substring(0, 19); // Max 16 chiffres + 3 espaces
                break;

            case 'dateExp':
                // Formater la date MM/AA
                formattedValue = value
                    .replace(/\D/g, '') // Garder seulement les chiffres
                    .replace(/(\d{2})(\d)/, '$1/$2') // Ajouter le slash après 2 chiffres
                    .substring(0, 5); // Max 5 caractères (MM/AA)
                break;

            case 'cvv':
                // Limiter à 3 chiffres
                formattedValue = value
                    .replace(/\D/g, '') // Garder seulement les chiffres
                    .substring(0, 3); // Max 3 chiffres
                break;

            case 'name':
                // Pas de formatage spécial pour le nom
                formattedValue = value;
                break;
        }

        setFormData({ ...formData, [name]: formattedValue });

        // Effacer l'erreur pour ce champ quand l'utilisateur tape
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    }

    // Fonction de validation
    function validateForm() {
        const newErrors = {};

        // Valider le nom
        if (!formData.name.trim()) {
            newErrors.name = "Le nom est requis";
        } else if (formData.name.trim().length < 3) {
            newErrors.name = "Le nom doit contenir au moins 3 caractères";
        }

        // Valider le numéro de carte
        const cardNumber = formData.num.replace(/\s/g, '');
        if (!cardNumber) {
            newErrors.num = "Le numéro de carte est requis";
        } else if (cardNumber.length !== 16) {
            newErrors.num = "Le numéro de carte doit contenir 16 chiffres";
        }

        // Valider la date d'expiration
        if (!formData.dateExp) {
            newErrors.dateExp = "La date d'expiration est requise";
        } else if (formData.dateExp.length !== 5) {
            newErrors.dateExp = "Format invalide (MM/AA)";
        } else {
            const [month, year] = formData.dateExp.split('/');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100; // Derniers 2 chiffres
            const currentMonth = currentDate.getMonth() + 1;

            if (parseInt(month) < 1 || parseInt(month) > 12) {
                newErrors.dateExp = "Mois invalide";
            } else if (parseInt(year) < currentYear || 
                      (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                newErrors.dateExp = "Carte expirée";
            }
        }

        // Valider le CVV
        if (!formData.cvv) {
            newErrors.cvv = "Le CVV est requis";
        } else if (formData.cvv.length !== 3) {
            newErrors.cvv = "Le CVV doit contenir 3 chiffres";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        // Valider le formulaire
        if (!validateForm()) {
            return;
        }

        setIsProcessing(true);

        try {
            // Simuler un appel API
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // TODO: Remplacer par un vrai appel à ton API de paiement
            console.log("Données de paiement:", {
                name: formData.name,
                cardNumber: formData.num.replace(/\s/g, ''),
                expiryDate: formData.dateExp,
                cvv: formData.cvv
            });

            alert("Paiement effectué avec succès! 🎉");
            
            // Réinitialiser le formulaire
            setFormData({
                name: "",
                num: "",
                dateExp: "",
                cvv: "",
            });
            setErrors({});
            
        } catch (error) {
            console.error("Erreur de paiement:", error);
            alert("Erreur lors du traitement du paiement. Veuillez réessayer.");
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <div className="max-w-lg overflow-hidden rounded shadow-lg bg-white">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
                <h2 className="text-2xl font-bold text-white">Informations de paiement</h2>
                <p className="text-purple-100 mt-1">Remplissez les informations de votre carte</p>
            </div>

            <form 
                id="payment-form" 
                onSubmit={handleSubmit} 
                className="flex flex-col gap-5 p-7"
            >
                {/* Nom sur la carte */}
                <div className="text-left">
                    <label 
                        htmlFor="payment-form-name-input" 
                        className="block mb-2 font-semibold text-gray-700"
                    >
                        Nom sur la carte
                    </label>
                    <input 
                        id="payment-form-name-input" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        aria-required="true"
                        type="text" 
                        placeholder="Jean Dupont"
                        className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                            errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                </div>

                {/* Numéro de carte */}
                <div className="text-left">
                    <label 
                        htmlFor="payment-form-cardnumber-input" 
                        className="block mb-2 font-semibold text-gray-700"
                    >
                        Numéro de carte
                    </label>
                    <input 
                        id="payment-form-cardnumber-input" 
                        name="num"
                        value={formData.num}
                        onChange={handleChange}
                        required 
                        aria-required="true"
                        type="text" 
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                            errors.num ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                    />
                    {errors.num && (
                        <p className="mt-1 text-sm text-red-600">{errors.num}</p>
                    )}
                </div>

                {/* Date d'expiration et CVV */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-left">
                        <label 
                            htmlFor="payment-form-date-input" 
                            className="block mb-2 font-semibold text-gray-700"
                        >
                            Date d'expiration
                        </label>
                        <input 
                            id="payment-form-date-input" 
                            name="dateExp"
                            value={formData.dateExp}
                            onChange={handleChange}
                            required 
                            aria-required="true"
                            type="text" 
                            placeholder="MM/AA"
                            maxLength="5"
                            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                                errors.dateExp ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                        />
                        {errors.dateExp && (
                            <p className="mt-1 text-sm text-red-600">{errors.dateExp}</p>
                        )}
                    </div>

                    <div className="text-left">
                        <label 
                            htmlFor="payment-form-cvv-input" 
                            className="block mb-2 font-semibold text-gray-700"
                        >
                            CVV/CVC
                        </label>
                        <input 
                            id="payment-form-cvv-input" 
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            required 
                            aria-required="true"
                            type="text" 
                            placeholder="123"
                            maxLength="3"
                            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                                errors.cvv ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                        />
                        {errors.cvv && (
                            <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                        )}
                    </div>
                </div>

                {/* Bouton de soumission */}
                <button 
                    type="submit" 
                    id="payment-form-submit"
                    disabled={isProcessing}
                    className={`mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 ${
                        isProcessing 
                            ? 'opacity-60 cursor-not-allowed' 
                            : 'hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
                    }`}
                >
                    {isProcessing ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Traitement en cours...
                        </span>
                    ) : (
                        'Payer maintenant'
                    )}
                </button>

                {/* Badge de sécurité */}
                <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                    <span>Paiement sécurisé SSL</span>
                </div>
            </form>
        </div>
    );
}

export default PaymentForm;