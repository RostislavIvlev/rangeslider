(function($) {
    $.fn.extend({
        rangeslider: function(options) {
            this.defaultOptions = {
                target:               $(this),
                thumbValue:        0,
                additionValue:     undefined, 
                min:                  0,
                max:                  100,
                description:          false,
                display:              false,
            }

            var settings = {
                thumbPosition: 0,
                additionPosition: 0
            }
            settings = $.extend({}, this.defaultOptions, options);

            // Swap thumbs if additionValue > thumbValue
            function thumbsSwap() {
                if (settings.thumbValue > settings.additionValue) {
                    let tempPosition = settings.thumbValue;
                    settings.thumbValue = settings.additionValue;
                    settings.additionValue = tempPosition;
                }
            }

            // Secure rs from incorrect values for thumbs
            function thumbsMinMax() {
                if (settings.thumbValue > settings.max) {
                    settings.thumbValue = settings.max
                };
                if (settings.thumbValue < settings.min) {
                    settings.thumbValue = settings.min
                };
                if (settings.additionValue > settings.max) {
                    settings.additionValue = settings.max
                };
                if (settings.additionValue < settings.min) {
                    settings.additionValue = settings.min
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
                settings.thumbPosition = rsCalculate().thumbPosition1;

            
                if (settings.additionValue != undefined) {
                    _this.rsThumb2 = $("<div/>").appendTo(rsBase).addClass("rsThumb");
                    _this.rsThumb2.css("left", rsCalculate().thumbPosition2);
                    settings.additionPosition = rsCalculate().thumbPosition2;


                    _this.rsBetween = $("<div/>").appendTo(rsBase).addClass("rsBetween");
                    _this.rsBetween.css("left", rsCalculate().thumbPosition1 + 6);
                    _this.rsBetween.css("width", rsCalculate().thumbPosition2 - rsCalculate().thumbPosition1)
                };


            };

            function rsCalculate() {
                let baseWidth = rsBase.width();
                let minMax = settings.max - settings.min;
                let thumbPosition1 = (baseWidth/minMax * settings.thumbValue) - 6;
                let thumbPosition2 = baseWidth/minMax * settings.additionValue - 6;

                return {
                    thumbPosition1,
                    thumbPosition2
                };
            };
            

            function showInput() {
                if (settings.additionValue == undefined) {
                    rsDisplay.val(settings.thumbValue)
                } else {
                    rsDisplay.val(settings.thumbValue + " - " + settings.additionValue);
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

                            if (pointer.is(rsThumb1) && (settings.additionValue != undefined)) {
                                rightEdge = settings.additionPosition-12;
                                if (newLeft > rightEdge) {
                                    newLeft = rightEdge;
                                };
                                if (newLeft < 0) {
                                    newLeft = 0;
                                };
                                settings.thumbPosition = newLeft;
                            } else if (pointer.is(rsThumb1) && (settings.additionValue == undefined)) {
                                rightEdge = rsBase.width() - pointer.width();
                                if (newLeft > rightEdge) {
                                    newLeft = rightEdge;
                                };
                                if (newLeft < 0) {
                                    newLeft = 0;
                                };
                                settings.thumbPosition = newLeft;
                            } else if (pointer.is(rsThumb2)) {
                                rightEdge = rsBase.width() - pointer.width();
                                if (newLeft > rightEdge) {
                                    newLeft = rightEdge;
                                };
                                if (newLeft < settings.thumbPosition + 12) {
                                    newLeft = settings.thumbPosition + 12;
                                };
                                settings.additionPosition = newLeft;
                            }

                            



                            pointer.css("left", newLeft + "px");

                        }

                        $(document).on("mousemove", move)
                    } else return
                }
                function drop() {
                    $(document).unbind("mousemove");
                    console.log(settings.thumbPosition);
                    console.log(settings.additionPosition)
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
    thumbValue: 5000,
    additionValue: 10000,
    display: true,
    min: 0,
    max: 15000,
})
