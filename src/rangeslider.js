(function($) {
    $.fn.extend({
        rangeslider: function(options) {
            this.defaultOptions = {
                additionThumb:        false,
                target:               $(this),
                thumbPosition:        0,
                additionPosition:     100, 
                min:                  0,
                max:                  100,
                description:          false,
                display:              false,
            }

            var settings = $.extend({}, this.defaultOptions, options);

            function rsBuild() {
                let _this = this;
                _this.rsWrapper = $("<div/>").appendTo(settings.target);
                _this.rsWrapper.addClass("rsWrapper");

                if (settings.display == true) {
                    _this.rsDisplay = $("<input/>").appendTo(rsWrapper);
                    _this.rsDisplay.addClass("rsDisplay");
                };
            
                _this.rsBase = $("<div/>").appendTo(rsWrapper);
                _this.rsBase.addClass("rsBase");
            
                _this.rsThumb1 = $("<div/>").appendTo(rsBase);
                _this.rsThumb1.addClass("rsThumb rsThumb_1");
                _this.rsThumb1.css("left", rsCalculate().thumbPosition1);

            
                if (settings.additionThumb == true) {
                    _this.rsThumb2 = $("<div/>").appendTo(rsBase);
                    _this.rsThumb2.addClass("rsThumb rsThumb_2");
                    _this.rsThumb2.css("left", rsCalculate().thumbPosition2);
                };
            };

            function rsCalculate() {
                let baseWidth = rsBase.css("width").slice(0, -2);
                let minMax = settings.max - settings.min;
                let thumbPosition1 = (baseWidth/minMax * settings.thumbPosition) - 6;
                let thumbPosition2 = baseWidth/minMax * settings.additionPosition - 6;

                return {
                    thumbPosition1,
                    thumbPosition2
                };
            };

            function showInput() {
                rsDisplay.val(settings.thumbPosition + " - " + settings.additionPosition);
            }

            return this.each(function() {
                var $this = $(this);

                rsBuild();
                showInput();
            });
        }
    });
})(jQuery);


var $rangeslider = $(".test").rangeslider({
    additionThumb: true,
    thumbPosition: 5000,
    additionPosition: 10000,
    display: true,
    min: 0,
    max: 15000,
})