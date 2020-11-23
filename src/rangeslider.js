(function( $ ) {
    $.fn.Rangeslider = function(data) {
        this.options = {
            thumb2: false,
            target: this,
        }

        let build = function(options) {
            let _this = this;
            _this.rsWrapper = $("<div/>").appendTo(options.target);
            _this.rsWrapper.addClass("rsWrapper");

            _this.rsBase = $("<div/>").appendTo(rsWrapper);
            _this.rsBase.addClass("rsBase");

            _this.rsThumb1 = $("<div/>").appendTo(rsBase);
            _this.rsThumb1.addClass("rsThumb .rsThumb_1");

            if (options.thumb2 == true) {
                _this.rsThumb2 = $("<div/>").appendTo(rsBase);
                _this.rsThumb2.addClass("rsThumb.rsThumb_2");
            }
        }

        build(this.options);
    }
})(jQuery);


var $rangeslider = $(".test").Rangeslider()