var app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    inStock: true,
    image: "./assets/vmSocks-green-onWhite.jpg",
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    sizes: ["small", "medium", "large"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
        image: "./assets/vmSocks-green-onWhite.jpg",
      },
      {
        variantId: 2235,
        variantColor: "blue",
        image: "./assetsvmSocks-blue-onWhite.jpg",
      },
    ],
    cart: 0,
  },
  methods: {
    addToCart: function () {
      this.cart += 1;
    },
  },
});