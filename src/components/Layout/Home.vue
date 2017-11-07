<template>
  <div>
    <transition name="product-loading">
      <div class="row products" v-if="auth && products">
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
                              <router-link :to="{ name: 'Search', params: {searchVal: tag}}" class="label label-info">{{tag}}</router-link>
                              
                            </div>
                          </div>
                          <div class="clear:both"></div><br><hr>
                        </div>

                        <!-- Price -->
                        <strong class="text-left">{{ product.price }}<b style="color:green">฿</b></strong>
                        <hr>
                        <!-- Buy Button -->
                        <button class="btn btn-success"><i class="fa fa-shopping-cart" aria-hidden="true"> Buy</i></button>
                      </div>

                  </div>
                  <!-- Caption -->
              </div>
              <!-- Item -->
            </div>
            <!-- Thumbnail -->

          </div>
        </div>
        <div class="body-footer" v-if="productLoad" style="padding: 10px 0px 30px">
            <i class="fa fa-circle-o-notch fa-spin fa-5x fa-fw"></i>
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
  name: 'Home',
  created() {
    // scroll hit bottom
    const this_ = this
    

      $(window).scroll(function() {

        if (this_.products) {
          if($(window).scrollTop() == $(document).height() - $(window).height()) {
            if (window.location.pathname == '/home') {
              // loading animate
              this_.productLoad = true
              // loading product random
              firebase.database().ref('products/').on('value', function(snapshot) {
                var allIndex = []
                var randomData = []
                var showData = []
                var pickCount = 24
                for(var i in snapshot.val()) {
                  allIndex.push(i)
                }
                for(var i=0; i<pickCount; i++) {
                  var randomIndex = allIndex[Math.floor(Math.random() * allIndex.length)]
                  randomData.push(snapshot.val()[randomIndex])
                }
                this_.productLoad = false
                this_.products = this_.products.concat(randomData)
              }, function(error) {
                console.log(error)
              })
            }

            
          }
        }

      })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {

        this.auth = user
        const this_ = this

        firebase.database().ref('users/').orderByChild('uid').equalTo(this.auth.uid).once('value').then( function(snapshot) {
          for(var i in snapshot.val()) {
            // Create user data
            this_.user = snapshot.val()[i]
          }

          //New User
          if (!this_.user.tags) { 
            console.log('[LOAD] new User.')
            // Read random
            firebase.database().ref('products/').on('value', function(snapshot) {
              var allIndex = []
              var randomData = []
              var showData = []
              var pickCount = 24
              for(var i in snapshot.val()) {
                allIndex.push(i)
              }
              for(var i=0; i<pickCount; i++) {
                var randomIndex = allIndex[Math.floor(Math.random() * allIndex.length)]
                randomData.push(snapshot.val()[randomIndex])
              }

              this_.products = randomData
            })

          //Old User
          } else { 
            console.log('[LOAD] old User.')
            // Read random
            firebase.database().ref('products/').on('value', function(snapshot) {
              var allIndex = []
              var randomData = []
              var showData = []
              var pickCount = 24
              for(var i in snapshot.val()) {
                allIndex.push(i)
              }
              for(var i=0; i<pickCount; i++) {
                var randomIndex = allIndex[Math.floor(Math.random() * allIndex.length)]
                randomData.push(snapshot.val()[randomIndex])
              }

              this_.products = randomData
            })
          }
        })
        
      } else {
        this.auth = false
      }
    });   
  },
  data() {
    return {
      auth: false,
      user: null,
      products: null,
      productLoad: false,
      currentRoute: this.$route.name
    }
  },
  methods: {
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
      setTimeout(function() {
        $('html, body').stop().animate({
          scrollTop: productId.offset().top - 80
        }, 400)
      }, 400)
      
      productImg.addClass('col-sm-6')
      productCaption.addClass('col-sm-6')
      productHide.css('display', 'block')


      // view product interested 
      var uid = this.auth.uid
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
.product {
  transition: all 0.4s ease;
  padding: 15px 25px;
}
.thumbnail {
  padding: 20px;
}
.products > div {
  /* transition: width 0.5s ease, margin 0.5s ease, padding 0.5s ease; */
  transition: all 0.4s ease;
}
.product-loading-enter-active, .product-loading-leave-active {
    transition: all 0.4s;
}
.product-loading-enter, .product-loading-leave-to{
    opacity: 0;
}
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

.detail {
  display: none;
}
</style>
