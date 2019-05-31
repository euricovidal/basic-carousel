basic-carousel
==============

BasicCarousel for jQuery

* [Basic Example](#basic-example)
* [Show four items](#show-four-items)

*coming soon more examples*

##Options

Below you can see the options that can use


| Option          | Value   | Default Value | Description                                               | Example               |
|-----------------|---------|---------------|-----------------------------------------------------------|-----------------------|
| visible_items   | Integer | 1             | set a number of the visible items that you want show      | visible_items: 2      |
| animation_speed | Integer | 2000          | set the milliseconds to speed of animation                | animation_speed: 500  |
| auto_play       | Boolean | false         | set true if you want that start on load                   | auto_play: true       |
| auto_play_speed | Integer | 3000          | set the milliseconds to speed of auto play                | auto_play_speed: 1000 |
| pause_on_hover  | Boolean | true          | set false if you not want to stop when the mouse is over  | pause_on_hover: false |
| margin_of_item  | Integer | 0             | pixels of the margin of item if exists the margin         | margin_of_item: 10    |
| text_prev       | String  | <             | text to the previous button (you can set null to nothing) | text_prev: '< Prev'   |
| text_pext       | String  | >             | text to the next button (you can set null to nothing)     | text_next: 'Next >'   |
| show_arrows     | Boolean | true          | set false to not show the arrows                          | show_arrows: false    |
| show_numbers    | Boolean | false         | set true to show the page numbers                         | show_numbers: true    |
| height          | Integer | 0             | to force the div height (if you need)                     | height: 150           |


## Examples

### Basic Example
[Basic Example page](http://euricovidal.github.io/basic-carousel/examples/basic)
![When set nothing](https://raw.github.com/euricovidal/basic-carousel/master/images_readme/basic-example.png)

### Show four items
[Showing four items with auto play](http://euricovidal.github.io/basic-carousel/examples/four-visible-items-auto)
![When set visibleItems:4 and autoPlay:true](https://raw.github.com/euricovidal/basic-carousel/master/images_readme/four-example.png)
