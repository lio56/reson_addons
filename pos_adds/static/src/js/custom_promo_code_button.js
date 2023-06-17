odoo.define('pos_adds.CustomPromoCodeButton', function (require) {
    'use strict';

    const PromoCodeButton = require('pos_coupon.PromoCodeButton');
    const Registries = require('point_of_sale.Registries');
    const Dialog = require('web.Dialog');
    const core = require('web.core');
    const _t = core._t;
    const { Gui } = require('point_of_sale.Gui');
    const PosGlobalState = require('point_of_sale.models');

    // 1 : inherit the CustomPromoCodeButton component to modify its behavour
    const CustomPromoCodeButton = PromoCodeButton => class extends PromoCodeButton {

        constructor() {
         super(...arguments);
        }

        async onClick() {
        // We call the CouponCodePopup that we've created
        // CouponCodePopup contains a text input and a button to show a list of the available coupon programmms
            const { confirmed, payload: code } = await this.showPopup('CouponCodePopup', {
                title: this.env._t('Enter Code'),
                startingValue: '',
            });


            // Use the value returned from the popup (In case of Text input) to be applied to the current order
            if ( confirmed && code !== '') {
                const order = this.env.pos.get_order();
                order.activateCode(code);
            }
        }

    };

    // save the inherited component to registry
    Registries.Component.extend(PromoCodeButton, CustomPromoCodeButton);

    return CustomPromoCodeButton;
});

