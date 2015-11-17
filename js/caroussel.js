var transformProp = Modernizr.prefixed('transform');
var numberOfElements = 12;

function Carousel3D(el){
    this.element = el;
    this.rotation = 0;
    this.panelCount = 0;
    this.totalPanelCount = this.element.children.length;
    this.theta = 0;
    this.isHorizontal = true;
}


Carousel3D.prototype.modify = function(){
    var panel;
    var angle;
    var i;

    this.panelSize = this.element[ this.isHorizontal ? 'offsetWidth' : 'offsetHeight' ];
    this.rotateFn = this.isHorizontal ? 'rotateY' : 'rotateX';
    this.theta = 360 / this.panelCount;
    this.radius = Math.round( ( this.panelSize / 2) / Math.tan( Math.PI / this.panelCount ) );

    for (i = 0; i < this.panelCount; i++){
        panel = this.element.children[i];
        angle = this.theta * i;
        panel.style.opacity = 1;
        panel.style[ transformProp ] = this.rotateFn + '(' + angle + 'deg) translateZ(' + this.radius + 'px)';
    }

    // hide other panels
    for (  ; i < this.totalPanelCount; i++ ) {
        panel = this.element.children[i];
        panel.style.opacity = 0;
        panel.style[ transformProp ] = 'none';
    }

    // adjust rotation so panels are always flat
    this.rotation = Math.round( this.rotation / this.theta ) * this.theta;
    this.transform();
};


Carousel3D.prototype.transform = function() {
    this.element.style[ transformProp ] = 'translateZ(-' + this.radius + 'px) ' + this.rotateFn + '(' + this.rotation + 'deg)';
};


var init = function init(){
    var carousel = new Carousel3D(document.getElementById('carousel'));
    var navButtons = document.querySelectorAll('.navigation button');
    var onNavButtonClick = function(event){
        var increment = parseInt( event.target.getAttribute('data-increment') );
        carousel.rotation += carousel.theta * increment * -1;
        carousel.transform();
    };

    // populate on startup
    carousel.panelCount = numberOfElements;
    carousel.modify();

    for (var i=0; i < 2; i++) {
        navButtons[i].addEventListener( 'click', onNavButtonClick, false);
    }

    setTimeout( function(){
        document.body.className = document.body.className + ' ready';
    }, 0);
};


window.addEventListener( 'DOMContentLoaded', init, false);