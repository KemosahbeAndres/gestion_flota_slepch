# -*- coding: utf-8 -*-
{
    'name': "Plataforma para la Gestion de Flota",

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
    'version': '0.1.4',
    'license': 'LGPL-3',
    # any module necessary for this one to work correctly
    'depends': ['base', 'fleet', 'web'],
    'assets': {
        'web.assets_backend': [
            #'gestion_flota_slepch/static/src/js/stores/doctype_store.js',
            'gestion_flota_slepch/static/src/js/components/doctypes/document_type_form_template.xml',
            'gestion_flota_slepch/static/src/js/components/doctypes/document_type_form.js',
            'gestion_flota_slepch/static/src/js/components/doctypes/doctypes_hierarchy_list_template.xml',
            'gestion_flota_slepch/static/src/js/components/doctypes/doctypes.js',
            #'gestion_flota_slepch/static/src/js/useFleetStats.js',
            'gestion_flota_slepch/static/src/js/pages/doctypes_template.xml',
            'gestion_flota_slepch/static/src/js/pages/doctypes.js',
            'gestion_flota_slepch/static/src/js/pages/dashboard_template.xml',
            'gestion_flota_slepch/static/src/js/pages/dashboard.js',
            'gestion_flota_slepch/static/src/js/main.js',
        ]
    },
    # always loaded
    'data': [
        #'security/gestion_flota_groups.xml',
        'security/models.xml',
        'security/ir.model.access.csv',
        'views/gestion_flota_menus.xml'
    ],
    # only loaded in demonstration mode
    #'demo': [
    #    'demo/demo.xml',
    #],
    'icon': "/gestion_flota_slepch/static/description/odoo_fleet_icon.png",
    'installable': True,
    'application': True
}

