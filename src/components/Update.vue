<template>
  <div>
        Update Page
        <hr>
        {{ products }}
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
    data() {
        return {
            allTags: null,
            products: null,
        }
    },
    created() {
        this.tagsAll()
    },
    methods: {
        // tagsAll() {
        //     const this_ = this
        //     firebase.database().ref('products/').once('value').then( function(snapshot) {
        //         var products = snapshot.val()
        //         var searchAll = []
        //         // Create tags for search list
        //         for (var i in products) {
        //             searchAll = searchAll.concat(products[i].tag)
        //             searchAll = searchAll.filter(function(elem, index, self) {
        //                 return index == self.indexOf(elem);
        //             })
        //         }
        //         this_.products = searchAll
        //     })
        // }
    }
}
</script>

<style>

</style>
