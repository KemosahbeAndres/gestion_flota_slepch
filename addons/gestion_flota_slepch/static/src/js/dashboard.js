/** @odoo-module **/
import { Component } from "@odoo/owl";
//import { useFleetStats } from "./useFleetStats"

export class Dashboard extends Component {
    setup () {
        this.model = [0,1,2,3,4,5]
    }
    static template = "gestion_flota_slepch.DashboardTemplate"
}