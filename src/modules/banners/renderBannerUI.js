import { events } from "../../common/constants";

function renderBannerUI(){
    try{
        let banners = this.getBanners() || [];
        const {
            banner = {}
        } = this.options;
        this.bannerWrapper.innerHTML = this.options.banner.template(banners, banner); 
    }
    catch (err) {
        this.onError("Banners > renderBannerUI", err, events.runtimeError)
    }

}
export default renderBannerUI;
