/**
 * Created by jordscream on 22/05/2017.
 */

var articles = [];

function strip(html)
{
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

$( document ).ready(function() {

    $.get("https://www.googleapis.com/blogger/v3/blogs/667964052856651358/posts?key=AIzaSyD_N_rt1d9Y5hvQjbTYaa2MZ6nK7NkEOrA", function (data) {

console.log(data);
        for (var i = 0; i < data.items.length; i++) {

            var content = data.items[i].content;

            var images = [];
            var contents = [];
            $('img', content).each(function(){
                images.push($(this).attr('src'));
            });

            var splits = content.split('---');

            for (var j = 0; j < splits.length; j++) {
//                splits[j] = splits[j].replace('<br />', '\n');
                contents.push(strip(splits[j]));
            }


            var article = [];
            article['images']   = images;
            article['contents'] = contents;
            article['title']    = data.items[i].title;

            article['summary']  = '';

            article['location'] = 'SomeWhere in the Ground';
            if (data.items[i].location != undefined) {
                article['location'] = data.items[i].location.name;
            }

            articles.push(article);
        }

        console.log(articles);
        var fb_view = '';
        for (var i = 0; i < articles.length; i++) {

            var item = document.createElement('div');

            salvattore.appendElements(document.querySelector('#fh5co-board'), [item]);

            var big = articles[i]['images'][0].replace(/s320/i, "s1600");
            var primary = '<div class="item" style="padding: 18px">'+
                '<div class="animate-box">'+
                '<a href="'+big+'" class="image-popup fh5co-board-img" title="" data-fancybox="gallery_'+i+'" rel="test" data-caption="'+articles[i]['title']+'<br/><br/><span>'+ articles[i]['contents'][0].trim().replace(/(?:\r\n|\r|\n)/g, '<br />') +'</span>"><img src="'+articles[i]['images'][0]+'" alt=""></a>'+
                '</div>'+
                '<div class="fh5co-item-title">'+articles[i]['title']+'</div>';

            var secondary = '';
            for (var j = 1; j < articles[i]['images'].length; j++) {
                var big = articles[i]['images'][j].replace(/s320/i, "s1600");
                secondary += '<div style="display: none" href="'+big+'" class="lightbox" title="" data-fancybox="gallery_'+i+'" data-caption="'+articles[i]['title']+'<br/><br/><span>'+ articles[i]['contents'][j].trim().replace(/(?:\r\n|\r|\n)/g, '<br />') +'</span>"></div>';
            }

            item.outerHTML = primary;
            $('.lightboxcontent').append(secondary);
        }

        console.log($('#fh5co-board').html());

        $('[data-fancybox]').fancybox({

            baseClass : 'fancybox-custom-layout',
            margin    : 0,
            infobar   : true,
            buttons: true,
            closeBtn   : true,
            thumbs    : {
                hideOnClosing : false,
                showOnStart: false
            },
            touch : {
                vertical : 'auto'
            },
            closeClickOutside : false,

        });


        ;(function () {

            'use strict';

            // iPad and iPod detection
            var isiPad = function(){
                return (navigator.platform.indexOf("iPad") != -1);
            };

            var isiPhone = function(){
                return (
                    (navigator.platform.indexOf("iPhone") != -1) ||
                    (navigator.platform.indexOf("iPod") != -1)
                );
            };

            // OffCanvass
            var offCanvass = function() {
                $('body').on('click', '.js-fh5co-menu-btn, .js-fh5co-offcanvass-close', function(){
                    $('#fh5co-offcanvass').toggleClass('fh5co-awake');
                });
            };

            // Click outside of offcanvass
            var mobileMenuOutsideClick = function() {
                $(document).click(function (e) {
                    var container = $("#fh5co-offcanvass, .js-fh5co-menu-btn");
                    if (!container.is(e.target) && container.has(e.target).length === 0) {
                        if ( $('#fh5co-offcanvass').hasClass('fh5co-awake') ) {
                            $('#fh5co-offcanvass').removeClass('fh5co-awake');
                        }
                    }
                });

                $(window).scroll(function(){
                    if ( $(window).scrollTop() > 500 ) {
                        if ( $('#fh5co-offcanvass').hasClass('fh5co-awake') ) {
                            $('#fh5co-offcanvass').removeClass('fh5co-awake');
                        }
                    }
                });
            };

            // Magnific Popup

            var magnifPopup = function() {
                $('.image-popup').magnificPopup({
                    type: 'image',
                    removalDelay: 300,
                    mainClass: 'mfp-with-zoom',
                    titleSrc: 'title',
                    gallery:{
                        enabled:true
                    },
                    zoom: {
                        enabled: true, // By default it's false, so don't forget to enable it

                        duration: 300, // duration of the effect, in milliseconds
                        easing: 'ease-in-out', // CSS transition easing function

                        // The "opener" function should return the element from which popup will be zoomed in
                        // and to which popup will be scaled down
                        // By defailt it looks for an image tag:
                        opener: function(openerElement) {
                            // openerElement is the element on which popup was initialized, in this case its <a> tag
                            // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                            return openerElement.is('img') ? openerElement : openerElement.find('img');
                        }
                    }
                });
            };



            var animateBoxWayPoint = function() {

                if ($('.animate-box').length > 0) {
                    $('.animate-box').waypoint( function( direction ) {

                        if( direction === 'down' && !$(this).hasClass('animated') ) {
                            $(this.element).addClass('bounceIn animated');
                        }

                    } , { offset: '75%' } );
                }

            };




            $(function(){
               // magnifPopup();
                offCanvass();
                mobileMenuOutsideClick();
                animateBoxWayPoint();
            });


        }());


    });
});
