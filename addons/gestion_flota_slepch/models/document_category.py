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
    document_type = fields.Selection(
        selection=[
            ('vehicles', 'Vehículos'),
            ('drivers', 'Conductores'),
            ('contracts', 'Contratos'),
            ('incidents', 'Incidentes'),
        ],
        string='Tipo de Documento',
        required=True
    )

    @api.model
    def get_category_hierarchy(self, document_type=None):

        domain = []
        if document_type:
            domain.append(('document_type', '=', document_type))

        categories = self.search(domain).read(['id', 'name', 'parent_id', 'document_type', 'required'])

        # Construir jerarquía en backend
        category_map = {cat['id']: {**cat, 'children': []} for cat in categories}
        hierarchy = []
        
        for cat in categories:
            parent_id = cat['parent_id'][0] if cat['parent_id'] else None
            if parent_id and parent_id in category_map:
                category_map[parent_id]['children'].append(category_map[cat['id']])
            else:
                hierarchy.append(category_map[cat['id']])

        return hierarchy