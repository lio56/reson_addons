# -*- coding: utf-8 -*-

from odoo import models, fields


class PosConfig(models.Model):
    _inherit = "pos.config"

    show_discount_popup = fields.Selection([('all_users', 'All users'), ('manager', 'Manager Only'), ('none', 'Not allowed')],string="Show available discount list (popup)",
                                                   compute="_show_discount", default="none")

    def _show_discount(self):
        '''
        Get values of the 'show all available disc' field from settings

        :return: returns the value associated to the user configuration de manage access
        '''
        resrict_show_discount = self.env['ir.config_parameter'].sudo().get_param('pos_adds.pos_show_coupon_programme')
        show_discount_users = self.env['ir.config_parameter'].sudo().get_param('pos_adds.discounts_codes_allowed_users')

        self.show_discount_popup = 'none'
        if resrict_show_discount:
            if show_discount_users == 'manager':
                self.show_discount_popup = 'manager'
            else:
                self.show_discount_popup = 'all_users'
