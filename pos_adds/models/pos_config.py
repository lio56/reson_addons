# -*- coding: utf-8 -*-

from odoo import models, fields

class PosConfig(models.Model):
    _inherit = "pos.config"

    show_discount_popup_all_users = fields.Boolean(string="Show available discount list (popup)",
                                                   compute="_get_show_discount", )

    def _get_show_discount(self):
        '''
        Get values of the 'show all available disc' field from settings

        :return: True if restriction is activated, False else
        '''
        resrict_show_discount = self.env['ir.config_parameter'].sudo().get_param('pos_adds.pos_show_coupon_programme')
        show_discount_users = self.env['ir.config_parameter'].sudo().get_param('pos_adds.discounts_codes_allowed_users')

        if resrict_show_discount:
            if show_discount_users == 'manager':
                self.show_discount_popup_all_users = False
            else:
                self.show_discount_popup_all_users = True
        else:
            self.show_discount_popup_all_users = True
