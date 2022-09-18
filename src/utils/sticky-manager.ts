import { inject, provide } from 'vue'
import debounce from './debounce';



const l = 1e3 / 60;


function rect(e:any) {
    if (!(e instanceof Element))
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
        };
    const t = e.getBoundingClientRect();
    return {
        top: t.top,
        left: t.left,
        width: t.width,
        height: t.height
    };
}

function isDocument(e:any) {
    return e === document
}

function isOuter(e:any, t:any) {
    const o = e.left
      , n = e.left + e.width
      , s = t.left;
    return t.left + t.width < o || n < s
}


export interface StickyItemType{
    stickyNode: HTMLElement,
    placeHolderNode: HTMLElement,
    handlePositioning: any,
    offset: any,
    boundingElement: any,
    disableWhenStacked: any,
}


export class StickyManager {
    stickyItems: StickyItemType[]
    stuckItems: StickyItemType[]
    container: HTMLElement | null
    topBarOffset: number
    handleResize: any
    handleScroll: any

    constructor(e:any = null) {
        this.stickyItems = [],
        this.stuckItems = [],
        this.container = null,
        this.topBarOffset = 0,
        this.handleResize = debounce(()=>{
            this.manageStickyItems()
        }, l , {
            leading: !0,
            trailing: !0,
            maxWait: l
        }),
        this.handleScroll = debounce(()=> {
            this.manageStickyItems()
        }, l , {
            leading: !0,
            trailing: !0,
            maxWait: l
        }), 
        e && this.setContainer(e)
    }
    registerStickyItem(e:StickyItemType) {
        this.stickyItems.push(e)
    }
    unregisterStickyItem(e:HTMLElement) {
        const t = this.stickyItems.findIndex((({stickyNode: t})=>e === t));
        this.stickyItems.splice(t, 1)
    }
    setContainer(e:HTMLElement) {
        this.container = e,
        this.container.addEventListener("scroll", this.handleScroll),
        window.addEventListener("resize", this.handleResize),
        this.manageStickyItems()
    }
    removeScrollListener() {
        this.container && (this.container.removeEventListener("scroll", this.handleScroll),
        window.removeEventListener("resize", this.handleResize))
    }
    manageStickyItems() {
        if (this.stickyItems.length <= 0)
            return;
        const e = this.container ? isDocument(t = this.container) ? document.body.scrollTop || document.documentElement.scrollTop : t.scrollTop : 0;
        var t;
        const o = rect(this.container).top + this.topBarOffset;
        this.stickyItems.forEach((t=>{
            const {handlePositioning: n} = t
                , {sticky: s, top: r, left: i, width: a} = this.evaluateStickyItem(t, e, o);
            this.updateStuckItems(t, s),
            n(s, r, i, a)
        }
        ))
    }
    evaluateStickyItem(e:StickyItemType, t:number, o:number) {
        const {stickyNode: s, placeHolderNode: r, boundingElement: a, offset: l, disableWhenStacked: u} = e;

        const c = l ? this.getOffset(s)  : this.getOffset(s)
            , d = t + c
            , p = r.getBoundingClientRect().top - o + t
            , h = o + c
            , m = r.getBoundingClientRect().width
            , f = r.getBoundingClientRect().left;
        let b;
        if (null == a)
            b = d >= p;
        else {
            var v;
            const e = s.getBoundingClientRect().height || (null === (v = s.firstElementChild) || void 0 === v ? void 0 : v.getBoundingClientRect().height) || 0
                , n = a.getBoundingClientRect().bottom - e + t - o;
            b = d >= p && d < n
        }
        return {
            sticky: b,
            top: h,
            left: f,
            width: m
        }
    }
    updateStuckItems(e:StickyItemType, t:boolean) {
        const {stickyNode: o} = e;
        t && !this.isNodeStuck(o) ? this.addStuckItem(e) : !t && this.isNodeStuck(o) && this.removeStuckItem(e)
    }
    addStuckItem(e:StickyItemType) {
        this.stuckItems.push(e)
    }
    removeStuckItem(e:StickyItemType) {
        const {stickyNode: t} = e
            , o = this.stuckItems.findIndex((({stickyNode: e})=>t === e));
        this.stuckItems.splice(o, 1)
    }
    getOffset(e:HTMLElement) {
        if (0 === this.stuckItems.length)
            return 0;
        let t = 0
            , o = 0
            , n = this.stuckItems.length
            , s = rect(e);
        for (; o < n; ) {
            const n = this.stuckItems[o].stickyNode;
            if (n === e)
                break;
            isOuter(s, rect(n)) || (t += rect(n).height);
            o++
        }
        return t
    }
    isNodeStuck(e:HTMLElement) {
        return this.stuckItems.findIndex((({stickyNode: t})=>e === t)) >= 0
    }
    setTopBarOffset(t:number) {
        this.topBarOffset = t
    }
}

const Sticky = new StickyManager(document)

export const useSticky = ()=>{
    return Sticky
}
