from odoo import http
from odoo.http import request

class DocumentCategoryController(http.Controller):

    @http.route('/flota/categories', type='json', auth='user')
    def get_categories_by_type(self, document_type):
        valid_types = ['vehicles', 'drivers', 'contracts', 'incidents']

        if document_type not in valid_types:
            return {'error': 'Tipo de documento no válido'}

        categories = request.env['flota.document.category'].search_read(
            [('document_type', '=', document_type)],
            ['id', 'name', 'parent_id', 'required', 'document_type']
        )

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