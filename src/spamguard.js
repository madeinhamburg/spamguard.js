/*!
 *  jQuery Spam Guard v1.0
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
 */

(function($){
	$.fn.spamguard = function($options){
		$defaults = {
			protect: "email",
			setHref: true,
		};

		var $o = $.extend({}, $defaults, $options);

		return this.each(function(){
			var $content = $(this).html(),
				$href = null;

			if($o.protect == "telephone" || $o.protect == "tel"){
				$content 	= $content.replace(/[^0-9 \+\/()]+/g, "");
				$href 		= "tel:"+$content.replace(/[^0-9\+]+/g, "");
			}
			else{ // email
				$content 	= $content.replace(/{{at}}/gi, "@");
				$content 	= $content.replace(/[^a-z.@_-]+/g, "");
				$href 		= "mailto:"+$content;
			}

			if($(this).is("a") && $o.setHref == true && $href != null){
				$(this).attr("href", $href);
			}
		});
	};
})(jQuery);
