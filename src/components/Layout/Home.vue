<template>
  <div>
    <transition name="product-loading">
      <div class="row products" v-if="auth && products">
        <div v-for="product in products">
          <div :id='product.article' class="col col-xs-6 col-sm-4 col-md-3 product" @click="viewProduct(product.article)">
            <div class="thumbnail">
              <div class="row">
                  <div class="product-image col-sm-12">
                    <img v-bind:src="product.image" style="width: 90%">
                  </div>
                  <div class="product-caption col-sm-12">
                      <div>
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
                              <div class="label label-info">{{tag}}</div>
                            </div>
                          </div>
                          <div class="clear:both"></div><br><hr>
                        </div>

                        <strong class="text-left">{{ product.price }}<b style="color:green">฿</b></strong>
                      </div>

                  </div>
              </div>
             

             
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="body-loading" v-if="!products">
      <i class="fa fa-circle-o-notch fa-spin fa-5x fa-fw"></i>
    </div>
      
      <!-- <div class="row products" v-else>
        <div v-for="i in 24">
          <div class="col-xs-6 col-sm-4 col-md-3 col-lg-3">
            <div class="thumbnail">
              <a href="">
                <img src="http://www.ikea.com/th/en/images/products/kungsholmen-kungso-corner-sofa-outdoor-black__0257376_PE401342_S4.JPG">
                <div class="caption row">
                  <div class="col-sm-12"><strong>KUNGSHOLMEN / KUNGSÖ</strong></div>
                  <div class="col-sm-offset-2 col-sm-8 label label-success" style="font-size: 15px;">32740 Bath</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div> -->
    
    
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Home',
  created() {
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
            console.log('[LOAD] New User.')
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
            console.log('[LOAD] Old User.')
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
    }
  },
  methods: {
    viewProduct: function(article) {
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
      productId.addClass('col-xs-12 col-sm-8 col-md-9 ')
      $('#' + article + ' .detail').css('display', 'block')
      setTimeout(function() {
        $('html, body').stop().animate({
          scrollTop: productId.offset().top - 80
        }, 500)
      }, 1000)


      // $('.product .product-image').removeClass('col-sm-6')
      // $('.product .product-image ' + article).toggleClass('col-sm-6')
      
      productImg.addClass('col-sm-6')
      productCaption.addClass('col-sm-6')
      productHide.css('display', 'block')

    }
  }
}
</script>

<style>
.product {
  transition: all 1s ease;
  padding: 15px 25px;
}
.thumbnail {
  padding: 20px;
  transition: all 0.5s ease;
}
.products > div {
  /* transition: width 0.5s ease, margin 0.5s ease, padding 0.5s ease; */
  transition: all 0.5 ease;
}
.product-loading-enter-active, .product-loading-leave-active {
    transition: all 0.5s;
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
