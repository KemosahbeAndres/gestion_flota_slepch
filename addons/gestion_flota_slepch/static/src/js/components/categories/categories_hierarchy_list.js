/** @odoo-module **/
/**
 * OWL Component: Jerarquia de Categorías de Documentos
 */
import { Component, useState, onWillStart } from "@odoo/owl";
import { useService } from '@web/core/utils/hooks';

export class CategoryHierarchyList extends Component {
    static template = "gestion_flota_slepch.CategoryHierarchyList";
    /*static props = {
        selectedCategory: { type: [Object, null], optional: true },
        onSelectCategory: { type: Function, optional: true }
    }*/

    setup() {
        console.log("[HierarchyList] Servicios disponibles:", Object.keys(this.env.services));

        this.state = useState({ 
            all: [],
            vehicle_categories: [],
            driver_categories: [],
            contract_categories: [],
            incident_categories: [],
            selectedCategory: null,
        });

        this.orm = useService('orm');
        this.dialog = useService('dialog')
        this.notification = useService('notification');

        onWillStart(async () => {
            try {
                await this.loadCategories();
            }catch(e){
                console.error("ERROR: ", e)
            }
        });
    }

    async loadCategories() {

        this.state.all = await this.orm.call(
            'flota.document.category',
            'get_category_hierarchy',
            [],
            {}
        )
        this.state.vehicle_categories = await this.orm.call(
            'flota.document.category',
            'get_category_hierarchy',
            [],
            {}
        )
        //this.state.driver_categories = await this.rpc('/api_flota/categories', { document_type: 'drivers' });
        //this.state.all = [...this.state.vehicle_categories, ...this.state.driver_categories]

    }

    selectCategory(cat) {
        this.state.selectCategory = cat
        console.info("Selcted Category:",cat)
        alert("seleccionado "+"["+cat.id+"] "+cat.name)
        //this.props.onSelectCategory(cat);
    }

    async deleteCategory(category) {
        try{
            const confirmed = await this.dialog.add({
                title: "Confirmar eliminación",
                body: "¿Está seguro que desea eliminar esta categoría?",
            });
            if (!confirmed) return;
            try {
                await this.orm.unlink("flota.document.category", [category.id]);
                this.notification.add("Categoría eliminada correctamente.", {
                    type: "success"
                });
            } catch (error) {
                console.error("Error al eliminar categoría:", error);
                this.notification.add("Error al eliminar categoría.", {
                    type: "danger"
                });
            }
        }catch (error) {
            console.error("Error:", error);
            this.notification.add("Error.", {
                type: "danger"
            });
        }
    }

}
