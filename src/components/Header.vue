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
                    <li class="col col-sm-4 dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-ellipsis-h" aria-hidden="true" style="cursor:pointer"></i></a>
                        <ul class="dropdown-menu">
                            <li>
                                <router-link :to="{ name:'Login' }" id="login"><i class="fa fa-sign-in" aria-hidden="true" title="Sign In"></i> <span>Sign In</span></router-link>
                            </li>
                            <li>
                                <router-link :to="{ name:'Register'}" id="register"><i class="fa fa-user-plus" aria-hidden="true" title="Sign Up"></i> <span>Sign Up</span></router-link>
                            </li>
                        </ul>
                    </li>

                    <li class="col col-sm-4">
                        <a href="#">Test</a>
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
                    <li class="col col-xs-3">
                        <router-link :to="{ name:'Login' }" id="login"><i class="fa fa-sign-in" aria-hidden="true" title="Sign In"></i> <span>Sign In</span></router-link>
                    </li>
                    <li class="col col-xs-3">
                        <router-link :to="{ name:'Register'}" id="register"><i class="fa fa-user-plus" aria-hidden="true" title="Sign Up"></i> <span>Sign Up</span></router-link>
                    </li>
                    <li class="col col-xs-3">
                        <router-link :to="{ name: 'Home' }" id="home"><i class="fa fa-home" aria-hidden="true" title="Home"></i> <span>Home</span></router-link>
                    </li>
                    <li class="col col-xs-3">
                        <a class="navbar-brand">Smart</a>
                    </li>       
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            navActive: 'home'
        }
    },
    beforeRouteUpdate(to, from, next) { // Navbar active animation
        var navCurrent = $('#' + from.path.split('/')[1].toLowerCase())
        var navNext = $('#' + to.path.split('/')[1].toLowerCase())
        navCurrent.parent().removeClass('active')
        navNext.parent().addClass('active')
        next()
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


.navbar-right > li {
    float: right;
    white-space:nowrap;
}
    .navbar-right > li > a {
        padding-top: 10px;
        height: 40px;
        border-radius: 30px;
    }
    .navbar-right > li > a:not(.navbar-brand):active {
        box-shadow: 0 0 0 2px #000;
    }
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
