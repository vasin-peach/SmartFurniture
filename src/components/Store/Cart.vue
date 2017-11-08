<template>
    <div class="panel panel-default" v-if="product">
        <div class="panel-heading">
            {{ product }}
        </div>
        <div class="panel-body">
            
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'Cart',
    date() {
        return {
            article: null,
            product: null
        }
    },
    created() {
        const this_ = this
        this.article = this.$route.params.article

        var db = firebase.database().ref('products/')
        db.orderByChild('article').equalTo(this_.article).once('value', function(snapshot) {
            for (var i in snapshot.val()) {
                this_.product = snapshot.val()[i]
            }
            this_.buyItem()
        })
    },
    methods: {
        buyItem() {
            console.log('hi')
        }
    }
}
</script>

<style>

</style>
