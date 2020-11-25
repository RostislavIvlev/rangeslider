(function($) {
    $.fn.extend({
        rangeslider: function(options) {
            this.defaultOptions = {
                target:               $(this),
                thumbPosition:        0,
                additionPosition:     undefined, 
                min:                  0,
                max:                  100,
                description:          false,
                display:              false,
            }

            var settings = $.extend({}, this.defaultOptions, options);

            // Swap thumbs if additionPosition > thumbPosition
            function thumbsSwap() {
                if (settings.thumbPosition > settings.additionPosition) {
                    let tempPosition = settings.thumbPosition;
                    settings.thumbPosition = settings.additionPosition;
                    settings.additionPosition = tempPosition;
                }
            }

            // Secure rs from incorrect values for thumbs
            function thumbsMinMax() {
                if (settings.thumbPosition > settings.max) {
                    settings.thumbPosition = settings.max
                };
                if (settings.thumbPosition < settings.min) {
                    settings.thumbPosition = settings.min
                };
                if (settings.additionPosition > settings.max) {
                    settings.additionPosition = settings.max
                };
                if (settings.additionPosition < settings.min) {
                    settings.additionPosition = settings.min
                };
            }

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
                _this.rsThumb1.addClass("rsThumb");
                _this.rsThumb1.css("left", rsCalculate().thumbPosition1);

            
                if (settings.additionPosition != undefined) {
                    _this.rsThumb2 = $("<div/>").appendTo(rsBase).addClass("rsThumb");
                    _this.rsThumb2.css("left", rsCalculate().thumbPosition2);

                    _this.rsBetween = $("<div/>").appendTo(rsBase).addClass("rsBetween");
                    _this.rsBetween.css("left", rsCalculate().thumbPosition1 + 6);
                    _this.rsBetween.css("width", rsCalculate().thumbPosition2 - rsCalculate().thumbPosition1)
                };


            };

            function rsCalculate() {
                let baseWidth = rsBase.width();
                let minMax = settings.max - settings.min;
                let thumbPosition1 = (baseWidth/minMax * settings.thumbPosition) - 6;
                let thumbPosition2 = baseWidth/minMax * settings.additionPosition - 6;

                return {
                    thumbPosition1,
                    thumbPosition2
                };
            };
            

            function showInput() {
                if (settings.additionPosition == undefined) {
                    rsDisplay.val(settings.thumbPosition)
                } else {
                    rsDisplay.val(settings.thumbPosition + " - " + settings.additionPosition);
                }
            }

            function dragNDrop() {
                function drag(e) {
                    e.preventDefault;
                    let pointer = $(event.target);
                    if (pointer.is(".rsThumb")) {
                        let shiftX = e.clientX - pointer.offset().left;

                        function move(e) {
                            let newLeft = e.clientX - shiftX - rsBase.offset().left;  //data for new position;

                            if (newLeft < 0) {
                                newLeft = 0;
                            };

                            let rightEdge = rsBase.width() - pointer.width();

                            if (newLeft > rightEdge) {
                                newLeft = rightEdge;
                            };

                            pointer.css("left", newLeft + "px");

                            console.log(newLeft)
                        }

                        $(document).on("mousemove", move)
                    } else return
                }
                function drop() {
                    $(document).unbind("mousemove");
                }

                $(this).on("mousedown", drag)
                $(document).on("mouseup", drop)
            }

            

            return this.each(function() {
                var $this = $(this);
                
                thumbsMinMax();
                thumbsSwap();
                rsBuild();
                showInput();
                dragNDrop();
            });
        }
    });
})(jQuery);

$(".test").rangeslider({
    thumbPosition: 5000,
    additionPosition: 10000,
    display: true,
    min: 0,
    max: 15000,
})
