# jQuery Spam Guard






### Example I

```html
<a href="#" class="replace-me">MMm="ar$5Lk{{at}}(EUg%ma~iPl#~.NcEoTm</a>
<script>
	$(".replace-me").spamguard();
</script>
```
Turns into
```html
<a href="mailto:mark@gmail.com" class="replace-me">mark@gmail.com</a>
```



### Example II

```html
<a href="#" class="replace-me">MMm="ar$5Lk{{at}}(EUg%ma~iPl#~.NcEoTm</a>
<script>
	$(".replace-me").spamguard({ content: '<i class="fa fa-heart"></i>' });
</script>
```
Turns into
```html
<a href="mailto:mark@gmail.com" class="replace-me"><i class="fa fa-heart"></i></a>
```



### Example III

```html
<a href="#" class="replace-me">+4$9_(0"4e0') 0=&_3#0 02%0 0{1~0</a>
<script>
	$(".replace-me").spamguard({ protect: "telephone" });
</script>
```
Turns into
```html
<a href="tel:+4940300200100" class="replace-me">+49 (040) 030 020 010</a>
```


___



### Helper

```html
<script>
	document.write( $.spamguardEncode("mark@gmail.com") );
</script>
```
Shows you something like
```
m**Jar´k@gB}maPi'l.cÄIoTPm#V
```
