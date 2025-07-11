# -*- coding: utf-8 -*-

from odoo import models, fields, api


class DocumentCategory(models.Model):
    _name = 'flota.document.category'
    _description = 'Categoría de Documentos'
    #_parent_name = 'parent_id'  # Esto habilita características nativas de jerarquía
    #_parent_store = True  # Permite búsquedas jerárquicas eficientes

    name = fields.Char(required=True, string='Nombre de la Categoría')
    active = fields.Boolean(default=True)
    required = fields.Boolean(string='¿Es obligatorio?', default=False)  # Para validar cumplimiento
    parent_id = fields.Many2one(
        'flota.document.category',
        string='Categoría Padre'
    )
    child_ids = fields.One2many(
        'flota.document.category',
        'parent_id',
        string='Subcategorías'
    )
    parent_path = fields.Char(index=True)  # Necesario para soportar búsquedas jerárquicas (`_parent_store = True`)

