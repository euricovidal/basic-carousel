/*
 * File: jquery.basic-carousel.js
 * Version: 0.0.1
 * Description: Basic carousel for lists (<ul><ol>)
 * Author: Eurico Vidal
 * Copyright 2014, iVidal Solucoes Digitais
 * http://www.ividal.net
 */
(function ($) {
  $.fn.basicCarousel = function(options) {
    var defaults = $.extend({
      visibleItems   : 1,
      animationSpeed : 2000,
      autoPlay       : false,
      autoPlaySpeed  : 3000,
      pauseOnHover   : true,
      marginOfItem   : 0,
      textPrev       : '<',
      textNext       : '>',
      showArrows     : true,
      height         : 0 // if css height is less than 50px I go change it to 50px
    }, options);

    /******************************
      Private Variables
    *******************************/
    var settings     = $.extend(defaults, options);
    var object       = $(this);
    var child        = object.children().first();
    var itemsWidth   = child.children().first().width() + 0.5; // need width + 1, to not shows the last pixel the item
    var stepLength   = itemsWidth + settings.marginOfItem;
    var totalItems   = child.children().length;
    var itemLength   = stepLength / settings.visibleItems;
    var page         = 1;
    var lastItems    = totalItems - settings.visibleItems;
    var maxLength    = lastItems * itemLength;
    var itemsBox;
    var list;
    var carouselTimer;

    /******************************
      Public Methods
    *******************************/
    var methods = {
      init : function() {
        return this.each(function() {
          methods.initializeItems();
          methods.appendHTML();
          methods.setEventHandlers();
        });
      },

      /******************************
        Initialize Items
        Default settings that I need
      *******************************/
      initializeItems : function() {
        object.append('<div class="basic-carousel-box"></div>');
        itemsBox = object.find('.basic-carousel-box');

        itemsBox.append(child);
        list = itemsBox.children().first();

        itemsBox.css({overflow : 'hidden', position : 'relative'});
        list.css({position : 'absolute', display: 'table'});
        list.children().css('float', 'left');
        if ( list.width() < 9000 ) list.css('width', '9999px');
        if ( settings.height > 0 ) itemsBox.css('height', settings.height);
        else if ( object.height() > 50 ) itemsBox.css('height', object.height());
        else if ( object.height() < 50 ) itemsBox.css('height', 50);

        methods.toogleArrows();
        object.fadeIn();
      },

      /******************************
        Toogle Arrows
        To disable or not an arrow
      *******************************/
      toogleArrows : function() {
        if ( settings.showArrows == false ) return;
        leftArrow  = object.find('.carousel-button-prev');
        rightArrow = object.find('.carousel-button-next');

        if ( page == 1 ) leftArrow.addClass('disabled');
        else             leftArrow.removeClass('disabled');

        if ( page >= totalItems ) rightArrow.addClass('disabled');
        else                      rightArrow.removeClass('disabled');
      },

      /******************************
        Append HTML
        Set object class and add arrows (prev and next)
      *******************************/
      appendHTML : function() {
        object.addClass('basic-carousel');
        if ( settings.showArrows == true ) {
          object.prepend('<a href="#" class="carousel-button carousel-button-prev">' + settings.textPrev + '</a>');
          object.append('<a href="#" class="carousel-button carousel-button-next">' + settings.textNext + '</a>');
        }
      },

      /******************************
        Set Click Event
      *******************************/
      setEventHandlers : function() {
        object.find('.carousel-button-prev').not('.disabled').on('click', function(event) {
          event.preventDefault();
          methods.scrollLeft();
        });
        object.find('.carousel-button-next').not('.disabled').on('click', function(event) {
          event.preventDefault();
          methods.scrollRight();
        });

        if (settings.autoPlay == true && settings.pauseOnHover == true) {
          itemsBox.on({
            mouseenter : function() { clearInterval(carouselTimer); },
            mouseleave : function() { methods.play(); }
          });
        }

        if ( settings.autoPlay == true ) methods.play();
      },

      /******************************
        Scroll Left
      *******************************/
      scrollLeft : function() {
        page = page - 2
        methods.carousel();
      },

      /******************************
        Scroll Right
      *******************************/
      scrollRight : function() {
        methods.carousel();
      },

      /******************************
        Play Carousel
      *******************************/
      play : function() {
        if ( settings.autoPlay == true ) {
          clearInterval(carouselTimer);
          carouselTimer = setInterval(function(){ methods.carousel() }, settings.autoPlaySpeed);
        } else {
          methods.carousel();
        }
      },

      /*****************************
        Start Carousel
      ******************************/
      carousel : function() {
        if ( page < 0 ) page = 0;

        nextPage = stepLength * page;

        if ( nextPage > maxLength ) {
          nextPage = maxLength;
          page = -1;
        }

        if ( page == 0 ) nextPage = nextPage + settings.marginOfItem;

        list.animate( { left : nextPage * -1 }, settings.animationSpeed );
        page++;
        methods.toogleArrows();
      }
    };

    if (methods[options]) {
      return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof options === 'object' || !options) {
      return methods.init.apply(this);
    } else {
      $.error('Method "' + method + '" does not exist in basic-carousel plugin!');
    }
  };
})(jQuery);
