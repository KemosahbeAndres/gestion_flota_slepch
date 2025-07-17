/** @odoo-module **/
/**
 * OWL Component: Formulario de Categorías de Documentos
 */

/** Importaciones necesarias */
import { Component, useState, onWillStart } from '@odoo/owl';
import { useService } from '@web/core/utils/hooks';

export class DocumentCategoryForm extends Component {
    static template = "gestion_flota_slepch.DocumentCategoryForm";

    setup() {
        super.setup();
        //console.log("[DocumentForm] Servicios disponibles:", Object.keys(this.env.services));
        this.orm = useService('orm');
        this.dialog = useService('dialog')
        this.notification = useService('notification');

        this.state = useState({
            name: '',
            document_type: '',
            parent_id: null,
            required: false,
            id: null,
            categories: [],
            editionMode: false,
        });
        onWillStart(async () => {
            await this.loadCategories();
            if(this.props && this.props.category && this.props.category != null){
                this.editCategory(this.props.category)
            }else{
                this.resetForm()
            }
        });
        console.log("Props", this.props)
    }

    async loadCategories() {
        try {
            const records = await this.orm.searchRead("flota.document.category", [], ["id", "name", "parent_id", "required", 'document_type']);
            this.state.categories = records;
        } catch (err) {
            this.notification.add("Error cargando categorías: " + err, { type: "danger" });
            console.log(err)
        }
    }

    async saveCategory() {
        const values = {
            name: this.state.name,
            parent_id: this.state.parent_id,
            required: this.state.required,
            parent_id: this.state.parent_id ? this.state.parent_id : false,
            document_type: this.state.document_type
        };
        try {
            if (this.state.id) {
                await this.orm.write('flota.document.category', [this.state.id], values);
                this.notification.add("Categoría actualizada correctamente", { type: 'success' });
            } else {
                const [id] = await this.orm.create('flota.document.category', [values]);
                this.notification.add("Categoría creada correctamente", { type: 'success' });
            }
            if(this.props.onSaved){
                this.props.onSaved()
            }
            this.resetClose()
        } catch (error) {
            this.notification.add("Error al guardar la categoría: " + error, { type: 'danger' });
        }
    }

    resetForm() {
        this.state.name = '';
        this.state.parent_id = null;
        this.state.required = false;
        this.state.id = null;
        this.state.editionMode = false
    }
    resetClose(){
        this.resetForm()
        this.props.close()
    }

    editCategory(record) {
        this.state.id = record.id;
        this.state.name = record.name;
        this.state.parent_id = record.parent_id ? record.parent_id[0] : null;
        this.state.required = record.required;
        this.document_type = record.document_type
        this.state.editionMode = true
    }

    onChangeParentCategory(ev) {
        const value = ev.target.value;
        this.state.parent_id = value ? parseInt(value) : null;
    }
}
