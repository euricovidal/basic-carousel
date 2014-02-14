basic-carousel
==============

BasicCarousel for jQuery

* [Basic Example](#basic-example)
* [Show four items](#show-four-items)

##Options

Below you can see the options that can use


| Option         | Value   | Default Value | Description                                               | Example             |
|----------------|---------|---------------|-----------------------------------------------------------|---------------------|
| visibleItems   | Integer | 1             | set a number of the visible items that you want show      | visibleItems: 2     |
| animationSpeed | Integer | 2000          | set the milliseconds to speed of animation                | animationSpeed: 500 |
| autoPlay       | Boolean | false         | set true if you want that start on load                   | autoPlay: true      |
| autoPlaySpeed  | Integer | 3000          | set the milliseconds to speed of auto play                | autoPlaySpeed: 1000 |
| pauseOnHover   | Boolean | true          | set false if you not want to stop when the mouse is over  | pauseOnHover: false |
| marginOfItem   | Integer | 0             | pixels of the margin of item if exists the margin         | marginOfItem: 10    |
| textPrev       | String  | <             | text to the previous button (you can set null to nothing) | textPrev: '< Prev'  |
| textNext       | String  | >             | text to the next button (you can set null to nothing)     | textNext: 'Next >'  |
| showArrows     | Boolean | true          | set false to not show the arrows                          | showArrows: false   |
| height         | Integer | 0             | to force the div height (if you need)                     | height: 150         |


## Examples

### Basic Example
![When set nothing](https://raw.github.com/euricovidal/basic-carousel/master/images_readme/basic-example.png)

### Show four items
![When set visibleItems:4 and autoPlay:true](https://raw.github.com/euricovidal/basic-carousel/master/images_readme/four-example.png)
