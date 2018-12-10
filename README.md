# jQuery Spam Guard



### Usage
```javascript
$(selector).spamguard(options);

$("div").spamguard({ protect: "email" });
```
[Demo](https://htmlpreview.github.io/?https://github.com/philippgithub/jquery-spamguard/blob/master/example/index.html)



### Options
| Property | Default | Description |
|---|---|---|
| `protect` | 'email' (string) | email or telephone |
| `sethref` | true (boolean)  | set `href=""` if it's an `a`-tag |
| `content` | false (boolean) | `false` *(boolean)* or a custom *string* (see Example II) |
| `noindex` | true (boolean) | prepend `<!--noindex--><!--googleoff: all-->` |



### Example I

```html
<a href="#" class="replace-me">m~a_=r|QUkU\@gYIQma´#Xi§l/\.´coHm~*</a>
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
<a href="#" class="replace-me">m~a_=r|QUkU\@gYIQma´#Xi§l/\.´coHm~*</a>
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
<a href="#" class="replace-me">\+|-1 (20@2);E BO12!3'\-4_S56][7JVZ</a>
<script>
	$(".replace-me").spamguard({ protect: "telephone" });
</script>
```
Turns into
```html
<a href="tel:+12021234567" class="replace-me">+1 (202) 123-4567</a>
```



### Example IV

```html
<span class="replace-me">m~a_=r|QUkU\@gYIQma´#Xi§l/\.´coHm~*</span>
<script>
	$(".replace-me").spamguard();
</script>
```
Turns into
```html
<span class="replace-me">mark@gmail.com</span>
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
m~a_=r|QUkU\@gYIQma´#Xi§l/\.´coHm~*
```
