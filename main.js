Vue.config.devtools = true;

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
         <div class="product">
              
            <div class="product-image">
              <img :src="image" />
            </div>
      
            <div class="product-info">
                <h1>{{ product }}</h1>
                <p v-if="inStock">In Stock</p>
                <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>
      
                <ul>
                  <li v-for="detail in details">{{ detail }}</li>
                </ul>
      
                <div class="color-box"
                     v-for="(variant, index) in variants" 
                     :key="variant.variantId"
                     :style="{ backgroundColor: variant.variantColor }"
                     @mouseover="updateProduct(index)"
                     >
                </div> 
      
                <button v-on:click="addToCart" 
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock }"
                  >
                Add to cart
                </button>
      
             </div>  

             <div>
              <h2>Reviews</h2>
              <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                  <li v-for="review in reviews">
                    <span>{{ review.name }}</span>
                    <span>Rating: {{ review.rating }}</span>
                    <span>Review: {{ review.review }}</span>
                    <span>Recommend: {{ review.recommend }}</span>
                  </li>
                </ul>
             </div>

            <product-review @review-submitted="addReview"></product-review>
          </div>
         `,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
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
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    addReview(productReview) {
      this.reviews.push(productReview);
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
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});

Vue.component("product-review", {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
        <b>Please correct the following error(s): </b>
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
      </p>

        <p>
          <label for="name">Name:</label>
          <input class="name" v-model="name">
        </p>
        
        <p>
          <label for="review">Review:</label>      
          <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p></br>

        <p>Would you recommend this product?</p>
        
        <label for="yes"><input type="radio" value="yes" v-model="recommend">Yes</label><br>
        <label for="no"><input type="radio" value="no" v-model="recommend">No</label><br>
            
        <p>
          <input type="submit" value="Submit">  
        </p>    

    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.recommend) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend,
        };
        this.$emit("review-submitted", productReview);
        (this.name = null), (this.review = null), (this.rating = null);
      } else {
        if (!this.name) this.errors.push("Name required");
        if (!this.review) this.errors.push("Review required");
        if (!this.rating) this.errors.push("Rating required");
        if (!this.recommend) this.errors.push("Recommend required");
      }
    },
  },
});

Vue.component('product-tabs', {
  template: `
    <div>
      <span class="tab"
      v-for="(tab, index) in tabs" :key="index">{{ tab }}</span>
    </div>
  `,
  data(){
    return {
      tabs: ['Reviews', 'Make a Review']
    }
  }
})

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
  },
});
