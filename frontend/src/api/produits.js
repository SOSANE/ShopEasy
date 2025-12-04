/**
 * Fonction pour recevoir tous les produits
 * @returns products Une liste de produits
 */
export async function getAllProducts() {
  try {
    const response = await fetch("/api/produit/", {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (response.ok) {
      const res = await response.json();
      return res;
    } else {
      throw new Error();
    }
  } catch (e) {
    return null;
  }
}

/**
 * Fonction pour recevoir un seul produit à partir du ID
 * @param {number} id
 * @returns {} product Un objet produit
 */
export async function getProductById(id) {
  try {
    const response = await fetch(`/api/produit/${id}/`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (response.ok) {
      const res = await response.json();
      return res;
    } else {
      throw new Error();
    }
  } catch (e) {
    return null;
  }
}
export async function searchProducts(query) {
  try {
    const response = await fetch(`/api/produits/search/?search=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) throw new Error("API search error");

    return await response.json();
  } catch (e) {
    console.error("searchProducts error", e);
    return [];
  }
}
