/** @odoo-module **/
import { Component, useState, useEffect, onWillStart } from "@odoo/owl";
import { useService } from '@web/core/utils/hooks';
import { ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
import { _t } from "@web/core/l10n/translation";
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
        super.setup();
        this.orm = useService('orm');
        this.dialog = useService('dialog')
        this.notification = useService('notification');
        this.state = useState({
            category_count: 0,
            uncategorized: [],
            vehicles: [],
            drivers: [],
            contracts: [],
            incidents: [],
        })

        useEffect(() => {
            this.state.category_count = this.countHierarchy(this.state.uncategorized)
                                        + this.countHierarchy(this.state.vehicles)
                                        + this.countHierarchy(this.state.drivers)
                                        + this.countHierarchy(this.state.incidents)
                                        + this.countHierarchy(this.state.contracts);
        }, () => [
            this.state.uncategorized.length, 
            this.state.vehicles.length,
            this.state.drivers.length,
            this.state.incidents.length,
            this.state.contracts.length
        ]);

        onWillStart(async () => {
            try {
                await this.loadCategories();
                //console.info(this.dialog)
            }catch(e){
                console.error("ERROR: ", e)
            }
        });
    }

    countHierarchy(hierarchy){
        //console.info("jerarquia: ",hierarchy)
        let count = 0
        count += hierarchy.length
        for(const item of hierarchy){
            if(item.children && item.children.length > 0) count += this.countHierarchy(item.children)
        }
        return count
    }

    openEditDialog(category){
        this.dialog.add(DocumentCategoryForm, {
            category: category,
            onSaved: async () => await this.loadCategories(),
        });
    }

    openCreateDialog(){
        this.dialog.add(DocumentCategoryForm, {
            category: null,
            onSaved: async () => await this.loadCategories(),
        });
    }

    async loadCategories() {
        //console.info("Actualizando listado de categorias...", this.state.uncategorized)
        const uncategorized = await this.orm.call(
            'flota.document.category',
            'get_category_hierarchy',
            ['empty'],
            {}
        )
        this.state.uncategorized = uncategorized
        //console.log("Uncategorized", uncategorized)

        this.state.vehicles = [...await this.orm.call(
            'flota.document.category',
            'get_category_hierarchy',
            ['vehicles'],
            {}
        )]
        this.state.drivers = [...await this.orm.call(
            'flota.document.category',
            'get_category_hierarchy',
            ['drivers'],
            {}
        )]

        this.state.incidents = [...await this.orm.call(
            'flota.document.category',
            'get_category_hierarchy',
            ['incidents'],
            {}
        )]

        this.state.contracts = [...await this.orm.call(
            'flota.document.category',
            'get_category_hierarchy',
            ['contracts'],
            {}
        )]
    }


    async openDeleteDialog(category) {
        try{
            // Abrir un diálogo de confirmación antes de borrar
            this.dialog.add(ConfirmationDialog, {
                title: _t("Confirmar eliminación"),
                body: _t("¿Estás seguro de que deseas eliminar esta categoría de documentos?"),
                cancelLabel: _t("Cancelar"),
                confirmLabel: _t("Eliminar"),
                confirmClass: "btn-primary",      // (opcional: estilo para el botón confirmar)
                confirm: async () => {
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
                    await this.loadCategories()
                },
                cancel: () => {
                    // Acción al cancelar (puede quedar vacío; el diálogo simplemente se cierra)
                },
            }); 
        }catch (error) {
            console.error("Error:", error);
            this.notification.add("Error.", {
                type: "danger"
            });
        }
        await this.loadCategories()
    }

}