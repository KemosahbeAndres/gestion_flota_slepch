/** @odoo-module **/

//import { registry } from "@web/core/registry";
import { useState } from "@odoo/owl";

export const categoryStore = () => {
  const state = useState({
    selectedCategory: null,
    vehicle_categories: [],
    driver_categories: [],
  });

  return {
    // Estado
    state,
    // Seleccionar categoria
    selectCategory(category) {
      state.selectedCategory = category;
    },
    // Deseleccionar categoría
    clearSelection() {
      state.selectedCategory = null;
    },
    // Setear categorias de vehiculos
    setVehicleCategories(categories) {
      state.vehicle_categories = categories;
    },
    // Setear categorias de conductores
    setDriverCategories(categories) {
      state.driver_categories = categories;
    },
    // Limpiar todas las categorías
    reset() {
      state.selectedCategory = null;
      state.vehicle_categories = [];
      state.driver_categories = [];
    }
  };
};

// 📦 Registrar el servicio globalmente
//registry.category("services").add("categoryStore", categoryStore);
