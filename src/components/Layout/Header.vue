<template>
    <div>
        <nav class="pc navbar navbar-default navbar-fixed-top">
            <div class="container-fluid row">
                <div class="navbar-header col col-xs-1 ">
                    <router-link :to="{ name: 'Home'}" id="home" class="navbar-brand">
                        <!-- Smart -->
                    <img src="../../assets/icon.png" style="height: 43px;">
                    </router-link>
                    <!-- <a class="navbar-brand">Smart</a> -->
                </div>
                <div class="search navbar-left col col-xs-8 inner-addon left-addon">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input type="text" placeholder="Search" v-model="searchVal" @keyup="searchActive">
                    <div class="searchDrop" v-if="searchList.length > 0 && searchHide" @click="searchClose">
                        <div v-for="search in searchList" class="search-group">
                            <router-link :to="{ name: 'Search', params: {searchVal: search}}">
                                <div class="search-item">{{search}}</div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <ul class="nav navbar-nav navbar-right col col-xs-3 row">

                    <li class="col col-xs-4 dropdown" style="cursor:pointer">
                        <a class="dropdown-toggle" data-toggle="dropdown" style="font-size: 22px;"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
                        <ul class="dropdown-menu">
                            <li v-if="!auth">
                                <a href="#" id="login" @click="login()"><i class="fa fa-sign-in" aria-hidden="true" title="Sign In"></i><span> Sign In</span></a>
                            </li>
                            <li v-if="auth">
                                <a href="#" id="login" @click="logout()"><i class="fa fa-sign-in" aria-hidden="true" title="Sign In"></i><span> Sign Out</span></a>
                            </li>
                        </ul>
                    </li>
                    <transition name="profile-fade">
                        <li class="col col-xs-4 profile-img" v-if="auth">
                            <router-link :to="{ name: 'Home' }" id="home"><img :src="auth.photoURL"></router-link>
                        </li>
                    </transition>
                    <!-- <li class="col col-xs-3 ">
                        <router-link :to="{ name: 'Cart' }" id="cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i> <span>Cart</span></router-link>
                    </li> -->
                    <li class="col col-xs-4">
                        <router-link :to="{ name: 'Home' }" id="home"><i class="fa fa-home" aria-hidden="true" title="Home"></i> <span>Home</span></router-link>
                    </li>
                </ul>
            </div>
        </nav>
        
        <nav class="mobile navbar navbar-default navbar-fixed-bottom">
            <div class="container-fluid">
                <ul class="nav navbar-nav navbar-right row">     
                    <li class="col col-xs-3" data-toggle="modal" data-target="#popup-other">
                        <a href="#" id="other"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
                    </li>
                    <!-- <li class="col col-xs-3">
                        <router-link :to="{ name: 'Cart', params: product.article }" id="cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i></router-link>
                    </li> -->
                    <transition name="profile-fade">
                        <li class="col col-xs-3 profile-img" v-if="auth">
                            <router-link :to="{ name: 'Home' }" id="home"><img :src="auth.photoURL"></router-link>
                        </li>
                    </transition>
                    <li class="col col-xs-3">
                        <router-link :to="{ name: 'Home'}" id="home" class="navbar-brand">
                            <img src="../../assets/icon.png" style="height: 45px; margin-top: -12px;">
                        </router-link>
                    </li>       
                </ul>
            </div>
        </nav>

        <div class="modal fade" id="popup-other" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Menu</h4>
                    </div>
                    <div class="modal-body">
                        <div v-if="!auth">
                            <a href="#" id="login" @click="login()"><i class="fa fa-sign-in" aria-hidden="true" title="Sign In"></i><span> Sign In</span></a>
                        </div>
                        <div v-if="auth">
                            <a href="#" id="login" @click="logout()"><i class="fa fa-sign-in" aria-hidden="true" title="Sign In"></i><span> Sign Out</span></a>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <transition name="search-fade">
            <div class="body-fade" v-if="searchList.length > 0 && searchHide" @click="searchClose"></div>
        </transition>
    </div>
</template>

<script>
import firebase from 'firebase'



export default {
    name: 'Header',
    data() {
        return {
            popupList: ['other'],
            displayName: null,
            photoURL: null,
            user: null,
            searchVal: null,
            searchList: [],
            searchAll: [],
            searchHide: false,

            auth: null,
            products: null
            
        }
    },
    // beforeRouteUpdate(to, from, next) { // Navbar active animation
    //     var navCurrent = $('#' + from.path.split('/')[1].toLowerCase())
    //     var navNext = $('#' + to.path.split('/')[1].toLowerCase())
    //     navCurrent.parent().removeClass('active')
    //     navNext.parent().addClass('active')
    //     next()
    // }
    created() {
        // default this
        const this_ = this
        // Passdata to other component when login
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // return user
                this.auth = user
                // return product
                firebase.database().ref('products/').once('value').then( function(snapshot) {
                    this_.products = snapshot.val()
                    var products = snapshot.val()
                    var searchAll = []
                    // Create tags for search list
                    for (var i in products) {
                        searchAll = searchAll.concat(products[i].tag)
                        searchAll.push(products[i].name.toLowerCase())
                        searchAll = searchAll.filter(function(elem, index, self) {
                            return index == self.indexOf(elem);
                        })
                        this_.searchAll = searchAll
                    }
                })

                // Enable search input
                $('.search > input').prop('disabled', false);
                $('.search > input').removeClass('search-disable');




                // Create data from fb and push to firebase
                const pushData = {
                    'uid': this.auth.uid,
                    'name': this.auth.displayName,
                    'email': this.auth.email,
                    'phone': this.auth.phoneNumber,
                    "tags": {
                        'white': 1
                    }
                }
                firebase.database().ref('users/').orderByChild('uid').equalTo(this.auth.uid).once('value').then( function(snapshot) {
                    // Check is exist
                    if (!snapshot.val()) {
                        firebase.database().ref('users/').push(pushData)
                    }
                })




            } else {
                this.auth = false
                // disable search input
                $('.search > input').prop('disabled', true);
                $('.search > input').addClass('search-disable');
            }
        })
    },
    methods: {
        login() {
            if (!this.auth) {
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then( function() {
                    const provider = new firebase.auth.FacebookAuthProvider()
                    return firebase.auth().signInWithPopup(provider)
                }).catch(function(error) { console.log(error) })
            }
        },
        logout() {
            if (this.auth) {
                firebase.auth().signOut().then(function () {
                }).catch (function(error) { console.log(error) })
                this.auth = null
            }
        },
        searchClose() {
            const this_ = this
            this_.searchHide = false
            $('.search > input').val('')
        },
        searchActive() {
            if (this.auth) {
            const this_ = this
            var searchVal = this.searchVal
            const searchAll = this.searchAll
            this_.searchHide = true
            this_.searchList = []
                if (this.searchVal) {
                // Like
                    for (var i=0; i<searchAll.length; i++) {
                        if(searchAll[i].substring(0, searchVal.length) === searchVal) {
                            this_.searchList = this_.searchList.concat(searchAll[i].toLowerCase())
                        }
                    }
                    this_.searchList = this_.searchList.slice(0, 12)
                } else {
                    this_.searchList = []
                }
            }
        }
        
    }
}

</script>





<style>
/* .nav .col-xs-3, .nav .col-xs-4  {
    transition: all .5s
} */
.mobile {
    display: none;
}
.navbar, .navbar-brand, .search, .navbar-right > li, .navbar-right > li > a {
    margin: 0;
    padding: 0;
}

.navbar {
    padding-top: 10px;
}
.search, .navbar-header, .navbar-right > li {
    padding: 7px;
}

.dropdown-menu {
    padding-bottom: 0px;
    padding-top: 0px;
    box-shadow: none;
    border-bottom-left-radius: 30px;
}
    .dropdown-menu > li > a {
        padding: 10px 10px 10px 40px;
    }
        .dropdown-menu > li:last-child a{
            border-bottom-left-radius: 30px;
        }
        


.navbar-right > li {
    float: right;
    white-space:nowrap;
}
    .navbar-right > li > a {
        padding-top: 10px;
        height: 40px;
        border-radius: 30px;
        transition: background .5s;
    }
    .navbar-right .profile-img a{
        padding: 0;
    }
        .navbar-right .profile-img img {
            border-radius: 50%;
            width: 37px;
            height: 37px;
            margin-top: 2px;
        }
    .navbar-right > li:not(.profile-img) > a:not(.navbar-brand):active {
        box-shadow: 0 0 0 2px #000;
    }
    .navbar-right > li:not(.profile-img):hover > a:not(.navbar-brand){
        background-color: #e8e8e8;
    }
    .navbar-header {
        padding-left: 25px;
    }


.search {
    padding-left: 0;
    padding-right: 0;
}
.search > input{
    transition: 0.8s;
}
    .search-disable {
        opacity: .3;
    }
    .search input{
        height: 40px;
        width: 100%;
        border: none;
        border-radius: 5px;
        background: #ccc;
        outline: none;
        font-weight: bold;
        font-size: 20px;
    }
    
    .inner-addon { 
        position: relative; 
        font-size: 20px;
        font-weight: bold;
    }

    /* style glyph */
    .inner-addon .fa {
    position: absolute;
    padding: 10px;
    pointer-events: none;
    }
    .left-addon .fa  { left:  5px;}
    .left-addon input  { padding-left:  40px; }

.modal-dialog {
  margin-top: 0;
  margin-bottom: 0;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media (max-width: 768px) {
    .modal-dialog {
        padding: 15%;
    }
}

.modal.fade .modal-dialog {
  transform: translate(0, -100%);
}

.modal.in .modal-dialog {
  transform: translate(0, 0);
}


.searchDrop {
    position: absolute;
    padding: 10px 0;
    background-color: #f8f8f8;
    border-radius: 5px;
    width: 100%;
    text-align: left;
}
    .search-group a {
        text-decoration: none;
        color: #777;
    }
    .search-item {
        padding: 0 10px 10px 10px;
    }
        .search-item:hover {
            background: #ccc;
            text-decoration: none;
        }
    .body-fade {
    position: fixed;
    top:0; bottom:0;
    left:0; right:0;
    background: #000;
    opacity: .5;
    z-index: 1;
    }
    @media (max-width: 767px) {
        .searchDrop {
            width: 90%;
        }
    }
    



@media (max-width: 992px) {
    .navbar-right > li > a > span{
        display: none;
    }
    .navbar-right > li > a > i{
        padding: 0 10px 0 10px;
        font-size: 22px;
    }
    .navbar-right > li {
        padding-right: 5px;
        padding-left: 5px;
    }
}
@media (max-width: 767px) {
    .mobile {
        opacity: 1;
        display: block;
    }
    .pc .navbar-header, .pc .navbar-right {
        display: none;
    }
    .search {
        padding: 10px 20px 10px 20px;
        width: 100%;
    }
    .left-addon .fa  { left: 20px;}
}








/* Vue */
.profile-fade-enter-active, .profile-fade-leave-active {
    transition: all 1s;
}
.profile-fade-enter, .profile-fade-leave-to{
    transform: translateX(5px);
    opacity: 0;
}
.search-fade-enter-active, .search-fade-leave-active {
    transition: opacity 0.3s;
}
.search-fade-enter, .search-fade-leave-to {
    opacity: 0;
}

</style>
