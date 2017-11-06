<template>
    <div>
        <nav class="pc navbar navbar-default navbar-fixed-top">
            <div class="container-fluid row">
                <div class="navbar-header col col-xs-1 ">
                    <router-link :to="{ name: 'Home'}" id="home" class="navbar-brand">Smart</router-link>
                    <!-- <a class="navbar-brand">Smart</a> -->
                </div>
                <div class="search navbar-left col col-xs-8 inner-addon left-addon">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input type="text" placeholder="Search"  @keyup="keyPress">
                </div>
                <ul class="nav navbar-nav navbar-right col col-xs-3 row">

                    <li class="col col-xs-3 dropdown" style="cursor:pointer">
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
                        <li class="col col-xs-3 profile-img" v-if="auth">
                            <router-link :to="{ name: 'Home' }" id="home"><img :src="auth.photoURL"></router-link>
                        </li>
                    </transition>
                    <li class="col col-xs-3 ">
                        <router-link :to="{ name: 'Cart' }" id="cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i> <span>Cart</span></router-link>
                    </li>
                    <li class="col col-xs-3">
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
                    <li class="col col-xs-3">
                        <router-link :to="{ name: 'Cart' }" id="cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i></router-link>
                    </li>
                    <transition name="profile-fade">
                        <li class="col col-xs-3 profile-img" v-if="auth">
                            <router-link :to="{ name: 'Home' }" id="home"><img :src="auth.photoURL"></router-link>
                        </li>
                    </transition>
                    <li class="col col-xs-3">
                        <router-link :to="{ name: 'Home'}" id="home" class="navbar-brand">Smart</router-link>
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

        <div v-for="search in searchList">{{search}}</div>
    </div>
</template>

<script>
import firebase from 'firebase'




export default {
    name: 'Header',
    // beforeRouteUpdate(to, from, next) { // Navbar active animation
    //     var navCurrent = $('#' + from.path.split('/')[1].toLowerCase())
    //     var navNext = $('#' + to.path.split('/')[1].toLowerCase())
    //     navCurrent.parent().removeClass('active')
    //     navNext.parent().addClass('active')
    //     next()
    // }
    created() {
        const this_ = this
        firebase.auth().onAuthStateChanged(user => {

            var searchInput = $('.search > input')
            var navBarTop = $('.navbar-right > li')
            if(user) {
                this.auth = user
                searchInput.prop('disabled', false);
                searchInput.removeClass('search-disable');

                // Add user to database
                const pushData = {
                    'uid': this.auth.uid,
                    'name': this.auth.displayName,
                    'email': this.auth.email,
                    'phone': this.auth.phoneNumber
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
                searchInput.prop('disabled', true);
                searchInput.addClass('search-disable');
            }

            //create tags list for search
            if (this.tags) {
                firebase.database().ref('products/').once('value').then( function(snapshot) {
                    for (var i in snapshot.val()) {
                        firebase.database().ref('products/').child(i).child('tag').once('value').then( function(snapshot) {
                            for (var x in snapshot.val()) {
                                this_.tags = this_.tags.concat(snapshot.val()[x].toLowerCase())
                            }
                        })
                        firebase.database().ref('products/').child(i).child('name').once('value').then( function(snapshot) {
                            this_.tags.push(snapshot.val().toLowerCase())
                            this_.tags = this_.tags.filter(function(elem, index, self) {
                                return index == self.indexOf(elem);
                            })
                        })
                    }
                })
            }


        });
    },
    data() {
        return {
            popupList: ['other'],
            displayName: null,
            photoURL: null,
            user: null,
            auth: false,
            tags: [],
            searchList: [],
        }
    },
    components: {
    },
    methods: {
        login() {
            const this_ = this
            if (!this.auth) {
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then( function() {
                    const provider = new firebase.auth.FacebookAuthProvider()
                    return firebase.auth().signInWithPopup(provider)
                }).catch(function(error) { console.log(error) })
            }
        },
        logout() {
            if (this.auth) {
                const this_ = this
                firebase.auth().signOut().then(function () {
                }).catch (function(error) { console.log(error) })
            }
        },
        keyPress() {
            const this_ = this
            var searchVal = $('.search input').val().toLowerCase()
            var searchAll = this.tags
            this_.searchList = []
            if (searchVal) {
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
    .navbar-right 
    .navbar-header {
        padding-left: 25px;
    }
    .navbar-brand {
        padding-top: 10px;
        width: 100%;
        height: 40px;
        border-radius: 30px;
        
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
        padding: 10px;
        padding-left: 50px;
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
.profile-fade-enter, .profile-fade-leave-to {
    transform: translateX(5px);
    opacity: 0;
}
</style>
