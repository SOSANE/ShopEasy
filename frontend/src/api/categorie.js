/**
 * Fonction pour recevoir toutes les catégories
 * @returns categories Une liste de catégories
 */
export async function getAllCategories() {
  try {
    const response = await fetch("/api/categorie/", {
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
 * Fonction pour recevoir une seule catégorie à partir du ID
 * @param {number} id
 * @returns {} categorie Un objet categorie
 */
export async function getCategoryById(id) {
  try {
    const response = await fetch(`/api/categorie/${id}/`, {
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
