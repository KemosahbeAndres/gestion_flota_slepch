/** @odoo-module **/
import { Component } from "@odoo/owl";
import { CategoryHierarchyList } from "../components/categories/categories_hierarchy_list";
//import { useFleetStats } from "./useFleetStats"

export class Dashboard extends Component {
    setup () {
    }
    static template = "gestion_flota_slepch.DashboardTemplate"
    static layout = "standard";
    static components = {}
}