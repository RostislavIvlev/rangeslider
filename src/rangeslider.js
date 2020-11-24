(function($) {
    $.fn.extend({
        rangeslider: function(options) {
            this.defaultOptions = {
                additionThumb:        false,
                target:               $(this),
                thumbPosition:        0,
                additionPosition:     100, 
                min:                  0,
                max:                  0,
                description:          false,
            }

            var settings = $.extend({}, this.defaultOptions, options);

            function rsBuild() {
                let _this = this;
                _this.rsWrapper = $("<div/>").appendTo(settings.target);
                _this.rsWrapper.addClass("rsWrapper");
            
                _this.rsBase = $("<div/>").appendTo(rsWrapper);
                _this.rsBase.addClass("rsBase");
            
                _this.rsThumb1 = $("<div/>").appendTo(rsBase);
                _this.rsThumb1.addClass("rsThumb rsThumb_1");
                _this.rsThumb1.css("left", settings.thumbPosition)

            
                if (settings.additionThumb == true) {
                    _this.rsThumb2 = $("<div/>").appendTo(rsBase);
                    _this.rsThumb2.addClass("rsThumb rsThumb_2");
                    _this.rsThumb2.css("left", settings.additionPosition)
                }
            }

            function rsModel() {

            }

            function rsConstructor() {
                let baseWidth = rsBase.css("width");
                
            }

            return this.each(function() {
                var $this = $(this);
                
                rsBuild($this);
                rsModel($this);
                rsConstructor($this);
            });
        }
    });
})(jQuery);


var $rangeslider = $(".test").rangeslider({
    additionThumb: true,
    thumbPosition: "10px",
    additionPosition: "100px",
})