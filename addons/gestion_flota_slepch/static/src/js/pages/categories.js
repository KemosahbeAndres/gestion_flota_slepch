/** @odoo-module **/
import { Component, useState } from "@odoo/owl";
import { DocumentCategoryForm } from "../components/categories/document_category_form";
import { CategoryHierarchyList } from "../components/categories/categories_hierarchy_list";

export class Categories extends Component {
    static template = "gestion_flota_slepch.CategoriesTemplate"
    static layout = "standard";
    static components = {
        CategoryHierarchyList,
        DocumentCategoryForm
    }
    setup () {
        this.state = useState({
            selectedCategory: null
        })
    }

    selectCategory(category){
        this.state.selectedCategory = category
    }
    clearSelection(){
        this.state.selectedCategory = this.selectCategory(null)
    }
}