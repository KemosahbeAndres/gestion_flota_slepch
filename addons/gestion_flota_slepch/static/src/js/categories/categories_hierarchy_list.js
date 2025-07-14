// 📦 Ejemplo completo de componente OWL 2 que muestra las categorías jerárquicas padre-hijo como lista

import { Component, useState, onWillStart } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export class CategoryHierarchyList extends Component {
    static template = "gestion_flota_slepch.CategoryHierarchyList";

    setup() {
        this.orm = useService("orm");
        this.state = useState({ categories: [] });

        onWillStart(async () => {
            await this.loadCategories();
        });
    }

    async loadCategories() {
        const categories = await this.orm.searchRead("flota.document.category", [], ["id", "name", "parent_id"]);
        this.state.categories = this.buildHierarchy(categories);
    }

    buildHierarchy(categories) {
        const categoryMap = {};
        categories.forEach(cat => categoryMap[cat.id] = { ...cat, children: [] });

        const hierarchy = [];

        categories.forEach(cat => {
            if (cat.parent_id) {
                const parentId = cat.parent_id[0];
                categoryMap[parentId].children.push(categoryMap[cat.id]);
            } else {
                hierarchy.push(categoryMap[cat.id]);
            }
        });

        return hierarchy;
    }
}
