/*
 *  jQuery Spam Guard v1.3
 *
 * 		Example I:
 *			<a href="#" class="replace-me">MMm="ar$5Lk{{at}}(EUg%ma~iPl#~.NcEoTm</a>
 *			<script> $(".replace-me").spamguard({ protect: "email" }); </script>
 *		Turns into:
 *			<a href="mailto:mark@gmail.com" class="replace-me">mark@gmail.com</a>
 *
 * 		Example II:
 *			<a href="#" class="replace-me">+4$9_(0"4e0') 0=&_3#0 02%0 0{1~0</a>
 *			<script> $(".replace-me").spamguard({ protect: "telephone" }); </script>
 *		Turns into:
 *			<a href="tel:+4940300200100" class="replace-me">+49 (040) 030 020 010</a>
 *
 *
 *
 * 		Helper:
 *			<script> document.write( $.spamguardEncode("mark@gmail.com") ); </script>
 *
 */

(function($){
	$.fn.spamguard = function($options){
		var $defaults = {
			protect: "email",
			setHref: true,
			content: false,
			noindex: true,
		};

		var $o = $.extend({}, $defaults, $options);

		return this.each(function(){
			var $content = $(this).html(),
				$href = null;

			if($o.protect === "telephone" || $o.protect === "tel"){
				$content 	= $content.replace(/{{plus}}/gi, "+");
				$content 	= $content.replace(/[^0-9 \+\/()]+/g, "");
				$href 		= "tel:"+$content.replace(/[^0-9\+]+/g, "");
			}
			else{ // email
				$content 	= $content.replace(/{{at}}/gi, "@");
				$content 	= $content.replace(/{{dot}}/gi, "@");
				$content 	= $content.replace(/[^a-z0-9.@_-]+/g, "");
				$href 		= "mailto:"+$content;
			}

			if($(this).is("a") && $o.setHref === true && $href !== null){
				$(this).attr("href", $href);
			}


			if($o.content !== false){
				if($o.noindex === true){
					$o.content = "<!--noindex--><!--googleoff: all-->"+$o.content+"<!--googleon: all--><!--/noindex-->";
				}
				$(this).html($o.content);
			}
			else{
				if($o.noindex === true){
					$content = "<!--noindex--><!--googleoff: all-->"+$content+"<!--googleon: all--><!--/noindex-->";
				}
				$(this).html($content);
			}
		});
	};



	$.spamguardRandomNum = function($min, $max){
		return Math.floor(Math.random() * ($max - $min + 1) + $min);
	};

	$.spamguardRandomString = function($characters){
		var $string = "";
		for(var i=0; i < $.spamguardRandomNum(0, 4); i++){
			var $pos = $.spamguardRandomNum(0, $characters.length);
			$string += $characters.charAt($pos, $pos+1);
		}
		return $string;
	};

	$.spamguardEncode = function($string, $options){
		var $defaults = {
			characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZÖÄÜ;:!'§${}=?`´€~[]|*#",
		};

		var $o = $.extend({}, $defaults, $options);

		var $return = "";
		for(var i=0; i < $string.length; i++){
			$return += $string[i];
			$return += $.spamguardRandomString($o.characters);
		}

		return $return;
	};
})(jQuery);
