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
                    <li class="col col-sm-4 dropdown" style="cursor:pointer">
                        <a class="dropdown-toggle" data-toggle="dropdown" style="font-size: 22px;"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></a>
                        <ul class="dropdown-menu">
                            <li data-toggle="modal" data-target="#popup-login">
                                <a href="#" id="login"><i class="fa fa-sign-in" aria-hidden="true" title="Sign In"></i><span> Sign In</span></a>
                            </li>
                            <li data-toggle="modal" data-target="#popup-register">
                                <a href="#" id="register"><i class="fa fa-user-plus" aria-hidden="true" title="Sign Up"></i><span> Sign Up</span></a>
                            </li>
                        </ul>
                    </li>

                    <li class="col col-sm-4">
                        <router-link :to="{ name: 'Cart' }" id="cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i> <span>Cart</span></router-link>
                    </li>
                    <li class="col col-sm-4">
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
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
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
    data() {
        return {
            popupList: ['login', 'register', 'other']
        }

    },
    components: {
        'login' : Login,
        'register' : Register,
        'other' : Other
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
    .navbar-right > li > a:not(.navbar-brand):active {
        box-shadow: 0 0 0 2px #000;
    }
    .navbar-right > li:hover > a:not(.navbar-brand){
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
</style>
