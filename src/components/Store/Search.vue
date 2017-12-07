<template>
  <div>
    <transition name="product-loading">
      
      <div class="row products" v-if="Auth && products">
        <div v-if="products.length < 1" class="well">
          <h2>Item not found.</h2>
        </div>
        <div v-for="product in products">
          <div :id='product.article' class="col col-xs-6 col-sm-4 col-md-3 product" @click="viewProduct(product.article, product.tag)">
            <!-- Thumbnail -->
            <div class="thumbnail">

              <!-- Item -->
              <div class="row">

                  <!-- Img -->
                  <div class="product-image col-sm-12">
                    <img v-bind:src="product.image" style="width: 90%">
                  </div>

                  <!-- Caption -->
                  <div class="product-caption col-sm-12">

                      <div>
                        <!-- Name -->
                        <strong>{{ product.name }}</strong>
                        <hr>

                        <!-- Hide -->
                        <div class="product-hide" style="display: none">
                          <div class="well well-sm text-left">
                            <p>{{ product.detail }}</p>
                          </div>
                          <hr>
                          
                          <!-- Tag -->
                          <div>
                            <div v-for="tag in product.tag" style="float:left; margin: 2px">
                              <router-link :to="{ name: 'Search', params: {searchVal: tag.toLowerCase()}}" class="label label-info">{{tag.toLowerCase()}}</router-link>
                            </div>
                          </div>
                          <div class="clear:both"></div><br><hr>
                        </div>

                        <!-- Price -->
                        <strong class="text-left">{{ product.price }}<b style="color:green">฿</b></strong>
                        <hr>
                        <!-- Buy Button -->
                        <!-- <button class="btn btn-success"><i class="fa fa-shopping-cart" aria-hidden="true"> Buy</i></button> -->
                        <router-link :to="{ name: 'Cart', params: {article: product.article}}" class="btn btn-success"><i class="fa fa-shopping-cart" aria-hidden="true"> Buy</i></router-link>
                      </div>

                  </div>
                  <!-- Caption -->
              </div>
              <!-- Item -->
            </div>
            <!-- Thumbnail -->

          </div>
        </div>
      </div>
    </transition>


    <!-- Loading Product -->
    <div class="body-loading" v-if="!products && auth">
      <i class="fa fa-circle-o-notch fa-spin fa-5x fa-fw"></i>
    </div>

  </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Search',
    beforeRouteUpdate (to, from, next) {
      var path = to.path.split('/')
      this.path = path[path.length-1]
      this.products = []
      this.fetchData()
    },
    created() {
        const this_ = this
        var ref = firebase.database().ref('products/')
        this.fetchData()
    },
    props: ['Auth', 'Products'],
    data() {
      return {
        auth: null,
        products: [],
        loading: false,
        post: null,
        error: null,
        path: this.$route.params.searchVal
      }
    },
    methods: {

      // Fetch data
      fetchData: function() {
        const this_ = this
        var currentSearch = this.path

        for(var i in this_.Products) {
          var currentTag = this_.Products[i].tag
          var currentName = this_.Products[i].name
          
          if (currentTag.indexOf(currentSearch) > 0 || currentName == currentSearch.toUpperCase()) {
            this_.products = this_.products.concat(this_.Products[i])
          }
        }
      },
      viewProduct: function(article, getTag) {

          // Product Layout
          var productId = $('#' + article)
          var productImg = $('#' + article + ' .product-image')
          var productCaption = $('#' + article + ' .product-caption')
          var productHide = $('#' + article + ' .product-hide')

          $('.product').removeClass('col-xs-12 col-sm-12 col-md-12')
          $('.product').addClass('col-xs-6 col-sm-4 col-md-3')
          $('.product img').css('width', '90%')
          $('.product .detail').css('display', 'none')
          $('.product-image, .product-caption').removeClass('col-sm-6')
          $('.product-hide').css('display', 'none')

          productId.toggleClass('col-xs-6 col-sm-4 col-md-3')
          productId.toggleClass('col-xs-12 col-sm-12 col-md-12')
          // productId.addClass('col-xs-12 col-sm-8 col-md-9 ')
          productId.addClass('col-xs-12 col-sm-12 col-md-12 ')
          $('#' + article + ' .detail').css('display', 'block')

          const this_ = this
          setTimeout(function() {
            try {
              $('html, body').stop().animate({
                scrollTop: productId.offset().top - 80
              }, 400)
            } catch (e) {}
          }, 400)

          productImg.addClass('col-sm-6')
          productCaption.addClass('col-sm-6')
          productHide.css('display', 'block')



        // view product interested 
        var uid = this.Auth.uid
        var db = firebase.database()
        var dataRef = db.ref('users/').orderByChild('uid').equalTo(uid).once('value', function(snapshot) {
          for (var i in snapshot.val()) {
            var userKey = i
          }
          for (var x in getTag) {
            var cTag = getTag[x]
            var tagsRef = firebase.database().ref('users/').child(userKey).child('tags').child(cTag)
            tagsRef.transaction(function(cTag) {
              return cTag + 1
            })
          }
        })
      }
    }
}
</script>

<style>
.body-loading {
  position: fixed;
  top:0; bottom:0;
  right:0; left:0;
}
  .body-loading i {
    position: relative;
    top: 45%;
    transform: translateY(-55%)
  }
</style>
