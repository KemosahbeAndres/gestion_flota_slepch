/** @odoo-module **/
import { Component } from "@odoo/owl";
//import { useFleetStats } from "./useFleetStats"
import { DocumentCategoryForm } from "./document_category_form";

export class Dashboard extends Component {
    setup () {
        this.model = [0,1,2,3,4,5]
    }
    static template = "gestion_flota_slepch.DashboardTemplate"
    static components = {
        DocumentCategoryForm
    }
}