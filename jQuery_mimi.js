/**
 * Created by QIAO on 2017/2/15.
 */

//引入构造函数Q
//

(function (window) {
    //预定义变量保存需要借用的方法
    var arr = [],
        push = arr.push,
        slice = arr.slice;


//引入工厂模式包裹new关键字
//但是全局暴露了多个变量，发生变量污染，因此再引入沙箱模式
//IGeek做为对外公开函数
    function IGeek(selector) {
        return new IGeek.fn.init(selector);
    }


    //IGeek函数的原型设置
    //核心方法设置在原型上
    //IGeek.prototype可以优化写法为IGeek.fn
    IGeek.fn = IGeek.prototype = {
        constructor: IGeek,//构造函数指向IGeek
        length: 0,
        init: function (selector) {
            if (!selector) return this;

            if( typeof(selector) == "string" ){
                if (/^\s*</.test(selector)) {

                    push.apply(this, IGeek.praseHTML(selector));

                } else {

                    push.apply(this, IGeek.select(selector));
                }

                return this;

            }


        }

    }


    //原型共享
    IGeek.fn.init.prototype = IGeek.fn;

    //添加扩展方法，便于后期添加维护
    //使用对象方法继承
    //给IGeek函数的原型和构造函数均添加扩展方法
    IGeek.extend = IGeek.fn.extend = function (obj) {
        for (var k in obj) {
            this[k] = obj[k];
        }
        return this;//返回this继续可以连式编程
    }

    //既然使用了extend扩展了框架方法添加，就再继续优化，除核心方法，其他都使用扩展方法添加

    //使用扩展方法添加静态方法
    IGeek.extend({
        select: function (selector) {
            return document.querySelectorAll(selector);

        },

        isArrayLike: function (obj) {
            if (Object.prototype.toString.call(obj) === "[object Array]") {
                return true;//是数组返回true
            }
            //判断是不是伪数组
            var length = "length" in obj && obj.length;
            return typeof length === "number" && length >= 0;
        },

        each: function (obj, callback) {
            if (IGeek.isArrayLike(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    //改变this指向实现链式编程
                    if (callback.call(obj[i], i, obj[i]) === false) break;//实现跳出
                }

            } else {
                for (var k in obj) {
                    if (callback.call(obj[k], k, obj[k]) === false) break;
                }

            }

            return obj;//返回遍历对象本身
        },

        map: function (obj, callback) {
            var newArr = [], tmp;

            if (IGeek.isArrayLike(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    tmp = callback(obj[i], i);
                    if (tmp != null) {
                        newArr.push(tmp);
                    }
                }

            } else {
                for (var k in obj) {
                    tmp = callback[k];
                    if (tmp != null) {
                        newArr.push(tmp)
                    }
                }

            }

            return newArr;//返回遍历对象本身
        }


    })

    //使用扩展方法添加原型方法
    IGeek.fn.extend({
        each: function (callback) {
            return IGeek.each(this, callback);
        },
        map: function (callback) {
            return IGeek.map(this, callback);
        }
    })


    //扩展核心方法
    IGeek.fn.extend({
        //toArray方法
        toArray: function () {
            return slice.call(this);
        },

        //get方法
        get: function (index) {
            if (index === undefined) {
                return this.toArray();
            }
            if (index < 0) {
                return this [this.length + index];
            } else {
                return this [index];
            }
        },

        //eq方法
        eq: function (index) {
            var iobj = this.constructor;//获取对象构造函数IGeek
            if( index == null ) return iobj;

            var dom = this.get(index);//获得DOM元素
            if( dom ){
                iobj[0] = dom;
                iobj[0].length = 1;
            }
            return iobj;
        },
        first: function () {
           return this.eq(0);
        },

        last: function () {
            return this.eq(-1);
        },

        //标准↓
        praseHTML: function ( html ) {
            var div = document.createElement("div");
            div.innerHTML = html;
            var arr = [];
            for(var i=0;i<div.childNodes.length;i++){
                arr.push(div.childNodes[i]);
            }
            return arr;
        },
        //自己测试
        appendTo: function ( dom ) {

            return this.each(function(){
               dom.appendChild( this );
            });

        },





    })


    //设置对外开放的对象
    window.IGeek = window.I = IGeek;

})(window);


