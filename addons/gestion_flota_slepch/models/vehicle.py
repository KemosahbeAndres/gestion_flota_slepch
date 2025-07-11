# -*- coding: utf-8 -*-

from odoo import models, fields, api


class Vehicle(models.Model):
    _inherit = 'fleet.vehicle'

    document_ids = fields.One2many('flota.document', 'resource_ref', compute='_compute_documents')
    assignment_state = fields.Selection([
        ('free', 'Libre'),
        ('occupied', 'Ocupado')
    ], string='Estado de Asignación', default='free')

    def _compute_documents(self):
        for vehicle in self:
            vehicle.document_ids = self.env['flota.document'].search([
                ('ref_model', '=', 'fleet.vehicle'),
                ('ref_id', '=', vehicle.id)
            ])

