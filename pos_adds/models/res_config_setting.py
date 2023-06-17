# -*- coding: utf-8 -*-

from odoo import api, fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    pos_show_coupon_programme = fields.Boolean("Available discount codes",
                                               help="Allow user to show avaiable discount codes in PoS.")
    discounts_codes_allowed_users = fields.Selection([('all_users', 'All Users'),
                                                          ('manager', 'Manager only'),], "Allowed users", default='all_users',config_parameter="pos_adds.discounts_codes_allowed_users",
                                                         help="Persons that can see the avaiable discount codes button in the enter discount code popup.")

    @api.model
    def get_values(self):
        res = super(ResConfigSettings, self).get_values()
        res['pos_show_coupon_programme'] = self.env['ir.config_parameter'].sudo().get_param("pos_adds.pos_show_coupon_programme", default="")
        res['discounts_codes_allowed_users'] = self.env['ir.config_parameter'].sudo().get_param("pos_adds.discounts_codes_allowed_users", default="")
        return res

    @api.model
    def set_values(self):
        self.env['ir.config_parameter'].set_param("pos_adds.pos_show_coupon_programme", self.pos_show_coupon_programme or '')
        self.env['ir.config_parameter'].set_param("pos_adds.discounts_codes_allowed_users", self.discounts_codes_allowed_users or '')
        super(ResConfigSettings, self).set_values()

