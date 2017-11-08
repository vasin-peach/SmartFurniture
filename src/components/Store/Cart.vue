<template>
    <div class="panel panel-default" v-if="products">
        <div class="panel-heading">
            <strong>{{ products.name }}</strong>
        </div>
        <div class="panel-body" style="padding: 10px;">
            <div class="row">
                <div class="col col-sm-5">
                    <img :src="products.image" style="width: 100%;">
                </div>
                <div class="col col-sm-7">
                    <div class="row well" style="width: 100%;">
                        <p>{{ products.detail }}</p>
                    </div>
                    <hr>
                    <div class="row">
                        <div v-for="tag in products.tag" style="float:left; margin: 2px">
                            <router-link :to="{ name: 'Search', params: {searchVal: tag}}" class="label label-info">{{tag}}</router-link>
                        </div>
                    </div>
                    <hr>
                    <div class="row text-center">
                        <h2><strong class="text-left">{{ products.price }}<b style="color:green">฿</b></strong></h2>
                    </div>
                    <hr>
                    <button class="btn btn-success" @click="buyProduct()"><i class="fa fa-shopping-cart" aria-hidden="true"> Buy</i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Cart',
    props: ['Auth', 'Products'],
    date() {
        return {
            products: null
        }
    },
    created() {
        const this_ = this
        var article = this.$route.params.article

        for(var current in this_.Products) {
            var currentArticle = this_.Products[current].article
            if (currentArticle == article) {
                this_.products = this_.Products[current]
            }
        }

        // var db = firebase.database().ref('products/')
        // db.orderByChild('article').equalTo(this_.article).once('value', function(snapshot) {
        //     for (var i in snapshot.val()) {
        //         this_.product = snapshot.val()[i]
        //     }
        //     this_.buyItem()
        // })
    },
    methods: {
        buyProduct() {
            const this_ = this
            const dataSet = {
                userName: this.Auth.displayName,
                userEmail: this.Auth.email,
                userUid: this.Auth.uid,
                productArticle: this.products.article,
                productName: this.products.name,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            }
            firebase.database().ref('history/').push(dataSet).then(function() {
                alert('สั่งซื้อสินค้าเสร็จสิ้น')
                this_.$router.replace({ name: 'Home' })
            }) 
        }
    }
}
</script>

<style>

</style>
