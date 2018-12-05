import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
    constructor(itemsToReveal, offset) {
        this.itemsToReveal = itemsToReveal;
        this.offsetPercentage = offset;
        this.hideInitially();
        this.createWayPoints();
    }

    hideInitially() {
        this.itemsToReveal.addClass('reveal-item');
    }

    createWayPoints(){
        const that = this;
        this.itemsToReveal.each(function(){
            const currentItem =  this;
            
            new Waypoint({
                element: currentItem,
                handler: function(){
                    $(currentItem).addClass('reveal-item--is-visible');
                },
                offset: that.offsetPercentage
            });
        });
    }
}

export default RevealOnScroll;