from odoo import http

class DashboardController(http.Controller):
    @http.route('/flota', auth='user', type='http', website=True)
    def dashboard(self, **kw):
        return http.request.render('gestion_flota_slepch.dashboard_template')