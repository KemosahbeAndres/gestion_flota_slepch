/** @odoo-module **/
/**
 * OWL Component: Jerarquia de Categorías de Documentos
 */
import { Component, useState, onWillStart } from "@odoo/owl";
import { useService } from '@web/core/utils/hooks';

export class CategoryHierarchyList extends Component {
    static template = "gestion_flota_slepch.CategoryHierarchyList";
    static props = {
        onOpenEditDialog: Function,
        onOpenDeleteDialog: Function,
        categories: {required: false},
    }
    static components = { CategoryHierarchyList }


    setup() {
        super.setup();
        
        this.dialog = useService('dialog')
        this.notification = useService('notification')
        onWillStart(async () => {
            try {
                await this.loadData()
            }catch(e){
                this.notification.add("Error multiple", { type: "danger" })
            }
        });
    }

    async loadData(){
        if(!this.props.categories && !this.props.categories.length){
            this.notification.add("Error al cargar las categorias.", { type: "danger" })
        }

        if(!this.props.onOpenEditDialog && !this.props.onOpenDeleteDialog){
            this.notification.add("Error, no se encuentran los callback necesarios.", { type: "danger" })
        }
        //console.info(this.props)
    }

    openDeleteDialog(category){
        try{
            this.props.onOpenDeleteDialog(category)
        }catch(e){
            this.notification.add("Error al intentar borrar la categoria.", { type: "danger" })
            console.error(e)
        }
    }
    openEditDialog(category){
        try{
            this.props.onOpenEditDialog(category)
        }catch(e){
            this.notification.add("Error al intentar editar la categoria.", { type: "danger" })
            console.error(e)
        }
    }
}
