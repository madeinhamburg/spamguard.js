/*!
 *  jQuery Spam Guard v2.0.1
 *  https://github.com/madeinhamburg/jquery-spamguard
 */

(function($){
	$.fn.spamguard = function($options){
		var $defaults = {
			protect: "email",
			sethref: true,
			content: false,
			noindex: true,
		};

		var $o = $.extend({}, $defaults, $options);

		var $characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!'§$=?`´€~[]|*#-_.,;:@+/";


		return this.each(function(){
			var $content = $(this).html(),
				$href = null;

			$decoded = "";
		    for(i=0; i < $content.length; i++){
				$prevChar = $content[i-1];
				$thisChar = $content[i];
				if($.inArray($thisChar, $characters.split("")) !== -1){
					if($prevChar === "\\"){
						$decoded = $decoded + $thisChar;
					}
				}
				else{
					if($thisChar !== "\\"){
						$decoded = $decoded + $thisChar;
					}
				}
		    }
			$content = $decoded;


			if($o.protect === "telephone" || $o.protect === "tel" || $o.protect === "tele"){
				$content	= $content.replace(/[^0-9 \+\/\(\)\-\.]+/g, "");
				$href 		= "tel:"+ $content.replace(/[^0-9\+]+/g, "");
			}
			if($o.protect === "email" || $o.protect === "mail"){
				$href 		= "mailto:"+ $content;
			}

			if($(this).is("a") && $o.sethref === true && $href !== null){
				$(this).attr("href", $href);
			}


			if($o.content !== false){
				if($o.noindex === true){
					$o.content 	= "<!--noindex--><!--googleoff: all-->"+ $o.content +"<!--googleon: all--><!--/noindex-->";
				}
				$(this).html($o.content);
			}
			else{
				if($o.noindex === true){
					$content 	= "<!--noindex--><!--googleoff: all-->"+ $content +"<!--googleon: all--><!--/noindex-->";
				}
				$(this).html($content);
			}
		});
	};



	$.spamguardEncode = function($string, $options){
		var $o = $.extend({}, {}, $options);

		var $characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!'§$=?`´€~[]|*#-_.,;:@+/";

		var $return = "";
		for(var i=0; i < $string.length; i++){
			var $s = $string[i];

			for(var j=0; j < $characters.length; j++){
				$s = $s.replace($characters[j], "\\"+ $characters[j]);
			}

			$return += $s;
			$return += $.spamguardRandomString($characters);
		}

		return $return;
	};

	$.spamguardRandomNum = function($min, $max){
		return Math.floor(Math.random() * ($max - $min + 1) + $min);
	};

	$.spamguardRandomString = function($characters){
		var $string = "";
		for(var i=0; i < $.spamguardRandomNum(0, 3); i++){
			var $pos = $.spamguardRandomNum(0, $characters.length);
			$string += $characters.charAt($pos, $pos+1);
		}
		return $string;
	};
})(jQuery);
