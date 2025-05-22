# -*- coding: utf-8 -*-
{
    'name': "Sistema de Educacion",

    'summary': "Gestion de Establecimientos",

    'description': """
Long description of module's purpose
    """,

    'author': "Andres Cubillos S.",
    'website': "https://www.slepch.cl/",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Education',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        #'views/views.xml',
        #'views/templates.xml',
    ],
    'installable': True,
    'application': False
}

