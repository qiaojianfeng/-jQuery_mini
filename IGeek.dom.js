/**
 * Created by QIAO on 2017/2/18.
 */
// 必须先加载 core(核心) 再加载 dom
// 在此文件中 IGeek 的相关核心内容可以直接使用
(function (window) {
    var arr = [],
        push = arr.push,
        slice = arr.slice,
        map = arr.map;

    //扩展DOM方法

    //parseHTML可以把传入的字符串解析成DOM元素进而包装为IGeek对象
    IGeek.parseHTML = function (html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        //var arr = [];
        //for ( var i = 0; i < div.childNodes.length; i++ ) {
        //    arr.push( div.childNodes[ i ] );
        //}
        //return arr;

        //自己优化写法
        return map.call(div.childNodes, function (v) {
            return v;
        });
    };

    //========添加工具方法==========
    var tmpDomMethod = {
        appendTo: function (currentNode, objNode) {
            objNode.appendChild(currentNode);
        },
        prependTo: function (currentNode, objNode) {
            if (objNode.childNodes.length == 0) {
                objNode.appendChild(currentNode);
            } else {
                objNode.insertBefore(currentNode, objNode.firstChild);
            }
        },
        insertBefore: function (currentNode, objNode) {
            objNode.parentNode.insertBefore(currentNode, objNode);
        },
        insertAfter: function (currentNode, objNode) {
            var nextNode = objNode.nextSibling;
            if (nextNode) {
                nextNode.parentNode.insertBefore(currentNode, nextNode);
            } else {
                objNode.parentNode.appendChild(currentNode);
            }
        }

    };

    IGeek.extend(tmpDomMethod);

    //原型添加具体方法
    IGeek.each(tmpDomMethod, function (k, v) {
        IGeek.fn[k] = function (selector) {
            var iObj = this.constructor(selector);
            var tmp = [], tmpNode;
            for (var i = 0; i < this.length; i++) {
                for (var j = 0; j < iObj.length; j++) {
                    tmpNode = j == iObj.length - 1 ? this[i] : this[i].cloneNode(true);
                    tmp.push(tmpNode);

                    //调用对应方法处理
                    v(tmpNode, iObj[j]);
                }
            }

            var tmpIobj = this.constructor();
            tmpIobj.prevObject = this;
            push.apply(tmpIobj, tmp);

            return tmpIobj;
        };


    });


    IGeek.each({
        "append": "appendTo",
        "prepend": "prependTo",
        "before": "insertBefore",
        "after": "insertAfter"
    }, function (k, v) {
        IGeek.fn[k] = function (selector) {
            this.constructor(selector)[v](this);
            return this;
        }

    });

    //其他亲属访问方法
    //工具方法

    IGeek.extend({
        //包含方法，判断一个数组中是否有item方法，是返回true反之返回false
        contains: function ( arr, item ) {
            for ( var i = 0; i < arr.length; i++ ) {
                if ( arr[ i ] == item ) {
                    return true;
                }
            }
            return false ;
        },
        //去重方法，把包含是item去重
        unique: function ( arr ) {
            //准备新数组接收返回去重后元素
            var newArr = [];
            for ( var i = 0; i < arr.length; i++ ) {
                if( !IGeek.contains( newArr, arr[ i ] ) ) {
                    newArr.push ( arr[ i ] );
                }
            }
            return newArr;
        }
    });

    //添加亲属访问工具方法

    var domElementTool = {
        next: function ( node ) {
            var tmp = node;
            while ( tmp = tmp.nextSibling  ) {
                if ( tmp.nodeType == 1 ) {
                    return tmp;
                }
            }
            return null;
        },
        nextAll: function ( node ) {
            var tmp = node,
                arr = [];
            while ( tmp = tmp.nextSibling ) {
                if ( tmp.nodeType == 1 ) {
                    arr.push( tmp );
                }
            }
            return arr;
        },
        prev: function ( node ) {
            var tmp = node;
            while ( tmp = tmp.previousSibling ) {
                if ( tmp.nodeType == 1 ) {
                    return tmp;
                }
            }
        },
        prevAll: function ( node ) {
            var tmp = node,
                arr =[];
            while ( tmp = tmp.previousSibling ) {
                if ( tmp.nodeType == 1 ) {
                    arr.push( tmp );
                }
            }
            return arr;
        },
        parent: function ( node ) {
            return node.parentNode;
        }

    }

    // next, nextAll, prev, prevAll, parent 合并实现了
    //给IGeek对象的原型添加方法
    IGeek.each( domElementTool, function( k,method ) {
        IGeek.fn[ k ] = function () {
            return this.pushStack( IGeek.unique( this.map( function (  v ) {
                return method( v );
            })))
        }
    });
    //合并
    IGeek.fn.siblings = function () {
        var prevAll = this.prevAll().toArray();
        var nextAll = this.nextAll().toArray();

        return this.pushStack( prevAll.concat( nextAll ) );
    };




})(window);