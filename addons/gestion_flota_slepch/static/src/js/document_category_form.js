/**
 * OWL Component: Formulario de Categorías de Documentos
 */

/** Importaciones necesarias */
import { Component, useState, onWillStart } from '@odoo/owl';
import { useService } from '@web/core/utils/hooks';

export class DocumentCategoryForm extends Component {
    static template = "gestion_flota_slepch.DocumentCategoryForm";

    setup() {
        this.orm = useService('orm');
        this.notification = useService('notification');
        this.state = useState({
        name: '',
        parent_id: null,
        is_required: false,
        id: null,
        categories: [],
        });
        onWillStart(async () => {
            await this.loadCategories();
        });
    }

    async loadCategories() {
        try {
            const records = await this.orm.searchRead("flota.document.category", [], ["id", "name"]);
            this.state.categories = records;
        } catch (err) {
            this.notification.add("Error cargando categorías: " + err, { type: "danger" });
        }
    }

    async saveCategory() {
        const values = {
            name: this.state.name,
            parent_id: this.state.parent_id,
            is_required: this.state.is_required,
            parent_id: this.state.parent_id ? this.state.parent_id : false,
        };
        try {
        if (this.state.id) {
            await this.orm.write('flota.document.category', [this.state.id], values);
            this.notification.add("Categoría actualizada correctamente", { type: 'success' });
        } else {
            await this.orm.create('flota.document.category', [values]);
            this.notification.add("Categoría creada correctamente", { type: 'success' });
        }
        this.resetForm();
        await this.loadCategories();
        } catch (error) {
        this.notification.add("Error al guardar la categoría: " + error, { type: 'danger' });
        }
    }

    resetForm() {
        this.state.name = '';
        this.state.parent_id = null;
        this.state.is_required = false;
        this.state.id = null;
    }

    editCategory(record) {
        this.state.id = record.id;
        this.state.name = record.name;
        this.state.parent_id = record.parent_id ? record.parent_id[0] : null;
        this.state.is_required = record.is_required;
    }
}
