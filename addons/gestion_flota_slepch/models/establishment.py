# -*- coding: utf-8 -*-

from odoo import models, fields, api


class Establishment(models.Model):
    _inherit = 'res.company'

    latitude = fields.Float(string='Latitud')
    longitude = fields.Float(string='Longitud')
    is_educational_establishment = fields.Boolean(string='Establecimiento Educativo', default=True)
#     _name = 'gestion_flota_slepch.gestion_flota_slepch'
#     _description = 'gestion_flota_slepch.gestion_flota_slepch'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100

