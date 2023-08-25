
import renderPagination from './renderPagination';
import setUpInfiniteScroll from './infiniteScroller';
import {
    renderNewResults,
    paginationAction
} from './actions';


const getProductsPerPage = function () {
    let {
        url: {
            pageSizeParam: {
                keyReplacer = "",
                addToUrl,
                algo = "DEFAULT"
            } = {},
            pageNoParam: {
                usePageNo = false,
            } = {}
        } = {},
        pagesize: {
            pageSize
        } = {}
    } = this.options;


    if (addToUrl) {
        const urlParams = this.readQueryParamsFromUrl(this.options.hashMode ? location.hash.slice(1) : location.search);
        // const urlParams = new URLSearchParams(this.options.hashMode ? location.hash.slice(1) : location.search);
        // let productsPerPage;


        // if (!customize) {
        //     keyReplacer = this.options.url.pageSizeParam.keyReplacer
        // }

        return Number(urlParams[((algo === "KEY_VALUE_REPLACER") ? keyReplacer : "rows")])
    } else {
        return this.state.pageSize || pageSize;
    }
    // return addToUrl ? Number(urlParams.get(keyReplacer)) : this.viewState[ 'count' ]

    // if (this.options.pagination.usePageAndCount) {
    //     productsPerPage = Number(urlParams.get('count'));
    // } else {
    //     productsPerPage = Number(urlParams.get('rows'));
    // }
    // return productsPerPage;
}

const getCurrentUrlPage = function () {
    const urlParams = this.readQueryParamsFromUrl(this.options.hashMode ? location.hash.slice(1) : location.search);
    // const urlParams = new URLSearchParams(this.options.hashMode ? location.hash.slice(1) : location.search);
    let currentUrlPage;
    let {
        url: {
            pageNoParam: {
                algo = "DEFAULT",
                usePageNo = false,
                keyReplacer = "",
                addToUrl
            } = {}
        } = {}
    } = this.options;

    // if (!customize) {
    //     keyReplacer = this.options.url.pageNoParam.keyReplacer
    // }

    // if (usePageNo) {
    //     return addToUrl ? Number(urlParams.get(customize ? keyReplacer : "page") || 1 ) : (this.viewState[ 'page' ] || 1);
    // } else {
    //     return addToUrl ? (Number((urlParams.get(customize ? keyReplacer : "start") || 0) / getProductsPerPage.call(this)) + 1) : (this.viewState[ 'start' ] || 0);
    // }

    if (addToUrl) {
        const pageNo = Number(urlParams[(algo === "KEY_VALUE_REPLACER") ? keyReplacer : usePageNo ? "page" : "start"]);
        // const pageNo = Number(urlParams.get((algo === "KEY_VALUE_REPLACER") ? keyReplacer : usePageNo ? "page" : "start"));
        return usePageNo ? Number(pageNo) : Number((pageNo / getProductsPerPage.call(this)) + 1)
    } else if (usePageNo) {
        if (!this.viewState[ 'page' ]) { this.viewState[ 'page' ] = 1; }
        return this.viewState[ 'page' ]
        // return this.viewState[ 'page' ] || 1;
    } else {
        if (!this.viewState[ 'start' ]) { this.viewState[ 'start' ] = 0; }
        return Number(((this.viewState[ 'start' ]) / this.state.pageSize) + 1);
    }

    // if (this.options.pagination.usePageAndCount) {
    //     currentUrlPage = Number(urlParams.get('page')) || 1;
    // } else {
    //     currentUrlPage = Number(urlParams.get('start') / getProductsPerPage.call(this)) + 1;
    // }
    // return currentUrlPage;
}

const setPageNoParam = function (value) {
    const {
        url: {
            pageNoParam: {
                algo,
                usePageNo = false,
                keyReplacer,
                addToUrl
            } = {},
        } = {}
    } = this.options;

    if (addToUrl) {
        const urlParams = this.readQueryParamsFromUrl(this.options.hashMode ? location.hash.slice(1) : location.search);
        // const urlParams = new URLSearchParams(this.options.hashMode ? location.hash.slice(1) : location.search);
        urlParams[((algo === "KEY_VALUE_REPLACER") ? keyReplacer : usePageNo ? 'page' : 'start')] = [value];
        history.replaceState(null, null, this.urlSearchParamsToStr(urlParams));
    } else if (usePageNo) {
        this.viewState[ 'page' ] = value;
    } else {
        this.viewState[ 'start' ] = value;
    }

}

const setPagination = (prototype) => {
    prototype = Object.assign(prototype, {
        renderPagination,
        renderNewResults,
        paginationAction,
        setUpInfiniteScroll,
        getProductsPerPage,
        getCurrentUrlPage,
        setPageNoParam
    })
}

export {
    setPagination as default,
    renderPagination,
    renderNewResults,
    paginationAction,
    setUpInfiniteScroll,
    getProductsPerPage,
    getCurrentUrlPage,
    setPageNoParam
};
