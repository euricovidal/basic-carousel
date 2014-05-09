/*
 * File: jquery.basic-carousel.js
 * Version: 0.0.3
 * Created At: 2014-02-12
 * Updated At: 2014-04-02
 * Description: Basic carousel for lists (<ul><ol>)
 * Author: Eurico Vidal
 * Copyright 2014, iVidal Solucoes Digitais
 * http://www.ividal.net
 *
 * option step by page or item
 */
(function ($) {
  $.fn.basicCarousel = function(options) {
    var defaults = $.extend({
      visible_items   : 1,
      animation_speed : 2000,
      auto_play       : false,
      auto_play_speed : 3000,
      pause_on_hover  : true,
      margin_of_item  : 0,
      text_prev       : '<',
      text_next       : '>',
      show_arrows     : true,
      show_numbers    : false,
      height          : 0 // if css height is less than 50px i go change it to 50px
    }, options);

    /******************************
      Private Variables
    *******************************/
    var settings = $.extend(defaults, options);
    var object   = $(this);
    var page     = 1;
    var prefixDataAttribute = 'data-basic-carousel-';
    var itemsGroup;
    var itemsWidth;
    var stepLength;
    var totalItems;
    var lastItems;
    var maxLength;
    var nextPage;
    var itemsBox;
    var marginOfItem;
    var visibleItems;
    var list;
    var carouselTimer;

    /******************************
      Public Methods
    *******************************/
    var methods = {
      init : function() {
        return this.each(function() {
          methods.setAttributesOnObject();
          methods.HTMLChanges();
          methods.initialize();
          methods.setNumbers(0);
          methods.setEvents();
          methods.toogleArrows(0);
          methods.toogleNumbers(1);
          object.fadeIn();
        });
      },

      /******************************
        Set Attributes on object
      *******************************/
      setAttributesOnObject : function(x) {
        $.map(settings, function(value, key) {
          keyName = prefixDataAttribute + '' + key;
          if ( object.attr(keyName) == undefined ) {
            object.attr(keyName, value);
          }
          else {
            attribute = object.attr(keyName);
            attr_type = typeof(value);
            if      ( attr_type == 'boolean') attribute = Boolean(eval(attribute));
            else if ( attr_type == 'integer') attribute = attribute * 1;
            settings[key] = attribute;
          }
        });
      },

      /******************************
        Find List
      *******************************/
      findList : function() {
        itemsBox = object.find('.basic-carousel-box');
        list = itemsBox.children().first();
      },

      /******************************
        HTML Changes
        Set object class and add arrows (prev and next)
      *******************************/
      HTMLChanges : function() {
        itemsGroup = object.children().first();

        object.addClass('basic-carousel');
        object.css('position', 'relative');
        object.append('<div class="basic-carousel-box"></div>');

        itemsBox = object.find('.basic-carousel-box');
        itemsBox.append(itemsGroup);
        list = itemsBox.children().first();

        if ( settings.show_arrows == true ) {
          object.prepend('<a href="#" class="carousel-button carousel-button-prev">' + settings.text_prev + '</a>');
          object.append('<a href="#" class="carousel-button carousel-button-next">' + settings.text_next + '</a>');
        }

        if ( settings.show_numbers == true ) {
            object.append('<div class="carousel-navigation-numbers"></div>');
        }

        itemsBox.css({overflow : 'hidden', position : 'relative'});
        list.css({position : 'absolute', display: 'table'});
        list.children().css('float', 'left');

        if ( list.width() < 9000 ) {
          list.css('width', '9999px');
        }

        if ( settings.height > 0 ) {
          itemsBox.css('height', settings.height);
        } else if ( object.height() > 50 ) {
          itemsBox.css('height', object.height());
        } else if ( object.height() < 50 ) {
          itemsBox.css('height', 50);
        }
      },

      /******************************
        Initialize
        Default settings that I need
      *******************************/
      initialize: function() {
        marginOfItem = marginOfItem || settings.margin_of_item * 1;
        visibleItems = visibleItems || settings.visible_items * 1;
        methods.setAttributesOnObject('x');
        itemsGroup = object.find('.basic-carousel-box').children().first();
        itemWidth  = itemsGroup.children().first().width() + marginOfItem + 0.5; // should be set width (on example li) to work fine
        stepLength = itemWidth * visibleItems;
        totalItems = itemsGroup.children().length;
        lastItems  = totalItems - visibleItems;
        maxLength  = lastItems * itemWidth;
      },

      /******************************
        Set Number
        To set actual number of page (nice used for one item)
      *******************************/
      setNumbers : function(force_simule_page) {
        if ( settings.show_numbers == false ) return;
        navigation = object.find('.carousel-navigation-numbers');
        pages      = totalItems / visibleItems;

        if(pages >= 2) {
          html = '';
          for(my_page = 1; my_page <= pages; my_page++) {
            html += '<a href="#' + my_page + '" data-carousel-page="' + (my_page - 1) + '" class="carousel-navigation-number carousel-navigation-number-' + my_page + '">' + my_page + '</a>';
          }
          navigation.append(html);
        }

        if ( totalItems <= visibleItems )  {
          navigation.addClass('disabled');
          return;
        }
      },

      /******************************
        Toogle Numbers
        To disable or not numbers page
      *******************************/
      toogleNumbers : function(force_simule_page) {
        if ( settings.show_numbers == false ) return;
        navigation = object.find('.carousel-navigation-numbers');

        if ( totalItems <= visibleItems )  {
          navigation.addClass('disabled');
          return;
        }

        my_page = force_simule_page != undefined ? force_simule_page : (page + 1);

        navigation.find('.carousel-navigation-number').removeClass('active');
        navigation.find('.carousel-navigation-number-' + my_page).addClass('active');
      },

      /******************************
        Toogle Arrows
        To disable or not an arrow
      *******************************/
      toogleArrows : function(force_simule_page) {
        if ( settings.show_arrows == false ) return;
        leftArrow  = object.find('.carousel-button-prev');
        rightArrow = object.find('.carousel-button-next');

        if ( totalItems <= visibleItems )  {
          leftArrow.addClass('disabled');
          rightArrow.addClass('disabled');
          return;
        }

        if ( page == 0 || force_simule_page == 0) leftArrow.addClass('disabled');
        else                                      leftArrow.removeClass('disabled');

        if ( nextPage >= maxLength ) rightArrow.addClass('disabled');
        else                         rightArrow.removeClass('disabled');
      },

      /******************************
        Set Click Event and Mouse Event
      *******************************/
      setEvents : function() {
        left  = object.find('.carousel-button-prev');
        right = object.find('.carousel-button-next');
        navigation = object.find('.carousel-navigation-numbers');

        left.not('.disabled').on('click', function(event) {
          event.preventDefault();
          methods.scrollLeft();
        });
        right.not('.disabled').on('click', function(event) {
          event.preventDefault();
          methods.scrollRight();
        });

        navigation.not('.disabled').find('.carousel-navigation-number').on('click', function(event) {
          event.preventDefault();
          page     = $(this).attr('data-carousel-page') * 1;
          nextPage = page * stepLength;
          methods.goTo(nextPage);
        });

        if (settings.auto_play == true && settings.pause_on_hover == true) {
          itemsBox.on({
            mouseenter : function() { clearInterval(carouselTimer); },
            mouseleave : function() { methods.play(); }
          });
          left.on({
            mouseenter : function() { clearInterval(carouselTimer); },
            mouseleave : function() { methods.play(); }
          });
          right.on({
            mouseenter : function() { clearInterval(carouselTimer); },
            mouseleave : function() { methods.play(); }
          });
          navigation.on({
            mouseenter : function() { clearInterval(carouselTimer); },
            mouseleave : function() { methods.play(); }
          });
        }

        if ( settings.auto_play == true ) methods.play();
      },

      /******************************
        Scroll Left
      *******************************/
      scrollLeft : function() {
        if ( typeof(nextPage) == undefined ) {
          methods.initialize();
          methods.goTo((list.position().left + itemsWidth) * -1);
        } else {
          page = page - 2
          methods.carousel();
        }
      },

      /******************************
        Scroll Right
      *******************************/
      scrollRight : function() {
        if ( typeof(nextPage) == undefined ) {
          methods.initialize();
          methods.goTo((list.position().left - itemsWidth) * -1);
        } else methods.carousel();
      },

      /******************************
        Play Carousel
      *******************************/
      play : function() {
        if ( settings.auto_play == true && totalItems > visibleItems ) {
          clearInterval(carouselTimer);
          carouselTimer = setInterval(function(){ methods.carousel() }, settings.auto_play_speed);
        } else {
          methods.carousel();
        }
      },

      /******************************
        Go to page
      *******************************/
      goToPage : function(page) {
        if ( typeof(nextPage) == undefined ) methods.initialize();
        if ( page < 1 ) page = 1;
        page--;
        nextPage = page++;
        item = (page * stepLength) - visibleItems;
        methods.goTo(page * stepLength);
      },

      /******************************
        Go to item
      *******************************/
      goToItem : function(item) {
        if ( typeof(nextPage) == undefined ) methods.initialize();
        if ( item < 1 ) item = 1;
        item--;

        methods.goTo(item * itemWidth);
      },

      /******************************
        Go to position
      *******************************/
      goTo : function(position) {
        if ( totalItems <= visibleItems || position < 0 ) {
          position = 0;
          page     = 0;
        }
        else if ( position > maxLength ) {
          position = maxLength;
          page     = -1;
        }

        list.animate( { left : position * -1 }, settings.animation_speed );
        methods.toogleArrows();
        methods.toogleNumbers();
      },

      /*****************************
        Start Carousel
      ******************************/
      carousel : function() {
        nextPage = stepLength * page;
        methods.goTo(nextPage);
        if ( nextPage >= maxLength ) {
          nextPage = 0;
          page     = -1;
        }
        page++;
      }
    };

    if (methods[options]) {
      methods.findList();
      return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof options === 'object' || !options) {
      return methods.init.apply(this);
    } else {
      $.error('Method "' + method + '" does not exist in basic-carousel plugin!');
    }
  };
})(jQuery);
