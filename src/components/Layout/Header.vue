<template>
    <div>
        <nav class="pc navbar navbar-default navbar-fixed-top">
            <div class="container-fluid row">
                <div class="navbar-header col col-xs-1">
                    <a class="navbar-brand">Smart</a>
                </div>
                <div class="search navbar-left col col-xs-8 inner-addon left-addon">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input type="text" placeholder="Search">
                </div>
                <ul class="nav navbar-nav navbar-right col col-xs-3 row">

                    <li class="col col-sm-3 dropdown" style="cursor:pointer">
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
                        <li class="col col-sm-3 profile-img" v-if="auth">
                            <router-link :to="{ name: 'Home' }" id="home"><img :src="auth.photoURL"></router-link>
                        </li>
                     </transition>
                    <li class="col col-sm-3">
                        <router-link :to="{ name: 'Cart' }" id="cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i> <span>Cart</span></router-link>
                    </li>
                    <li class="col col-sm-3">
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
                    <li class="col col-xs-3">
                        <router-link :to="{ name: 'Home' }" id="home"><i class="fa fa-home" aria-hidden="true" title="Home"></i></router-link>
                    </li>
                    <li class="col col-xs-3">
                        <a class="navbar-brand">Smart</a>
                    </li>       
                </ul>
            </div>
        </nav>

        <!-- Load All Popup -->
        <div v-for="popup in popupList">
            <div :is="popup"> </div>
        </div>

    </div>
</template>

<script>
import firebase from 'firebase'
import Other from '@/components/Other'




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
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.auth = user
            } else {
                this.auth = false
                console.log('PLEASE LOGIN')
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
        }
    },
    components: {
        'other' : Other
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
            const this_ = this
            firebase.auth().signOut().then(function () {
                // location.reload()
            }).catch (function(error) { console.log(error) })
        }
    }
}

</script>





<style>
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


.search {
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
@media (max-width: 768px) {
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
.profile-fade-enter-active {
    transition: all 1s;
}
.profile-fade-leave-active {
    transition: all 1s;
}
.profile-fade-enter, .profile-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
    width: 30px;
    height: 30px;
    transform: translateX(5px);
    opacity: 0;
}
</style>
