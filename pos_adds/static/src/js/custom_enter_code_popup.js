odoo.define('pos_adds.CouponCodePopup', function(require) {
    'use strict';

    const { useState, useRef, useContext } = owl.hooks;
    const ProductScreen = require("point_of_sale.ProductScreen");

    const { useListener } = require("@web/core/utils/hooks");
    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const Registries = require('point_of_sale.Registries');
    const { _lt } = require('@web/core/l10n/translation');
    var rpc = require('web.rpc');
    //const config = require('web.config');
    const { PosContext } = require('point_of_sale.PosContext');
    var session = require('web.session');

    // We create a new custom popup component that contains the information that we want (text input and button)
    class CouponCodePopup extends AbstractAwaitablePopup {

        constructor() {
            super(...arguments);
            this.state = useState({ inputValue: this.props.startingValue });
            this.inputRef = useRef('input');
            this.confirmed = true;
            this.code = '';
            //this.hasGroup = false;
            useListener('display_couponlist_popup', this.GetCouponProgramsPopup);
        }


//        async getConfigParameter() {
//            const response = await rpc.query({
//                model: 'res.config.settings',
//                method: 'get_param',
//                args: ['discounts_codes_allowed_users'],
//            });
//            return response;
//        }



        async start() {
            const param = this.env.pos.config;
            const self = this;

            // Retrieve value of 'show_discount_popup_all_users' field in pos settings,
            // which indicate whether the restriction is activated or not
            const allow_show_discount = param.show_discount_popup;

            console.log(allow_show_discount);

            // Check if the current user has a pos manager group access
            const hasGroup = await rpc.query({
                model: 'res.users',
                method: 'has_group',
                args: ['point_of_sale.group_pos_manager'],
            });

            // When restriction is activated and the user in not a manager
            // action : hide the popup button
            if (allow_show_discount == 'manager' && !hasGroup || allow_show_discount == 'none') {
                const documentViewerElements = self.el.querySelector('#custom_coupon_list');
                documentViewerElements.classList.add('o_hidden');
                documentViewerElements.style.display = 'none';
            }

        }

        mounted() {
            this.inputRef.el.focus();
            this.start();
        }

        getPayload() {
            return this.state.inputValue;
        }

        // In case of using the button to choose a coupon program from a list
        async GetCouponProgramsPopup() {

            // Extract data from model ['coupon.program'] in order to display it in the popup
                const response = await this.rpc({
                    model: 'coupon.program',
                    method: 'search_read',
                    args: [[]],
                    fields: ['id', 'name', 'promo_code', 'discount_percentage'],
                });


            // Here we call the CouponProgramsPopup witch should contain a list of coupon programms
            // We pass the data through 'coupons_prog'
                this.confirmed, this.code = await this.showPopup('CouponProgramsPopup', {
                    title: this.env._t('Please select a reward'),
                    startingValue: '',
                    coupons_prog : response,
                });

        }

    }

    CouponCodePopup.template = 'CouponCodePopup';
    CouponCodePopup.defaultProps = {
        confirmText: _lt('Confirm'),
        cancelText: _lt('Discard'),
        title: '',
        body: '',
        startingValue: '',
    };


    Registries.Component.add(CouponCodePopup);

    return CouponCodePopup;
});
