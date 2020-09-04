export default function(product,idx,swatchUI,productViewType){
    const {
        unxTitle,
        unxImageUrl,
        uniqueId,
        unxStrikePrice,
        unxPrice,
        unxDescription
    } = product; 
    const {
        products
    } = this.options;
    const {
        productItemClass
    }  = products;

    const imgUrl = Array.isArray(unxImageUrl) ? unxImageUrl[0]:unxImageUrl;
    const priceUI = `<span class="UNX-sale-price">${unxPrice}</span>`;
    let strikeUi = ``;
    if(unxStrikePrice) {
        strikeUi = `<span class="UNX-strike-price">${unxStrikePrice}<span>`
    }
    let cardType = ``;
    let descUI = ``;
    if(productViewType === "GRID") {
        cardType = "UNX-grid-card"
    } else {
        cardType = "UNX-list-card";
        descUI = `<p class="UNX-description">${unxDescription}</p>`;
    }
    return [`<div id="${uniqueId}" data-id="${uniqueId}" data-prank="${idx}" data-item="product" class="UNX-product-col ${cardType} ${productItemClass}">`,
                `<div class="UNX-img-wrapper"><img class="UNX-img-block" src="${imgUrl}"/></div>`,
                `<div class="UNX-product-content">`,
                    `<h3 class="UNX-product-title">${unxTitle}</h3>`,
                    `<div class="UNX-swatch-wrapper">${swatchUI}</div>`,
                    descUI,
                    `<div class="UNX-price-row">${priceUI} ${strikeUi}</div>`,
                `</div>`,
            `</div>`].join('')
};