/**
 * Created by QIAO on 2017/2/23.
 */
( function ( window ) {
   var arr = [],
       push = arr.push;

    var mark = 'checked, selected, readonly, disabled'.split(',');
    //attr, prop

    IGeek.fn.extend({

        attr: function ( attrName, attrValue ) {

            if( typeof attrName == 'string' ) {
                //��������
                if ( attrValue === undefined ) {
                    //��������
                    if ( mark.indexOf( attrName ) != -1 ) {
                        return this[ 0 ][ attrName ];
                    } else {
                        return this[ 0].getAttribute( attrName );
                    }
                } else if ( typeof  attrValue === 'function' ) {
                    //ȡֵ�ɻص���������
                    return this.each( function ( i ) {
                        if ( mark.indexOf( attrName ) != -1 ) {
                            this[ attrName ] = attrValue( i );
                        } else {
                            this.setAttribute( attrName, attrValue ( i ));
                        }
                    });
                } else {
                    //���õ���ֵ
                    return this.each( function () {
                        if ( mark.indexOf( attrName ) != -1 ) {
                            this[ attrName ] = attrValue;
                        } else {
                            this.setAttribute( attrName, attrValue );
                        }
                    });
                }

            } else if ( Object.prototype.toString.call( attrName ) === '[object Object' ) {
                //�������ö������
                return this.each( function () {
                    var that = this;

                    IGeek.each( attrName, function ( k, v ) {
                        if ( mark.indexOf( k ) != -1  ) {
                            that[ k ] = v ;
                        } else {
                            that.setAttribute( k, v );
                        }
                    });

                });
            }

        },

        prop: function ( attrName, attrValue ) {
            if( typeof attrName == 'string' ) {

                if ( attrValue === undefined ) {
                    return this[ 0 ][ attrName ];

                } else if ( typeof attrValue === 'function' ) {
                    return this.each( function ( i ) {
                        this[ attrName ] = attrValue( i, this[ attrName] );
                    });
                } else {
                    return this.each(function () {
                        this[attrName] = attrValue;
                    });
                }
            } else if ( Object.prototype.toString.call( attrName ) === '[object Object]' ) {
                return this.each( function () {
                    var that = this;
                    IGeek.each( attrName, function ( k, v ) {
                        that[ k ] = v;
                    });
                });
            }
        }


    });


    //html,text,val����
    IGeek.fn.extend({
        html: function ( thml ) {
            if ( html ) {
                return this.each(function () {
                    this.innerHTML = html;
                });
            } else {
                return this[ 0].innerHTML;
            }
        },

        text: function ( txt ) {
            if( txt ) {
                return this.each( function () {
                    this.innerText = txt;
                });
            } else {
                return this[ 0 ].innerText;
            }
        },

        val: function ( value ) {
            if ( value ) {
                return this.each( function () {
                    this.value = value;
                });
            } else {
                return this[ 0 ].value;
            }
        }



    });




})();