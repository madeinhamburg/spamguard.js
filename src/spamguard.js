/*!
 *  @name v@version
 *  @description
 *  @homepage
 *  Licensed under the @license license.
 */

(function($) {
	$.fn.spamguard = function() {
		var $$newId = (function($length) {
			var $characters = "abcdefghijklmnopqrstuvwxyz0123456789",
				$string = "";

			for (var i = 0; i < $length; i++) {
				$string += $characters.charAt(Math.floor(Math.random() * $characters.length));
			}

			return $string;
		});

		var $$convertIt = (function($string, $t) {
			var $response = "";
			for (i = 0; i < $string.length; i++) {
				if ($t == "hex") {
					$response += "&#x" + $string.charCodeAt(i).toString(16) + ";";
				} else {
					$response += "\\" + $string.charCodeAt(i).toString(16);
				}
			}

			return $response;
		});



		return $(this).each(function() {
			var $className = "spamguard-" + $$newId(12);

			var $value = "";

			if (typeof($(this).data("name")) !== "undefined") {
				$value += $(this).data("name");
			}
			if (typeof($(this).data("domain")) !== "undefined") {
				$value += "@" + $(this).data("domain");
			}
			if (typeof($(this).data("tld")) !== "undefined") {
				$value += "." + $(this).data("tld");
			}
			if (typeof($(this).data("number")) !== "undefined") {
				$value = $(this).data("number").replace(/([^0-9 \+\(\)\-])+/g, "");
			}

			var $valuerRversed = $value.split("").reverse().join("");

			var $mailto = (typeof($(this).data("mailto")) !== "undefined" && $(this).data("mailto") !== "" && $(this).data("mailto") != "false") ? true : false;
			var $content = (typeof($(this).data("content")) !== "undefined" && $(this).data("content") !== "" && $(this).data("content") != "false") ? true : false;

			var $subject = (typeof($(this).data("subject")) !== "undefined" && $(this).data("subject") !== "" && $(this).data("subject") != "false") ? $(this).data("subject") : false;
			var $message = (typeof($(this).data("message")) !== "undefined" && $(this).data("message") !== "" && $(this).data("message") != "false") ? $(this).data("message") : false;


			if ($content == false) {
				$("head").append("<style>." + $className + ":after{content:\"" + $$convertIt($valuerRversed) + "\"}</style>");

				$(this).css({
					"direction": "rtl",
					"unicode-bidi": "bidi-override",
					"text-align": "left",
				});

				$(this).addClass($className).html("");
			}


			if ($mailto == true) {
				$(this).on("click", function(e) {
					e.preventDefault();

					if (typeof($(this).data("number")) !== "undefined") {
						var $href = "t";
						$href += "el:" + $value.replace(/([^0-9\+])+/g, "");
					} else {
						var $href = "mai";
						$href += "lto:" + $value + "?";

						if ($subject != false) {
							$href += "&subject=" + encodeURIComponent($subject);
						}
						if ($message != false) {
							$href += "&body=" + encodeURIComponent($message);
						}
					}

					window.location.href = $href;
					return;
				});
			}
		});
	};
})(jQuery);
