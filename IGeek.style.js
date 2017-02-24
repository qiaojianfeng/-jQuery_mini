/**
 * Created by QIAO on 2017/2/22.
 */
( function ( window ) {
    //扩展样式操作方法
    IGeek.fn.extend({
        css: function ( key, value ) {

            if ( IGeek.isArrayLike( key ) ) {
                //数组忽略第二个参数
                var obj = {},
                    target = this[ 0 ];
                IGeek.each( key,function( i, v ) {
                    obj[ v ] = target.style[ v ] || window.getComputedStyle( target ) [ v ];
                });

                return obj;
            } else if ( Object.prototype.toString.call( key ) === '[object Object]') {
                return this.each(function() {
                    for ( var k in key ) {
                        this[ k ] = key [ k ];
                    }
                } );
            } else if ( typeof key === 'string' ) {
                if ( value === undefined ) {
                    return this[ 0].style[ key ] || window.getComputedStyle( this[ 0 ] )[ key ];
                } else if ( typeof value === 'string' ) {
                    // 遍历每个元素设置样式
                    return this.each( function () {
                        this.style[ key ] = value ;
                    });

                } else if ( typeof value === 'function' ) {
                    //判断为函数那么每个元素的样式有函数的返回值决定
                    return this.each( function ( i ) {
                        this.style[ key ] = value( i, this.style[ key ] || window.getComputedStyle( this )[ key ]);
                    })

                }

            }
        },

        //判断是否具有对应类名
        hasClass: function ( className ) {
            //判断this中所有DOM元素，只要有一个含该样式就返回true
            //使用正则剔除多余的空格
            className = className.trim().replace(/\s+/g, ' ');


            for( var i =0; i < this.length; i++ ) {
                var dom = this[ i],
                classNames = dom.className && dom.className.replace(/\s+/g, ' ').split(' ');

                if ( classNames && classNames.indexOf( className ) > -1) {
                    return true;//存在
                }
            }
            return false;

        },

        //添加类名
        addClass: function ( className ) {
            return this.each( function () {
               if ( this.className ) {
                   this.className += ' ' + className;
               } else {
                   this.className = className;
               }

            });

        },

        //移除类名
        removeClass: function ( className ) {
            //先处理出入类名字符串
            className = className.trim();
            return this.each(function () {
                //遍历this对象
                var classNames = this.className && this.className.replace(/\s+/g, ' ').split(' ');
                if ( !classNames ) return;

                //移除符合的字符串
                var index ;
                while( ( index = classNames.indexOf( className ) ) != -1) {
                    classNames.splice( index, 1 );
                }
                //classNames是数组
                this.className = classNames.join(' ');
            })

        },

        //切换类名
        toggleClass:function ( className ) {
            return this.each( function () {
                if( I( this).hasClass( className ) ) {
                    I( this).removeClass( className );
                } else {
                    I( this).addClass( className );
                }

            });

        }

    })



})( window );