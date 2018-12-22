declare module ScatterJS {
    class scatter {
       //private connect;
       constructor();
       static connect(any): boolean;
	   static getIdentity(any): any;
	   static eos(any, eos:any): any;
       static eth(any, eth:any): any;
       static trx(any, trx:any): any;
	   static forgetIdentity():void;
       static logout():void;
	   static identity;
    }
    function plugins (scatterEOS: ScatterEOS);
}
