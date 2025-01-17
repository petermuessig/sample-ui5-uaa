import UIComponent from 'sap/ui/core/UIComponent'
import Device from 'sap/ui/Device';
import models from "./model/models" 

/**
 * @namespace deloitte.sf.base
 */
export default class Component extends UIComponent {
    public static metadata = {
        manifest: 'json'
    }

    /**
     * The content density class name to be set on the document root element.
     */
    private contentDensityClass: string;

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     */
    public init() : void {
        // call the base component's init function
		super.init();

		// create the device model
		this.setModel(models.createDeviceModel(), "device");

		// create the views based on the url/hash
		this.getRouter().initialize();
    }

    /**
     * The component is destroyed by UI5 automatically.
     */
    public destroy() : void{
        // call the base component's destroy function
        super.destroy();
    }

     /**
     * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
     * design mode class should be set, which influences the size appearance of some controls.
     * @public
     * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
     */
    public getContentDensityClass() : string {
        if (this.contentDensityClass === undefined) {
			// check whether FLP has already set the content density class; do nothing in this case
			if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
				this.contentDensityClass = "";
			} else if (!Device.support.touch) {
				// apply "compact" mode if touch is not supported
				this.contentDensityClass = "sapUiSizeCompact";
			} else {
				// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
				this.contentDensityClass = "sapUiSizeCozy";
			}
		}
		return this.contentDensityClass;
    }
}