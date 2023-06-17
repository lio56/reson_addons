# -*- coding: utf-8 -*-


{
    'name': 'Point Of Sale : Show all available discounts',
    'version': '15.0',
    'author': 'MOKRANI Lilya',
    'category': 'Sales/Point of Sale',
    'sequence': 50,
    'website': 'http://www.deltalog.dz',
    'summary': 'Cutomized adds to point of sale',
    'description': """
    Adds a popup button in the 'Enter code' popup, to display all the available discounts.
    Manage its visibility according to the specific configurations
    """,
    'images': ['static/description/icon.png',],
    'depends': ['point_of_sale', 'pos_coupon'],
    'assets': {
        'point_of_sale.assets': [
            'pos_adds/static/src/js/custom_coupon_list_popup.js',
            'pos_adds/static/src/js/custom_enter_code_popup.js',
            'pos_adds/static/src/js/custom_promo_code_button.js',

        ],

        'web.assets_qweb': [
            'pos_adds/static/src/xml/Popups/custom_promo_popup.xml',
            'pos_adds/static/src/xml/Popups/custom_list_coupon_programms_popup.xml',
        ],

    },


    'data': [
        'views/res_config_setting.xml',
        'views/res_config_setting.xml'
             ],
    'demo': [],
    'test': [],
    'installable': True,
    'application': False,
    'auto_install': False,
    'css': [],
}
# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4:
