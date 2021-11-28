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
		$cssTextNode = "",
		$elements = document.querySelectorAll($selector);


	for (var i = 0; i < $elements.length; i++) {
		var $el = $elements[i],
			$value,
			$cssClassname = "spamguard-" + (Math.floor(Math.random() * 999999) + 100000),
			$mailto = (typeof($el.getAttribute("data-mailto")) === "string" && $el.getAttribute("data-mailto") !== "" && $el.getAttribute("data-mailto") != "false") ? true : false,
			$content = (typeof($el.getAttribute("data-content")) === "string" && $el.getAttribute("data-content") !== "" && $el.getAttribute("data-content") != "false") ? true : false;


		if ($content == false) {
			$el.innerHTML = "";
			$el.classList.add($cssClassname);

			if (typeof($el.getAttribute("data-name")) === "string" && typeof($el.getAttribute("data-domain")) === "string" && typeof($el.getAttribute("data-tld")) === "string") {
				$value = $el.getAttribute("data-name") + "@" + $el.getAttribute("data-domain") + "." + $el.getAttribute("data-tld");
			}

			if (typeof($el.getAttribute("data-number")) === "string") {
				$value = $el.getAttribute("data-number").replace(/([^0-9 \+\(\)\-])+/g, "");
			}

			if (typeof($el.getAttribute("data-text")) === "string" && typeof($el.getAttribute("data-salt")) === "string") {
				$value = $el.getAttribute("data-text");
				for (i = 0; i < $el.getAttribute("data-salt").length; i++) {
					$value = $value.replace(new RegExp("\\" + $el.getAttribute("data-salt")[i], "g"), "");
				}
			}

			var $valuerRversed = $value.split("").reverse().join("");


			$valuerRversed.split("").forEach(function($v, n) {
				$el.innerHTML += "<span>" + ($v == " " ? "&nbsp;" : "") + "</span>";
				$cssTextNode += "." + $cssClassname + " span:nth-child(" + (n + 1) + "):after{content:\"" + converter($v) + "\"}";
			});

			$cssTextNode += "." + $cssClassname + "{display:flex!important;flex-flow:row-reverse;flex-wrap:wrap-reverse;justify-content: flex-end;}";
		}


		if ($mailto == true) {
			$el.addEventListener("click", function(e) {
				e.preventDefault();

				if (typeof(this.getAttribute("data-name")) === "string" && typeof(this.getAttribute("data-domain")) === "string" && typeof(this.getAttribute("data-tld")) === "string") {
					var $href = "mailto:" +
						this.getAttribute("data-name") +
						"@" + this.getAttribute("data-domain") +
						"." + this.getAttribute("data-tld") +
						"?";

					if (typeof(this.getAttribute("data-subject")) === "string" && this.getAttribute("data-subject") !== "" && this.getAttribute("data-subject") != "false") {
						$href += "&subject=" + encodeURIComponent(this.getAttribute("data-subject"));
					}
					if (typeof(this.getAttribute("data-message")) === "string" && this.getAttribute("data-message") !== "" && this.getAttribute("data-message") != "false") {
						$href += "&body=" + encodeURIComponent(this.getAttribute("data-message"));
					}
				}

				if (typeof(this.getAttribute("data-number")) === "string") {
					var $href = "tel:" + this.getAttribute("data-number").replace(/([^0-9\+])+/g, "");
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
