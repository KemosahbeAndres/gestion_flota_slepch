/** @odoo-module **/
import { Component, useState, onWillStart } from "@odoo/owl";
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
            uncategorized: [],
            vehicles: [],
            drivers: [],
            contracts: [],
            incidents: [],
        })

        onWillStart(async () => {
            try {
                await this.loadCategories();
                //console.info(this.dialog)
            }catch(e){
                console.error("ERROR: ", e)
            }
        });
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
        this.state.uncategorized = await this.orm.call(
            'flota.document.category',
            'get_category_hierarchy',
            [],
            {}
        )
        this.state.vehicle_categories = await this.orm.call(
            'flota.document.category',
            'get_category_hierarchy',
            ['vehicles'],
            {}
        )
        this.state.driver_categories = await this.orm.call(
            'flota.document.category',
            'get_category_hierarchy',
            ['drivers'],
            {}
        )
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
    }

}