<template>
  <div>
      JSON PAGE
      <!-- <div v-for="current in jsonData">
          {{ current }} <hr>
      </div> -->
  </div>
</template>

<script>
import jsonFile from '../products.json'
import firebase from 'firebase'
export default {
    name: 'Json',
    created() {

        // Check Product Up to date.
        var check = jsonFile[jsonFile.length-1].article
        firebase.database().ref('products/').orderByChild("article").equalTo(check).once('value').then( function(snapshot) {
            for(var i in snapshot.val()) {
                var articleCheck = snapshot.val()[i].article
            }

            if (check != articleCheck) {
                console.log('[START] update products.')
                $.each(jsonFile, function(key, value) {
                    var article = value.article.split('.').join("-")
                    var name = value.name.replace(/(\n|\r|\t)/g, "")
                    var detail = value.detail

                    var price = value.price.replace('THB', '').replace( /\s/g, '')
                    if (!price) {
                        price = 0
                    }

                    var design = value.design
                    if (!design) {
                        design = null
                    }

                    var image = value.image

                    var allTag = (((value.tag1 +' '+ value.tag2.replace('last year’s price', "")).replace(/([0-9]|\n|\r|\t|\+|)/g, "")).replace(/\-/, "").replace(/\//g, '-')).split(' ')
                    var rmTag = ['of', 'and', 'with', 'for', 'unit', 'w', 'f', "+", "-"]
                    function tagRemove(arr, word) {
                        var found = arr.indexOf(word)

                        while (found !== -1) {
                            arr.splice(found, 1)
                            found = arr.indexOf(word)
                        }
                    }
                    for (var i = rmTag.length; i>0; i--) {
                        tagRemove(allTag, rmTag[i])
                    }
                    allTag = allTag.filter(Boolean)

                    var metric = [value.metric1, value.metric2, value.metric3]


                    var data = {'article':article, 'name':name, 'detail':detail, 'price':price, 'design':design, 'image':image, 'tag':allTag, 'metric':metric}

                    // console.log(data)
                    firebase.database().ref('products/').push(data)
                })
            } else {
                console.log('[SKIP] products is up to date. Last Article: ' + check + '.')
            }
        })



        


    },
    data() {
        return {
            jsonData: jsonFile,
        }
    }
}
</script>

<style>

</style>
