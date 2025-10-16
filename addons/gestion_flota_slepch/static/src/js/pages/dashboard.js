/** @odoo-module **/
import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";
//import { CategoryHierarchyList } from "../components/categories/categories_hierarchy_list";
//import { useFleetStats } from "./useFleetStats"

export class Dashboard extends Component {
    setup () {
    }
    static layout = "standard";
    static components = {}
}

Dashboard.template = "gestion_flota_slepch.DashboardTemplate"

registry.category("actions").add("gestion_flota_slepch.dashboard", Dashboard);
console.log("[dashboard] Accion personalizada cargada");