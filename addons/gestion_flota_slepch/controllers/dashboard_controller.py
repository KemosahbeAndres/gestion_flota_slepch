from odoo import http
from odoo.http import request

class DashboardController(http.Controller):
    @http.route('/flota/dashboard/metrics', auth='user', type='json')
    def get_metrics(self):
        # Datos simulados — reemplaza con queries reales a modelos
        return [
            {"label": "Vehículos activos", "value": 42, "color": "primary", "icon": "fa-car"},
            {"label": "Mantenciones pendientes", "value": 7, "color": "warning", "icon": "fa-wrench"},
            {"label": "Asignaciones hoy", "value": 15, "color": "success", "icon": "fa-user-clock"},
            {"label": "Documentos por vencer", "value": 3, "color": "danger", "icon": "fa-file-alt"},
        ]


