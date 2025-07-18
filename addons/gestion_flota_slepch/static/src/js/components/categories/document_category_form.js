/** @odoo-module **/
/**
 * OWL Component: Formulario de Categorías de Documentos
 */

/** Importaciones necesarias */
import { Component, useState, useEffect, onWillStart } from '@odoo/owl';
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
            type_blocked: false,
            required_bloqued: false,
            parent_blocked: false,
            errors: {
                name: false
            },
            touched: {
                name: false
            }
        });

        onWillStart(async () => {
            await this.loadCategories();
            if(this.props && this.props.category && this.props.category != null){
                this.editCategory(this.props.category)
            }else{
                this.resetForm()
            }
        });

        
    }

    async loadCategories() {
        try {
            const records = await this.orm.searchRead("flota.document.category", [], ["id", "name", "parent_id", "required", 'document_type']);
            const selfId = this.state.id;  // ID de la categoría actual (o null)
            this.state.categories = selfId ? records.filter(item => item.id !== selfId) : records;
        } catch (err) {
            this.notification.add("Error cargando categorías: " + err, { type: "danger" });
            console.log(err)
        }
    }

    async saveCategory() {
        this.validateForm()
        if(this.state.errors.name) {
            this.notification.add(
                "Debes llenar todos los campos!",
                { type: 'info' }
            )
            return;
        };
        const values = {
            name: this.state.name,
            required: this.state.required,
            parent_id: this.state.parent_id ? this.state.parent_id : null,
            document_type: this.state.document_type == '' ? 'empty' : this.state.document_type
        };
        if(values.name == null || values.name === '') {
            this.notification.add(
                "Debes ingresar un nombre",
                { type: 'info'}
            )
            return;
        }
        console.info("Guardando:", values)
        try {
            if (this.state.id) {
                await this.orm.write('flota.document.category', [this.state.id], values);
                const childs = await this.orm.call(
                    'flota.document.category',
                    'get_parent_childs',
                    [this.state.id]
                )
                await this.updateChilds(values, childs)
                this.notification.add("Categoría actualizada correctamente", { type: 'success' });
            } else {
                if(values.parent_id){
                    await this.withParentDo(value.parent_id, async (parent) => {
                        values.document_type = parent.document_type
                    })
                }
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

    async updateChilds(parent, childs){
        try{
            for (const child of childs) {
                const values = {
                    required: parent.required ? true : false,
                    document_type: parent.document_type
                }
                await this.orm.write('flota.document.category', [child.id], values)
                if(child.children.length > 0) await this.updateChilds(child, child.children)
            }
        }catch(e){
            this.notification.add("Error al actualizar hijos de '"+ parent.name+"': "+ e, { type: 'danger'})
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

    async editCategory(record) {
        console.log("Editando: ", record)
        this.state.type_blocked = false
        this.state.id = record.id;
        this.state.name = record.name;
        this.state.parent_id = record.parent_id ? record.parent_id[0] : null;
        this.state.required = record.required;
        if(this.state.parent_id !== null){
            this.state.type_blocked = true
            await this.withParentDo(this.state.parent_id, (parent) => {
                this.state.required_blocked = parent.required ? true : false
            })
        }
        this.state.document_type = record.document_type
        this.state.editionMode = true
        await this.loadCategories()
        console.log("Estado: ", this.state)
    }

    async onChangeParentCategory(ev) {
        this.state.type_blocked = false
        this.state.required_blocked = false
        const value = ev.target.value;
        this.state.parent_id = value ? parseInt(value) : null;
        if(this.state.parent_id == null) return;

        await this.withParentDo(this.state.parent_id, (parent) => {
            this.state.document_type = parent.document_type || '';
            this.state.required = parent.required ? true : false;
            this.state.type_blocked = true
            this.state.required_blocked = parent.required ? true : false;
        })
        
    }

    async withParentDo(parent_id, callback){
        try{
            if(callback instanceof Function && parent_id){
                const result = await this.orm.searchRead("flota.document.category", [["id", "=", parent_id]], ["id", "name", "parent_id", "document_type", "required"])
                const parent = result[0] || null
                if(parent){
                    await callback(parent)
                }
            }else{
                this.notification.add(
                    "Error al ejecutar el callback o id inválido!",
                    { type: 'danger'}
                )
            }
        }catch(e){
            this.notification.add(
                `Error al buscar parent_id ${parent_id}: ${e}`,
                { type: 'danger' }
            );
        }
    }

    validateForm(){
        this.state.touched.name = true;
        this.state.errors.name = !this.state.name && this.state.touched.name
    }

}
    