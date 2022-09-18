
import { event, debounce } from 'quasar'

function userAgent(pattern:RegExp) {
    if (typeof window !== 'undefined' && window.navigator) {
        return !! /*@__PURE__*/navigator.userAgent.match(pattern);
    }
}

var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);

var captureMode = {
    capture: false,
    passive: false
};


function animation(){
    let _fn:any;
    let runing:any;
    let run = (fn:any)=>{
        _fn = fn;
        return new Promise((resolve,reject)=>{
            if(runing == null){
                reject();
            }
        }).then(()=>{
            runing = null;
            run(_fn);
        })
    }
}


function matrix(el:any, selfOnly = false) {
    var appliedTransforms = '';

    if (typeof el === 'string') {
        appliedTransforms = el;
    } else {
        do {
            var transform = css(el, 'transform');

            if (transform && transform !== 'none') {
                appliedTransforms = transform + ' ' + appliedTransforms;
            }
            /* jshint boss:true */

        } while (!selfOnly && (el = el.parentNode));
    }

    var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix
    /*jshint -W056 */

    return matrixFn && new matrixFn(appliedTransforms);
}



function matches(
    /**HTMLElement*/
    el:any,
    /**String*/
    selector:any) {
    if (!selector) return;
    selector[0] === '>' && (selector = selector.substring(1));

    if (el) {
        try {
            if (el.matches) {
                return el.matches(selector);
            } else if (el.msMatchesSelector) {
                return el.msMatchesSelector(selector);
            } else if (el.webkitMatchesSelector) {
                return el.webkitMatchesSelector(selector);
            }
        } catch (_) {
            return false;
        }
    }

    return false;
}

function css(el: any, prop: any = void 0 , val: any = void 0) {
    var style = el && el.style;

    if (style) {
        if (val === void 0) {
            if (document.defaultView && document.defaultView.getComputedStyle) {
                val = document.defaultView.getComputedStyle(el, '');
            } else if (el.currentStyle) {
                val = el.currentStyle;
            }

            return prop === void 0 ? val : val[prop];
        } else {
            if (!(prop in style) && prop.indexOf('webkit') === -1) {
                prop = '-webkit-' + prop;
            }

            style[prop] = val + (typeof val === 'string' ? '' : 'px');
        }
    }
}

function getRect(el:any, relativeToContainingBlock:any, relativeToNonStaticParent:any, undoScale:any, container:any) {
    if (!el.getBoundingClientRect && el !== window) return;
    var elRect, top, left, bottom, right, height, width;

    if (el !== window && el.parentNode && el !== getWindowScrollingElement()) {
        elRect = el.getBoundingClientRect();
        top = elRect.top;
        left = elRect.left;
        bottom = elRect.bottom;
        right = elRect.right;
        height = elRect.height;
        width = elRect.width;
    } else {
        top = 0;
        left = 0;
        bottom = window.innerHeight;
        right = window.innerWidth;
        height = window.innerHeight;
        width = window.innerWidth;
    }

    if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
        // Adjust for translate()
        container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
        // Not needed on <= IE11

        if (!IE11OrLess) {
            do {
                if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
                    var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container

                    top -= containerRect.top + parseInt(css(container, 'border-top-width'));
                    left -= containerRect.left + parseInt(css(container, 'border-left-width'));
                    bottom = top + elRect.height;
                    right = left + elRect.width;
                    break;
                }
                /* jshint boss:true */

            } while (container = container.parentNode);
        }
    }

    if (undoScale && el !== window) {
        // Adjust for scale()
        var elMatrix = matrix(container || el),
            scaleX = elMatrix && elMatrix.a,
            scaleY = elMatrix && elMatrix.d;

        if (elMatrix) {
            top /= scaleY;
            left /= scaleX;
            width /= scaleX;
            height /= scaleY;
            bottom = top + height;
            right = left + width;
        }
    }

    return {
        top: top,
        left: left,
        bottom: bottom,
        right: right,
        width: width,
        height: height
    };
}


function getWindowScrollingElement() {
    var scrollingElement = document.scrollingElement;

    if (scrollingElement) {
        return scrollingElement;
    } else {
        return document.documentElement;
    }
}

function getParentAutoScrollElement(el: HTMLElement, includeSelf:boolean) {
    // skip to window
    if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
    var elem = el;
    var gotSelf = false;

    do {
        // we don't need to get elem css if it isn't even overflowing in the first place (performance)
        if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
            var elemCSS = css(elem);

            if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
                if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
                if (gotSelf || includeSelf) return elem;
                gotSelf = true;
            }
        }
        /* jshint boss:true */

    } while (elem = elem.parentNode as HTMLElement);

    return getWindowScrollingElement();
}

function on(el: EventTarget, event: string, fn: any) {
    el.addEventListener(event, fn, !IE11OrLess && captureMode);
}

function off(el: EventTarget, event: string, fn: any) {
    el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}

function closest(
    /**HTMLElement*/
    el:any,
    /**String*/
    selector:any,
    /**HTMLElement*/
    ctx:any, includeCTX:any) {
    if (el) {
        ctx = ctx || document;

        do {
            if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
                return el;
            }

            if (el === ctx) break;
            /* jshint boss:true */
        } while (el = getParentOrHost(el));
    }

    return null;
}
function getParentOrHost(el:any) {
    return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}



class Draggable {
    options: any
    el: HTMLElement
    _onTapStart: any
    _onTouchMove: any

    constructor(container: HTMLElement, arg: any) {

        this.el = container;
        this.options = Object.assign({
            container: null,
            draggable: 'li',
            handle: null,
            animation: null,
            onSorted: ()=>{},
        }, arg.value);


        if (this.el) {

            let options = this.options,
                el = this.el,
                sortObjects: any[] = [],
                moveTo = { from: -1, to: -1 },
                position = { top: 0, left: 0 },
                sPosition = { top: 0, left: 0 },
                cPosition = el.getBoundingClientRect(),
                pevt: any,
                startPoint = {},
                scrolledParent:any,
                dragging =false,
                mirror: HTMLElement | null,
                _log = (message: string)=>{
                    //console.log(message)
                },
                sortTo = (dir:boolean) => {

                    let source = sortObjects[moveTo.from].node,
                        offsetHeight = source.offsetHeight,
                        moveHeight = 0;


                    sortObjects.forEach(({ node, rect }, index: number) => {
                        if (!dir && index >= moveTo.to && index < moveTo.from) {
                            moveHeight += -1 * node.offsetHeight;
                            node.style.transform = 'translate3d(0px, ' + offsetHeight + 'px, 0px)';
                            // startHeight += node.offsetHeight
                        } else if (dir && index <= moveTo.to && index > moveTo.from) {
                            // startHeight += node.offsetHeight
                            moveHeight += node.offsetHeight;
                            node.style.transform = 'translate3d(0px, ' + (-1 * offsetHeight) + 'px, 0px)';
                        } else {
                            node.style.transform = 'translate3d(0px, 0px, 0px)';
                        }
                    })
                    source.style.transform = 'translate3d(0px, ' + (moveHeight) + 'px, 0px)';
                },
                _onTapStart = (evt: any) => {
                    _log('_onTapStart')
                    if(dragging){
                        return;
                    }

                    let touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
                        target = (touch || evt).target,
                        originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target;

                    target = closest(target, options.draggable, el, false);  

                    if (target && target.animated) {
                        return;
                    }

                    if (this.options.handle && !closest(originalTarget, this.options.handle, this.el, false)) {
                        return;
                    }

                    sortObjects = [];
                    pevt = evt;
                    cPosition = el.getBoundingClientRect();
                    position = event.position(evt);
                    scrolledParent = getParentAutoScrollElement(target, true);  

                    if (this.options.supportPointer) {
                        on(document, 'pointermove', _onTouchMove);
                    } else if (touch) {
                        on(document, 'touchmove', _onTouchMove);
                    } else {
                        on(document, 'mousemove', _onTouchMove);
                    }

                    on(document, 'mouseup', _onTouchEnd);
                    on(document, 'touchend', _onTouchEnd);
                    on(document, 'touchcancel', _onTouchEnd);

                    if(scrolledParent){
                        sPosition = { top: scrolledParent.scrollTop, left: scrolledParent.scrollLeft }
                        scrolledParent.onscroll = ()=>_onTouchScroll();
                    }


                    let i = 0;
                    Array.from(el.children).forEach((node: any) => {
                        if (node.tagName.toLowerCase() !== 'li') {
                            return false;
                        }
                        let row = {
                            node,
                            rect: node.getBoundingClientRect()
                        };

                        sortObjects.push(row)
                        node.style.visibility = 'visible';
                        node.style.transform = 'translate3d(0px, 0px, 0px) scaleX(1) scaleY(1)';
                        node.style.transition = 'transform 200ms ease 0s';

                        if (node == target) {
                            moveTo.from = i
                            moveTo.to = i

                            node.style.visibility = 'hidden';

                            mirror = document.createElement('div');
                            mirror.appendChild(node.children[0].cloneNode(true))
                            let computedSourceStyles = getComputedStyle(node);

                            mirror.style.touchAction = 'none';
                            mirror.style.zIndex = '999'
                            mirror.style.position = 'fixed';
                            mirror.style.pointerEvents = 'none';
                            mirror.style.top = row.rect.top + 'px';
                            mirror.style.left = row.rect.left + 'px';
                            mirror.style.height = computedSourceStyles.getPropertyValue('height');
                            mirror.style.width = computedSourceStyles.getPropertyValue('width');
                            mirror.style.transform = 'translate3d(0px, 0px, 0px) scaleX(1) scaleY(1)';

                            el.appendChild(mirror)
                        }
                        i++;
                    })
                    dragging = true;
                    
                },
                _onTouchScroll = (i=0)=>{
                    i !=0 ? scrolledParent.scrollBy(0,i):'';
                    _onTouchMove(pevt)    
                },
                _onTouchMove = (evt: any) => {
                    _log('_onTouchMove')
                    pevt = evt;
                    requestAnimationFrame(()=>{
                        if(!dragging){
                            return;
                        }
                        let _position = event.position(evt),
                            offset = { 
                                x: _position.left - position.left , 
                                y: _position.top - position.top 
                            },
                            offsetA = { 
                                x: offset.x + (scrolledParent?(scrolledParent.scrollLeft - sPosition.left ) : 0), 
                                y: offset.y + (scrolledParent?(scrolledParent.scrollTop - sPosition.top) : 0)
                            },
                            sourceRect = sortObjects[moveTo.from].rect,
                            offsetTY = sourceRect.top + offsetA.y ,
                            offsetBY = sourceRect.bottom + offsetA.y,
                            n = sortObjects.length - 1;



                        sortObjects.some(({ rect }, index) => {
                            if (index == 0 && (offsetTY + 12) < rect.bottom) {
                                moveTo.to = index;
                            } else if (index == n && (offsetBY - 10) > rect.top) {
                                moveTo.to = index;
                            } else if (offsetA.y < 0 && (offsetTY + 12) < rect.bottom && offsetTY > rect.top) {
                                moveTo.to = index;
                            } else if (offsetA.y > 0 && (offsetBY - 10) > rect.top && offsetBY < rect.bottom) {
                                moveTo.to = index;
                            }
                        })
                        
                        sortTo(offsetA.y >= 0)

                        if(scrolledParent){
                            let { top: _t , bottom: _b} = scrolledParent.getBoundingClientRect(); 
                            if(offset.y < 0 && scrolledParent.scrollTop > 0 && (_t+30) > _position.top ){
                                return _onTouchScroll(-1);
                            }else if(offset.y > 0 && (_b-30) < _position.top && (scrolledParent.scrollTop+scrolledParent.clientHeight) < scrolledParent.scrollHeight ){
                                return _onTouchScroll(1);
                            }
                        }

                        if (mirror) {
                            mirror.style.transform = 'translate3d(0px, ' + (offset.y) + 'px, 0px)';
                        }

                    })
                    
                },
                _onTouchEnd = (evt: any) => {
                    _log('_onTouchEnd')

                    if(!dragging){
                        return;
                    }

                    dragging = false

                    if(scrolledParent){
                        scrolledParent.onscroll = null;
                    }

                    off(document, 'mouseup', _onTouchEnd);
                    off(document, 'touchend', _onTouchEnd);
                    off(document, 'touchcancel', _onTouchEnd);

                    off(document, 'mousemove', _onTouchMove);
                    off(document, 'touchmove', _onTouchMove);
                    off(document, 'pointermove', _onTouchMove);

                    if (mirror) {
                        el.removeChild(mirror)
                        mirror = null;
                    }

                    sortObjects.forEach(({ node, rect }, index: number) => {
                        node.style.visibility = 'visible';
                        node.style.transform = null;
                        node.style.transition = null;
                    })

                    let source = sortObjects[moveTo.from].node;

                    if (moveTo.to != moveTo.from) {
                        if (moveTo.to == (sortObjects.length - 1)) {
                            el.appendChild(source)
                        }
                        let target = sortObjects[moveTo.to].node;
                        target = (moveTo.to - moveTo.from) < 0 ? target : target.nextSibling;
                        el.insertBefore(source, target)
                    }

                    mirror = null;

                    // requestAnimationFrame(()=>{
                    //     this.options.onSorted(moveTo.from, moveTo.to)
                    // })
                        
                };



            if (this.options.supportPointer) {
                on(this.el, 'pointerdown', _onTapStart);
            } else {
                on(this.el, 'mousedown', _onTapStart);
                on(this.el, 'touchstart', _onTapStart);
            }



        }
    }

}



export const draggable = {
    mounted: (el: HTMLElement, options: any) => {
        new Draggable(el, options);
    }
}
