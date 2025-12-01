// =====================
// Français
// =====================
export const FR = {
  langueContraire: "en",
  language: "Langue",
  title: "ShopEasy",
  currencySymbol: "$",

  header: {
    changeLanguage: "English",
    logoAltText: "Logo ShopEasy",
    navbarLogoutTitle: "Déconnexion",
    navbarLoginTitle: "Connexion",
    verifyCart: "Mon panier",
    myProfile: "Mon profil",
  },

  homepage: {
    title: "Acceuil",
    welcome: "Trouvez votre bonheur.",
    text1: "Page d'acceuil",
    text2: "Bonjour, ",
    categories: [
      "Électronique",
      "École",
      "Vêtements",
      "Chaussures",
      "Sacs",
      "Maquillage",
      "Bijoux",
    ],
    allProducts: "Tous nos produits",
  },

  loginpage: {
    title: "Bienvenue",
    text1: "Connectez-vous pour acheter sur ShopEasy",
    form: {
      usernameLabel: "Nom d'utilisateur",
      passwordLabel: "Mot de passe",
      errorMessage: "Erreur de connexion, veuillez réessayer s'il-vous-plaît.",
      buttonLabel: "Connexion",
      registerAccount: "Pas de compte? Créez un nouveau compte ici",
    },
  },

  error404page: {
    error: "404",
    title: "Page introuvable",
    text1: "Désolé, la page que vous semblez rechercher n'as pas été trouvée.",
    backHome: "Retour à l'acceuil",
  },

  registerPage: {
    title: "Créez un compte",
    text1: "Inscrivez-vous pour acheter sur ShopEasy",

    form: {
      usernameLabel: "Nom d'utilisateur",
      emailLabel: "Courriel",
      emailPlaceholder: "courriel@uqo.ca",
      passwordLabel: "Créez un mot de passe",
      passwordPlaceholder: "Mot de passe",
      confirmPasswordLabel: "Confirmez votre mot de passe",
      confirmPasswordPlaceholder: "Confirmation du mot de passe",
      userAlreadyExistErrorMessage: "Un utilisateur avec ce nom existe déjà.",
      invalidUsernameErrorMessage:
        "Veuillez utiliser un nom d'utilisateur valide. Le nom ne peux contenir que des lettres, des chiffres et les caractères suivants @/./+/-/_",
      passwordTooShortErrorMessage:
        "Ce mot de passe est trop petit. Il doit avoir une longueur minime de 8 caractères.",
      passwordTooSimilarToAnotherFieldErrorMessage:
        "Ce mot de passe ressemble trop à un autre champ d'entrée (nom d'utilisateur/email).",
      passwordTooCommonErrorMessage: "Ce mot de passe est trop courant.",
      passwordEntirelyNumericErrorMessage: "Ce mot de passe est entièrement numérique.",
      passwordsDoNotMatchErrorMessage: "Les mots de passe ne se correspondent pas.",
      errorMessage: "Erreur lors de la création du compte, veuillez réessayer s'il-vous-plaît.",
      buttonLabel: "Créez votre compte",
      loginAccount: "Vous avez déjà un compte? Connectez-vous ici.",
    },
  },
  categoryPage: {
    title: "Catégorie",
    noProductFound: "Aucun produit trouvé pour la catégorie",
    backToHome: "Retour à l’accueil",
    collection: "Collection",
  },
  productPage: {
    notFound: "Product not found.",
    inStock: "En stock",
    quantity: "Quantité",
    backButton: "Back",
    freeShipping: "Free shipping",
    addToCart: "Add to cart",
    buyNow: "Buy now",
  },
  imageGrid: {
    title: "Offres spéciales",
    unknownProduct: "Produit inconnu",
  },
  footer: {
    home: "Accueil",
    search: "Recherche",
    cart: "Panier",
    account: "Compte",
  },
  searchBar: {
    placeholder: "Recherchez un produit...",
    searchButton: "Recherche",
  },
  cartPage: {
    empty: "Votre panier est vide",
    emptytext: "On dirait que vous n'avez encore rien ajouté à votre panier.",
    backHome: "Retour à l'accueil",
    title: "Votre panier",
    remove: "Supprimer",
    clear: "Vider le panier",
    total: "Total",
    checkout: "Passer la commande",
  },
};

export default FR;
