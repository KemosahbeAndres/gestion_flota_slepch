# -*- coding: utf-8 -*-

# from odoo import models, fields, api


# class gestion_flota_slepch(models.Model):
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

