/*!
 *  @name v@version
 *  @description
 *  @homepage
 *  Licensed under the @license license.
 */

function spamguard($selector) {
	var converter = (function($string, $to) {
			var $r = "";
			for (var s = 0; s < $string.length; s++) {
				if ($to == "hex") {
					$r += "&#x" + $string.charCodeAt(s).toString(16) + ";";
				} else {
					$r += "\\" + $string.charCodeAt(s).toString(16);
				}
			}

			return $r;
		}),
		desalt = (function($el, $attr) {
			var $value = $el.getAttribute($attr);

			if (typeof($el.getAttribute("data-salt")) === "string") {
				var $salt = $el.getAttribute("data-salt");
				for (var s = 0; s < $salt.length; s++) {
					if (/^[A-Za-z0-9]$/.test($salt[s])) {
						$value = $value.replace(new RegExp($salt[s], "g"), "");
					} else {
						$value = $value.replace(new RegExp("\\" + $salt[s], "g"), "");
					}
				}
			}

			return $value;
		}),
		$cssTextNode = "",
		$elements = document.querySelectorAll($selector);


	for (var i = 0; i < $elements.length; i++) {
		var $el = $elements[i],
			$value,
			$html = "",
			$cssClassname = "spamguard-" + (Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7)),
			$mailto = (typeof($el.getAttribute("data-mailto")) === "string" && $el.getAttribute("data-mailto") !== "" && $el.getAttribute("data-mailto") != "false") ? true : false,
			$content = (typeof($el.getAttribute("data-content")) === "string" && $el.getAttribute("data-content") !== "" && $el.getAttribute("data-content") != "false") ? true : false;


		if ($content == false) {
			if (typeof($el.getAttribute("data-name")) === "string" && typeof($el.getAttribute("data-domain")) === "string" && typeof($el.getAttribute("data-tld")) === "string") {
				$value = desalt($el, "data-name") + "@" + desalt($el, "data-domain") + "." + desalt($el, "data-tld");
			}

			if (typeof($el.getAttribute("data-number")) === "string") {
				$value = desalt($el, "data-number");
			}

			if (typeof($el.getAttribute("data-text")) === "string" && typeof($el.getAttribute("data-salt")) === "string") {
				$value = desalt($el, "data-text");
			}

			var $valuerRversed = $value.split("").reverse().join("");


			$valuerRversed.split("").forEach(function($v, n) {
				$html += "<span>" + ($v == " " ? "&nbsp;" : "") + "</span>";
				$cssTextNode += "." + $cssClassname + ">span span:nth-child(" + (n + 1) + "):after{content:\"" + converter($v) + "\"}";
			});

			$el.innerHTML = "<span>" + $html + "</span>";
			$el.classList.add($cssClassname);
			$cssTextNode += "." + $cssClassname + ">span{display:flex!important;flex-flow:row-reverse;flex-wrap:wrap-reverse;justify-content: flex-end;}";
		}


		if ($mailto == true) {
			$el.addEventListener("click", function(e) {
				e.preventDefault();

				if (typeof(this.getAttribute("data-name")) === "string" && typeof(this.getAttribute("data-domain")) === "string" && typeof(this.getAttribute("data-tld")) === "string") {
					var $href = "mailto:" +
						desalt(this, "data-name") +
						"@" + desalt(this, "data-domain") +
						"." + desalt(this, "data-tld") +
						"?";

					if (typeof(this.getAttribute("data-subject")) === "string" && this.getAttribute("data-subject") !== "" && this.getAttribute("data-subject") != "false") {
						$href += "&subject=" + encodeURIComponent(this.getAttribute("data-subject"));
					}
					if (typeof(this.getAttribute("data-message")) === "string" && this.getAttribute("data-message") !== "" && this.getAttribute("data-message") != "false") {
						$href += "&body=" + encodeURIComponent(this.getAttribute("data-message"));
					}
				}

				if (typeof(this.getAttribute("data-number")) === "string") {
					var $href = "tel:" + desalt(this, "data-number");
				}

				if ($href) {
					window.location.href = $href;
				}
			}, false);
		}
	}


	if ($cssTextNode) {
		var $styleEl = document.createElement("style");
		$styleEl.appendChild(document.createTextNode($cssTextNode));
		document.getElementsByTagName("body")[0].appendChild($styleEl);
	}
}
