# -*- coding: utf-8 -*-
{
    'name': "Sistema de Gestion de Flota",

    'summary': "Gestion de Flota SLEP Chinchorro",

    'description': """
Long description of module's purpose
    """,

    'author': "Andres Cubillos S.",
    'website': "https://www.slepch.cl/",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/15.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Fleet',
    'version': '0.1.1',

    # any module necessary for this one to work correctly
    'depends': ['fleet', 'website'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
        'views/gestion_flota_menus.xml'
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],
    'icon': "/gestion_flota_slepch/static/description/odoo_fleet_icon.png",
    'installable': True,
    'application': True
}

