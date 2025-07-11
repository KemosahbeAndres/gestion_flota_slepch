# -*- coding: utf-8 -*-

from odoo import models, fields, api


class VehicleAssignment(models.Model):
    _name = 'flota.vehicle.assignment'
    _description = 'Asignación de Vehículo'

    vehicle_id = fields.Many2one('fleet.vehicle', string='Vehículo')
    assigned_to = fields.Many2one('res.partner', string='Asignado A')
    assignment_type = fields.Selection([
        ('exclusive', 'Exclusivo'),
        ('shared', 'Compartido')
    ], string='Tipo de Asignación', default='exclusive')
    date_start = fields.Date('Fecha Inicio')
    date_end = fields.Date('Fecha Fin')
    notes = fields.Text('Notas')
    state = fields.Selection([
        ('draft', 'Borrador'),
        ('active', 'Activo'),
        ('done', 'Finalizado')
    ], string='Estado', default='draft')
