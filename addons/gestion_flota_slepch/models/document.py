# -*- coding: utf-8 -*-

from odoo import models, fields, api


class Document(models.Model):
    _name = 'flota.document'
    _description = 'Documentación legal de vehículos, conductores, incidentes y contratos'
    
    name = fields.Char(required=True)
    category_id = fields.Many2one('flota.document.category', string='Categoría', required=True)
    ref_model = fields.Char(required=True)
    ref_id = fields.Integer(required=True)
    issue_date = fields.Date()
    expiry_date = fields.Date()
    attachment_id = fields.Many2one('ir.attachment', string='Archivo adjunto')
    valid = fields.Boolean(compute='_compute_valid', store=True)
    cost = fields.Float(string='Costo asociado')

    @api.depends('expiry_date')
    def _compute_valid(self):
        for doc in self:
            doc.valid = not doc.expiry_date or doc.expiry_date >= fields.Date.today()

