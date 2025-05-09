# -*- coding: utf-8 -*-
# from odoo import http


# class GestionFlotaSlepch(http.Controller):
#     @http.route('/gestion_flota_slepch/gestion_flota_slepch', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/gestion_flota_slepch/gestion_flota_slepch/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('gestion_flota_slepch.listing', {
#             'root': '/gestion_flota_slepch/gestion_flota_slepch',
#             'objects': http.request.env['gestion_flota_slepch.gestion_flota_slepch'].search([]),
#         })

#     @http.route('/gestion_flota_slepch/gestion_flota_slepch/objects/<model("gestion_flota_slepch.gestion_flota_slepch"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('gestion_flota_slepch.object', {
#             'object': obj
#         })

