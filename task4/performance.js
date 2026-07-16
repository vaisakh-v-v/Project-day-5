const benchMark = () =>{
    const start = performance.now();
    const fragment = document.createDocumentFragment();
    for(let i = 0; i<1000; i++){
        const div = document.createElement("div");
        div.textContent = `Item ${i + 1}`;
        fragment.appendChild(div);
    }
    const dom = document.querySelector(".dom-container");
    dom.appendChild(fragment);
    const end = performance.now();
    console.log(`Rendering time: ${(end - start).toFixed(2)}ms.`);
};
benchMark();

const startVirtual = performance.now();
const virtual = document.querySelector(".virtual-container");

const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);
const visibleItems = items.slice(0,1000);
virtual.innerHTML = visibleItems.map(item => `<div>${item}</div>`).join('');
const endVirtual = performance.now();
console.log(`Virtual scroll rendered in: ${(endVirtual - startVirtual)}ms`);

const lcpObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP Time (ms):',lastEntry.startTime);
    console.log('LCP element:', lastEntry.element);
});
lcpObserver.observe({type: 'largest-contentful-paint',buffered: true});



const connection = navigator.connection ||  navigator.mozConnection || navigator.webkitConnection;
console.log(connection)
function init(){
    performance.mark('init-start');
    const isSlowConnection = connection && ['slow-2g', '2g', '3g'].includes(connection.effectiveType);

    if(isSlowConnection){
        console.log(`slow connection detected (${connection.effectiveType})`);
    }
    performance.mark('init-end');
    performance.measure('init-duration', 'init-start', 'init-end');

    const measure = performance.getEntriesByName('init-duration')[0];
    console.log(`portfolio init() took ${measure.duration.toFixed(2)}ms`);

}
document.addEventListener('DOMContentLoaded' , init);