<template>
  <div>
    <button v-if="!isCheckoutVisible" @click="showCheckout">200 UAN</button>
    <div v-show="isCheckoutVisible">
      <div id="checkout_wrapper"></div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'order-create-user',
  data() {
    return {
      status: '',
      isCheckoutVisible: false,
      button: null,
      ipsp: null,
    };
  },
  methods: {
    async hideDialog() {
      this.$emit('updateShowAfterUpdate', false);
    },
    async hideDialogPaymant(bool) {
      this.dialogVisible = bool;
    },
    showCheckout() {
      this.isCheckoutVisible = true;
      this.button.setHost('pay.fondy.eu');
      this.checkoutInit(this.button.getUrl());
    },
    checkoutInit(url) {
      const DEFAULTCALLBACK = (data) => {
        console.log(data);
      };
      this.ipsp('checkout').scope(() => {
        this.ipsp('checkout').setCheckoutWrapper('#checkout_wrapper');
        this.ipsp('checkout').addCallback(DEFAULTCALLBACK);
        this.ipsp('checkout').action('show', () => {
          $('#checkout_loader').remove();
          $('#checkout').show();
        });
        this.ipsp('checkout').action('hide', () => {
          $('#checkout').hide();
        });
        this.ipsp('checkout').action('resize', (data) => {
          $('#checkout_wrapper').width(480).height(data.height);
        });
        this.ipsp('checkout').loadUrl(url);
      });
    },
  },
  mounted() {

    this.button = this.ipsp.get('button');
    this.button.setMerchantId(1396424);
    this.button.setAmount(200, 'UAH', true);
  },
};
</script>

<style scoped>
.create--order {
  padding-block: 30px;
  padding-inline: 60px;
}
.form-control {
  border-color: black;
  font-size: 20px;
}
.form-select {
  border-color: #0c3823;
  font-size: 20px;
}
.input--element {
  margin-block: 30px 30px;
}
.btn--element {
  margin-top: 30px;
}
.edit--label {
  padding: 10px;
  text-align: center;
  font-size: 28px;
  color: #0c3823;
}
.btn {
  font-size: 20px;
  width: 100%;
}
.create--label {
  padding: 10px;
  text-align: center;
  font-size: 28px;
  color: #0c3823;
}
.checkout {
  visibility: hidden;
}
.checkout-wrapper {
  height: 1000px;
}
</style>
