var LettuceUtils = {
    makeExternalLinkNewTab: function(){
        //jquery needed
        var self = this;
        $("a").each(function(index , ele) {
            if(self.isExternalLink($(ele).attr("href"))){
                $(ele).attr("target" , "_blank");
            }
        });
    },
    isExternalLink: function(link) {
        return link.indexOf("http") == 0;
    }
}
