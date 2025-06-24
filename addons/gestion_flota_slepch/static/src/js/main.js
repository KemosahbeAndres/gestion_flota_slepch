/** @odoo-module **/

import { registry } from "@web/core/registry";

import { Dashboard } from "./dashboard";

console.log("[dashboard] Accion personalizada");

registry.category("actions").add("gestion_flota_slepch.dashboard", Dashboard);
