

import unxSelectors from '../common/constants/selectors';
import reRender from './reRender';
import bindEvents from './bindEvents';
import validateConfigs from './validateConfigs';
import { getKeyByValue } from '../common/utils';

const initialize = function() {
    this.validateConfigs = validateConfigs.bind(this);
    this.validateConfigs();
    this.createLayout();
    this.unxSelectors = unxSelectors;
    this.renderDidYouMean.bind(this);
    this.options.onEvent.bind(this);
    this.options.products.onProductClick.bind(this);
    this.reRender = reRender.bind(this);
    this.bindEvents = bindEvents.bind(this);

    this.bindEvents();
    const urlParams = this.getQueryParams();
    const ln = Object.keys(urlParams).length;
    const {
        defaultViewType,
        enabled
    } = this.options.productView;
    if(ln > 0){     
        const {
            [(this.options.url.pageViewParam.algo === "KEY_VALUE_REPLACER") ? this.options.url.pageViewParam.keyReplacer: "viewType"]: type
        } = urlParams;

        const viewType = this.getKeyByValue(this.options.url.pageViewParam.valuesReplacer, decodeURIComponent(type || defaultViewType))
        if(viewType) {
            this.viewState.productViewType = viewType;
            this.options.extraParams.viewType = viewType;
            this.state.productViewType = viewType
        }
    } else {
        this.options.extraParams.viewType = defaultViewType;
    }
    if(enabled) {
        this.renderProductViewTypeUI();
    }


    

}
export default initialize;
