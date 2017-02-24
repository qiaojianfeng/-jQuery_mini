/**
 * Created by QIAO on 2017/2/21.
 */
(function( window ) {
    var arr = [],
        push = arr.push;

    //事件通用方法
    IGeek.fn.extend({
        on : function ( type, callback ) {
            return this.each( function () {
                this.addEventListener( type, callback );
            })
        },
        off: function ( type, callback ) {
            return this.each(function () {
                this.removeEventListener( type, callback );
            });
        }

    })





    //其他事件的快速添加方法
    IGeek.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error contextmenu").split(" "),function ( i, v ) {
      IGeek.fn[ v ] = function ( callback ) {
         return  this.on( v, callback );
      }

    });




})( window );