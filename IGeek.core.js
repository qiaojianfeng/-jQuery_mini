/**
 * Created by QIAO on 2017/2/18.
 */

//整体使用沙盒模式隔离变量
( function ( window ) {
    //传入Window全局对象
    //定义需要初始化的变量,和需要多次调用的方法
    var arr = [],
        push = arr.push,
        slice = arr.slice;

    //使用工厂模式隐藏new关键字泄露
    function IGeek(selector) {
        return new IGeek.fn.init(selector);
    }

    //设置原型，核心成员方法
    IGeek.fn = IGeek.prototype = {
        constructor: IGeek,
        length: 0,
        init: function ( selector ) {
            //选择器的方法挂载到IGeek对象的原型上
            //判断选择器传入是否为0，'',null ,undefined，返回全局IGeek对象
            if ( !selector ) return this;

            //再判断传入字符串格式
            if ( typeof selector === 'string' ) {
                //判断出入为标签元素或其他
                if ( /^\s*</.test( selector ) ) {
                    //是标签格式字符串创建元素功能
                    push.apply( this, IGeek.parseHTML( selector ));
                } else {
                    //进入这里的是选择器
                    push.apply( this, IGeek.select( selector ));
                }
                return this;//返回继续连式编程

            }

            //判断传入是否为DOM元素
            if ( selector.nodeType ) {
                this[ 0 ] = selector;
                this.length = 1 ;
            }

            //判断传入为IGeek对象
            if ( IGeek.constructor == IGeek ) {
                push.apply( this, IGeek );
                return this;
            }

            //判断函数
            if ( typeof selector === "function" ){
                window.addEventListener( "load", selector );
            }

        }
    };

    //设置原型共享
    IGeek.fn.init.prototype = IGeek.fn;

    //添加扩展方法
    IGeek.extend = IGeek.fn.extend = function (obj) {
        //通过遍历对象copy继承扩展核对象的方法
        for (var k in obj) {
            this[k] = obj[k];
        }
        return this;
    };

    //添加需要扩展的工具方法
    IGeek.extend({
        //选择器
        select: function (selector) {
            return document.querySelectorAll(selector);
        },
        //判断数组
        isArrayLike: function (obj) {
            if (Object.prototype.toString.call(obj) == '[object Array]') {
                return true;
            }
            //判断传入是字符串或函数
            if ( typeof obj == 'string' || typeof  obj == 'function') {
                return false;
            }


            var length = 'length' in obj && obj.length;
            return typeof length === 'number' && length >= 0;
        },
        //each遍历
        each: function (arr, callback) {
            //首先判断是否为数组或对象分别用不同方法遍历
            if (IGeek.isArrayLike(arr)) {
                for (var i = 0; i < arr.length; i++) {
                    if (callback.call(arr[i], i, arr[i]) === false) break;
                }
            } else {
                for (var k in arr) {
                    if (callback.call(arr[k], k, arr[k]) === false) break;
                }
            }
            return arr;
        },
        //map方法
        map: function (arr, callback) {
            //因为map方法需要返回一个数组所以先准备一个新数组用来返回
            var newArr = [], tmp;
            //判断为数组或对象
            if (IGeek.isArrayLike(arr)) {
                for (var i = 0; i < arr.length; i++) {
                    tmp = callback(arr[i], i);
                    if (tmp != null) {
                        newArr.push(tmp);
                    }

                }
            } else {
                for (var k in arr) {
                    tmp = callback(arr[k], i);
                    if (tmp != null) {
                        newArr.push(tmp);
                    }

                }
            }
            // 扁平化处理
            return newArr.concat.apply( [], newArr );

        }

    });

    //原型上扩展方法
    IGeek.fn.extend({
        each: function (callback) {
            return IGeek.each(this, callback);
        },
        map: function (callback) {
            return IGeek.map(this, callback);
        }
    });


    //添加核心方法
    IGeek.fn.extend({
        //返回数组
        toArray: function () {
            return slice.call(this);
        },
        get: function (index) {
            if (index === undefined) {
                //不传参返回数组对象
                return this.toArray();
            }

            // 正负分别
            if (index < 0) {
                //为负反向查找
                return this[this.length + index];


            } else {
                return this[index];
            }
        },

        first: function () {
            //直接调用已有的方法
            return this.eq(0);
        },
        eq: function (index) {
            //因为需要返回一个IGeek对象所有先构造对象
            var iobj = this.constructor();

            if (index == null) return iobj;

            var dom = this.get(index);
            if (dom) {
                iobj[0] = dom;
                iobj.length = 1;
            }
            return iobj;
        },
        last: function () {
            return this.eq(-1);
        },
        //将数组转换成 IGeek 对象
        pushStack: function ( array ) {
            var tmp = this.constructor();
            push.apply( tmp, array );
            tmp.prevObject = this;
            return tmp;
        },
        end: function ( ) {
            return this.prevObject || this.constructor();
        }

    });

    window.IGeek = window.I = IGeek;




})( window );

