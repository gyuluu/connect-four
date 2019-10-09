(function() {
    var currentPlayer = "player1";
    var column = $(".column");

    var func = function(e) {
        var slotsInColumn = $(e.currentTarget).find(".slot");
        var slotHover = slotsInColumn.siblings(".slot-hover");
        var holeHover = slotHover.find(".hole-hover");

        for (var i = 5; i >= 0; i--) {
            var slotInColumn = slotsInColumn.eq(i);
            if (
                !slotInColumn.hasClass("player1") &&
                !slotInColumn.hasClass("player2")
            ) {
                slotInColumn.addClass(currentPlayer);
                if (currentPlayer == "player1") {
                    holeHover.removeClass("hover-red");
                    holeHover.addClass("hover-yellow");
                } else {
                    holeHover.removeClass("hover-yellow");
                    holeHover.addClass("hover-red");
                }
                break;
            }
        }

        if (i == -1) {
            return;
        }

        if (checkForVictory(slotsInColumn)) {
            if (currentPlayer == "player1") {
                setTimeout(animate, 1100);
                setTimeout(function() {
                    $("#winner-red").addClass("on");
                }, 1300);
            } else {
                setTimeout(animate, 1100);
                setTimeout(function() {
                    $("#winner-yellow").addClass("on");
                }, 1300);
            }
        } else if (checkForVictory($(".row" + i))) {
            if (currentPlayer == "player1") {
                setTimeout(animate, 1100);
                setTimeout(function() {
                    $("#winner-red").addClass("on");
                }, 1300);
            } else {
                setTimeout(animate, 1100);
                setTimeout(function() {
                    $("#winner-yellow").addClass("on");
                }, 1300);
            }
        } else {
            for (var k = 0; k < column.length; k++) {
                var bool = false;
                for (var l = 0; l <= 5; l++) {
                    if (
                        column
                            .eq(k)
                            .find(".row" + l)
                            .hasClass(currentPlayer) &&
                        column
                            .eq(k + 1)
                            .find(".row" + (l + 1))
                            .hasClass(currentPlayer) &&
                        column
                            .eq(k + 2)
                            .find(".row" + (l + 2))
                            .hasClass(currentPlayer) &&
                        column
                            .eq(k + 3)
                            .find(".row" + (l + 3))
                            .hasClass(currentPlayer)
                    ) {
                        bool = true;
                        column
                            .eq(k)
                            .find(".row" + l)
                            .addClass("slot-win");
                        column
                            .eq(k + 1)
                            .find(".row" + (l + 1))
                            .addClass("slot-win");
                        column
                            .eq(k + 2)
                            .find(".row" + (l + 2))
                            .addClass("slot-win");
                        column
                            .eq(k + 3)
                            .find(".row" + (l + 3))
                            .addClass("slot-win");
                        if (bool == true && currentPlayer == "player1") {
                            setTimeout(animate, 1100);
                            setTimeout(function() {
                                $("#winner-red").addClass("on");
                            }, 1300);
                        } else {
                            setTimeout(animate, 1100);
                            setTimeout(function() {
                                $("#winner-yellow").addClass("on");
                            }, 1300);
                        }
                    }
                }

                for (var l = 0; l <= 5; l++) {
                    if (
                        column
                            .eq(k)
                            .find(".row" + l)
                            .hasClass(currentPlayer) &&
                        column
                            .eq(k + 1)
                            .find(".row" + (l - 1))
                            .hasClass(currentPlayer) &&
                        column
                            .eq(k + 2)
                            .find(".row" + (l - 2))
                            .hasClass(currentPlayer) &&
                        column
                            .eq(k + 3)
                            .find(".row" + (l - 3))
                            .hasClass(currentPlayer)
                    ) {
                        bool = true;
                        column
                            .eq(k)
                            .find(".row" + l)
                            .addClass("slot-win");
                        column
                            .eq(k + 1)
                            .find(".row" + (l - 1))
                            .addClass("slot-win");
                        column
                            .eq(k + 2)
                            .find(".row" + (l - 2))
                            .addClass("slot-win");
                        column
                            .eq(k + 3)
                            .find(".row" + (l - 3))
                            .addClass("slot-win");
                        if (bool == true && currentPlayer == "player1") {
                            setTimeout(animate, 1100);
                            setTimeout(function() {
                                $("#winner-red").addClass("on");
                            }, 1300);
                        } else {
                            setTimeout(animate, 1100);
                            setTimeout(function() {
                                $("#winner-yellow").addClass("on");
                            }, 1300);
                        }
                    }
                }
            }
        }

        switchPlayers();
    };

    column.on("click", func);

    $(".button").on("click", function() {
        $(".hole").removeClass("anim");
        $("#winner-red").removeClass("on");
        $("#winner-yellow").removeClass("on");
        $(".slot").removeClass("slot-win");
        column.on("click", func);
        currentPlayer = "player1";
    });

    function switchPlayers() {
        if (currentPlayer == "player1") {
            currentPlayer = "player2";
        } else {
            currentPlayer = "player1";
        }
    }

    function checkForVictory(slots) {
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                if (count == 4) {
                    slots.eq(i).addClass("slot-win");
                    slots.eq(i - 1).addClass("slot-win");
                    slots.eq(i - 2).addClass("slot-win");
                    slots.eq(i - 3).addClass("slot-win");
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    function animate() {
        $(".slot").removeClass("player1");
        $(".slot").removeClass("player2");
        $(".hole-hover").removeClass("hover-red");
        $(".hole-hover").removeClass("hover-yellow");
        $(".hole").addClass("anim");
        column.off("click", func);
    }

    $(".slot").mouseover(function(e) {
        var slotHover = $(e.target).siblings(".slot-hover");
        var holeHover = slotHover.find(".hole-hover");
        if (currentPlayer == "player1") {
            holeHover.addClass("hover-red");
        } else {
            holeHover.addClass("hover-yellow");
        }
    });

    column.mouseleave(function() {
        $(".hole-hover").removeClass("hover-red");
        $(".hole-hover").removeClass("hover-yellow");
    });
})();
