import { api } from "./api";

export const adminService = {
  async getUsers(page = 1, limit = 10, search = "") {
    const { data } = await api.get(
      `/admin/users?page=${page}&limit=${limit}&search=${search}`
    );
    return data;
  },

  async getStats() {
    const { data } = await api.get("/admin/stats");
    return data;
  },

  async getProfiles(page = 1, limit = 10, search = "") {
    const { data } = await api.get(
      `/admin/profiles?page=${page}&limit=${limit}&search=${search}`
    );
    return data;
  },

  async getOutfits(page = 1, limit = 10, search = "") {
    const { data } = await api.get(
      `/admin/outfits?page=${page}&limit=${limit}&search=${search}`
    );
    return data;
  },

  async getRecommendations(page = 1, limit = 10, search = "") {
    const { data } = await api.get(
      `/admin/recommendations?page=${page}&limit=${limit}&search=${search}`
    );
    return data;
  },

  async getStyles(page = 1, limit = 10, search = "") {
    const { data } = await api.get(
      `/admin/styles?page=${page}&limit=${limit}&search=${search}`
    );
    return data;
  },

  async getColors(page = 1, limit = 10, search = "") {
    const { data } = await api.get(
      `/admin/colors?page=${page}&limit=${limit}&search=${search}`
    );
    return data;
  },

  async getCategories(page = 1, limit = 10, search = "") {
    const { data } = await api.get(
      `/admin/categories?page=${page}&limit=${limit}&search=${search}`
    );
    return data;
  },

  async getOccasions(page = 1, limit = 10, search = "") {
    const { data } = await api.get(
      `/admin/occasions?page=${page}&limit=${limit}&search=${search}`
    );
    return data;
  },

  async getBodyTypes(page = 1, limit = 10, search = "") {
    const { data } = await api.get(
      `/admin/body-types?page=${page}&limit=${limit}&search=${search}`
    );
    return data;
  },

  async getFashionItems(page = 1, limit = 10, search = "") {
    const { data } = await api.get(
      `/admin/fashion-items?page=${page}&limit=${limit}&search=${search}`
    );
    return data;
  },

  async createStyle(payload: {
    name: string;
    description?: string;
  }) {
    const { data } = await api.post(
      "/styles",
      payload,
    );

    return data;
  },

  async updateStyle(
    id: string,
    payload: {
      name?: string;
      description?: string;
    },
  ) {
    const { data } = await api.patch(
      `/styles/${id}`,
      payload,
    );

    return data;
  },

  async deleteStyle(id: string) {
    await api.delete(
      `/styles/${id}`,
    );
  },

  // ==================== COLORS ====================
  async createColor(payload: {
    name: string;
    hexCode: string;
  }) {
    const { data } = await api.post(
      "/colors",
      payload,
    );
    return data;
  },

  async updateColor(
    id: string,
    payload: {
      name?: string;
      hexCode?: string;
    },
  ) {
    const { data } = await api.patch(
      `/colors/${id}`,
      payload,
    );
    return data;
  },

  async deleteColor(id: string) {
    await api.delete(
      `/colors/${id}`,
    );
  },

  // ==================== CATEGORIES ====================
  async createCategory(payload: {
    name: string;
    description?: string;
  }) {
    const { data } = await api.post(
      "/categories",
      payload,
    );
    return data;
  },

  async updateCategory(
    id: string,
    payload: {
      name?: string;
      description?: string;
    },
  ) {
    const { data } = await api.patch(
      `/categories/${id}`,
      payload,
    );
    return data;
  },

  async deleteCategory(id: string) {
    await api.delete(
      `/categories/${id}`,
    );
  },

  // ==================== OCCASIONS ====================
  async createOccasion(payload: {
    name: string;
    description?: string;
  }) {
    const { data } = await api.post(
      "/occasions",
      payload,
    );
    return data;
  },

  async updateOccasion(
    id: string,
    payload: {
      name?: string;
      description?: string;
    },
  ) {
    const { data } = await api.patch(
      `/occasions/${id}`,
      payload,
    );
    return data;
  },

  async deleteOccasion(id: string) {
    await api.delete(
      `/occasions/${id}`,
    );
  },

  // ==================== BODY TYPES ====================
  async createBodyType(payload: {
    name: string;
    description?: string;
  }) {
    const { data } = await api.post(
      "/body-types",
      payload,
    );
    return data;
  },

  async updateBodyType(
    id: string,
    payload: {
      name?: string;
      description?: string;
    },
  ) {
    const { data } = await api.patch(
      `/body-types/${id}`,
      payload,
    );
    return data;
  },

  async deleteBodyType(id: string) {
    await api.delete(
      `/body-types/${id}`,
    );
  },

  // ==================== FASHION ITEMS ====================
  async createFashionItem(payload: {
    name: string;
    description?: string;
    gender: string;
    price: number;
    imageUrl?: string;
    categoryId: string;
    styleId: string;
    colorId: string;
    isActive?: boolean;
  }) {
    const { data } = await api.post(
      "/fashion-items",
      payload,
    );
    return data;
  },

  async updateFashionItem(
    id: string,
    payload: {
      name?: string;
      description?: string;
      gender?: string;
      price?: number;
      imageUrl?: string;
      categoryId?: string;
      styleId?: string;
      colorId?: string;
      isActive?: boolean;
    },
  ) {
    const { data } = await api.patch(
      `/fashion-items/${id}`,
      payload,
    );
    return data;
  },

  async deleteFashionItem(id: string) {
    await api.delete(
      `/fashion-items/${id}`,
    );
  },

  // ==================== OUTFITS ====================
  async createOutfit(payload: {
    name: string;
    description?: string;
    gender: string;
    budgetRange: string;
    imageUrl?: string;
    styleId: string;
    occasionId: string;
    bodyTypeId: string;
    isActive?: boolean;
  }) {
    const { data } = await api.post(
      "/outfits",
      payload,
    );
    return data;
  },

  async updateOutfit(
    id: string,
    payload: {
      name?: string;
      description?: string;
      gender?: string;
      budgetRange?: string;
      imageUrl?: string;
      styleId?: string;
      occasionId?: string;
      bodyTypeId?: string;
      isActive?: boolean;
    },
  ) {
    const { data } = await api.patch(
      `/outfits/${id}`,
      payload,
    );
    return data;
  },

  async deleteOutfit(id: string) {
    await api.delete(
      `/outfits/${id}`,
    );
  },
}; 