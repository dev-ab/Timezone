<!DOCTYPE html>
<!--[if IE 8]>
<html class="ie ie8">
<![endif]-->
<!--[if IE 9]>
<html class="ie ie9">
<![endif]-->
<html ng-app="MyApp">
    <head>
        <!-- Basic -->
        <meta charset="utf-8">
        <title>Monitor - @yield('title')</title>
        <meta name="keywords" content="HTML5 Template" />
        <meta name="description" content="Porto - Responsive HTML5 Template">
        <meta name="author" content="Crivos.com">
        <meta name="csrf-token" content="{{ csrf_token()}}">

        <!-- Mobile Metas -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Web Fonts  -->
        <!--<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800|Shadows+Into+Light" rel="stylesheet" type="text/css">-->

        <!-- Libs CSS -->
        <link rel="stylesheet" href="{{url('/')}}/css/bootstrap.css">
        <link rel="stylesheet" href="{{url('/')}}/css/fonts/font-awesome/css/font-awesome.css">
        <link rel="stylesheet" href="{{url('/')}}/vendor/flexslider/flexslider.css" media="screen" />
        <link rel="stylesheet" href="{{url('/')}}/vendor/fancybox/jquery.fancybox.css" media="screen" />

        <!-- Theme CSS -->
        <link rel="stylesheet" href="{{url('/')}}/css/theme.css">
        <link rel="stylesheet" href="{{url('/')}}/css/theme-elements.css">

        <!-- Custom CSS -->
        <link rel="stylesheet" href="{{url('/')}}/css/custom.css">

        <!-- Skin -->
        <link rel="stylesheet" href="{{url('/')}}/css/skins/blue.css">

        <!-- Responsive CSS -->
        <link rel="stylesheet" href="{{url('/')}}/css/bootstrap-responsive.css" />
        <link rel="stylesheet" href="{{url('/')}}/css/theme-responsive.css" />

        <!-- Favicons -->
        <link rel="shortcut icon" href="{{url('/')}}/img/favicon.ico">
        <link rel="apple-touch-icon" href="{{url('/')}}/img/apple-touch-icon.png">
        <link rel="apple-touch-icon" sizes="72x72" href="{{url('/')}}/img/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="114x114" href="{{url('/')}}/img/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="144x144" href="{{url('/')}}/img/apple-touch-icon-144x144.png">

        <!-- Head Libs -->
        <script src="{{url('/')}}/vendor/modernizr.js"></script>

        <!--[if IE]>
                <link rel="stylesheet" href="{{url('/')}}/css/ie.css">
        <![endif]-->

        <!--[if lte IE 8]>
                <script src="{{url('/')}}/vendor/respond.js"></script>
        <![endif]-->

        <!-- Facebook OpenGraph Tags - Go to http://developers.facebook.com/ for more information.
        <meta property="og:title" content="Porto Website Template."/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="http://www.crivos.com/themes/porto"/>
        <meta property="og:image" content="http://www.crivos.com/themes/porto/"/>
        <meta property="og:site_name" content="Porto"/>
        <meta property="fb:app_id" content=""/>
        <meta property="og:description" content="Porto - Responsive HTML5 Template"/>
        -->
        <style>
            .widget-clock.blue-light .digital {
                text-align: center;
            }
            .widget-clock.blue-light .time {
                font-family: 'Rationale', sans-serif;
                font-size: 1.0em;
                color: #1da4eb;
            }
        </style>
    </head>
    <body ng-controller='HomeController'>

        <div class="body">
            <header ng-include="'partials/header.html'">

            </header>
            <div ng-view="">
                @yield('content')
            </div>
            <footer>
                @include('footer')
            </footer>
        </div>

        <!-- Libs -->
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="{{url(' / ')}}/vendor/jquery.js"><\/script>')</script>
        <script src="{{url('/')}}/vendor/jquery.easing.js"></script>
        <script src="{{url('/')}}/vendor/jquery.cookie.js"></script>
        <!-- <script src="master/style-switcher/style.switcher.js"></script> -->
        <script src="{{url('/')}}/vendor/bootstrap.js"></script>
        <script src="{{url('/')}}/vendor/selectnav.js"></script>
        <script src="{{url('/')}}/vendor/twitterjs/twitter.js"></script>
        <script src="{{url('/')}}/vendor/flexslider/jquery.flexslider.js"></script>
        <script src="{{url('/')}}/vendor/jflickrfeed/jflickrfeed.js"></script>
        <script src="{{url('/')}}/vendor/fancybox/jquery.fancybox.js"></script>
        <script src="{{url('/')}}/vendor/jquery.validate.js"></script>

        <script src="{{url('/')}}/js/plugins.js"></script>

        <!-- Page Scripts -->

        <!-- Theme Initializer -->
        <script src="{{url('/')}}/js/theme.js"></script>

        <!-- Custom JS -->
        <script src="{{url('/')}}/js/custom.js"></script>

        <script src="{{url('/')}}/scripts/angular.min.js"></script>
        <script src="{{url('/')}}/scripts/angular-route.min.js"></script>
        <script src="{{url('/')}}/scripts/ui-bootstrap-tpls.min.js"></script>
        <script src="{{url('/')}}/lib/ngStorage.js"></script>
        <script src="{{url('/')}}/lib/loading-bar.js"></script>
        <script src="{{url('/')}}/lib/angular-clock.js"></script>
        <script src="{{url('/')}}/scripts/app.js"></script>
        <script src="{{url('/')}}/scripts/routes.js"></script>
        @yield('controller')

        <!-- Google Analytics: Change UA-XXXXX-X to be your site's ID. Go to http://www.google.com/analytics/ for more information. -->
        <!--
        <script>
                var _gaq = _gaq || [];
                _gaq.push(['_setAccount', 'UA-XXXXX-X']);
                _gaq.push(['_trackPageview']);

                (function() {
                        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
                        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
                        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
                })();
        </script>
        -->
    </body>
</html>
