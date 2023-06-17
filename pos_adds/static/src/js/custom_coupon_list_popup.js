odoo.define('blog.CouponProgramsPopup', function (require) {
    'use strict';

    const { useListener } = require("@web/core/utils/hooks");
    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const Registries = require('point_of_sale.Registries');
    const { useState } = owl;

    class CouponProgramsPopup extends AbstractAwaitablePopup {
        setup() {
            super.setup();
            this.state = useState({ selectedCouponProgram: this.props.startingValue });

            useListener('choose-coupon', this.GetCouponProgramsPopup);
        }

        mounted() {
            this.env.pos.on('change:selectedCouponProgram', this.render, this);
        }

        // If a coupon code is selected from the liste : add it to the current order
        GetCouponProgramsPopup(item) {
            if (item.detail.promo_code !== '') {
                    const order = this.env.pos.get_order();
                    order.activateCode(item.detail.promo_code);
                }

             this.trigger('close-popup');
        }


    }

    CouponProgramsPopup.template = 'CouponProgramsPopup';
    CouponProgramsPopup.defaultProps = {
        confirmText: 'Ok',
        cancelText: 'Cancel',
        title: '',
        body: '',
    };

    Registries.Component.add(CouponProgramsPopup);

    return CouponProgramsPopup;
});
