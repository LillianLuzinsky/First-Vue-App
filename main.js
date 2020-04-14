Vue.component("product", {
  template: `
  <div class="product">

      <div class="product-image">
        <img v-bind:src="image" alt="green socks">
      </div>

      <div class="product-info">
        <h1>{{ brand }} {{ product }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else 
            :class="{ outOfStock:!inStock }">Out of Stock</!DOCTYPE>
        <p v-if="inStock">{{ sale }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div v-for="(variant, index) in variants" 
              :key="variant.variantId"
              class="color-box"
              :style="{ backgroundColor: variant.variantColor }"
              @mouseover="updateProduct(index)">
        </div>

        <button v-on:click="addToCart" 
                    :disabled="!inStock"
                    :class="{ disabledButton:!inStock }"
        >Add to Cart</button>

        <div class="cart">
          <p>Cart({{ cart }})</p>
        </div>
        
      </div>
  `,

  data() {
    return{
    brand: "Vue Mastery",
        product: "Socks",
        selectedVariant: 0,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        sizes: ["small", "medium", "large"],
        variants: [
          {
            variantId: 2234,
            variantColor: "green",
            variantImage: "./assets/vmSocks-green-onWhite.jpg",
            variantQuantity: 10,
          },
          {
            variantId: 2235,
            variantColor: "blue",
            variantImage: "./assets/vmSocks-blue-onWhite.jpg",
            variantQuantity: 0,
          },
        ],
        cart: 0,
        onSale: true,
      }
    },
    
  methods: {
    addToCart() {
      this.cart += 1;
    },
    remove() {
      this.cart -= 1;
    },
    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    sale() {
      if (this.onSale) {
        return this.brand + " " + this.product + " are on sale!";
      }
      return this.brand + " " + this.product + " are not on sale";
    }
  }
});

var app = new Vue({
  el: "#app",
});