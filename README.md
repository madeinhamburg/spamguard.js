# jQuery Spam Guard





### Usage
```javascript
$(selector).spamguard();
```

```html
<script src="https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery-spamguard/dist/jquery.spamguard.js"></script>

<a href="#" class="protect-me" data-name="mark" data-domain="gmail" data-tld="com"></a>

<script>
   $(function(){
      $(".protect-me").spamguard();
   });
</script>
```

[Demo](https://htmlpreview.github.io/?https://github.com/philippgithub/jquery-spamguard/blob/master/example/index.html)





### Options
| Attribute | Type | Default | Description |
|---|---|---|---|
| `data-name` | `string` | | Everything before the `@` of your email address |
| `data-domain` | `string` | | Domain name without extension |
| `data-tld` | `string` | | Extension without `.` |
| `data-mailto` | `boolean` | false | Creates a `mailto:`-link |
| `data-content` | `boolean` | false | When `true`, your own content will be kept. Otherwise it returns the email address. |
| `data-subject` | `string` | | Set a custom subject for `mailto:`-link |
| `data-message` | `string` | | Set a custom message for `mailto:`-link |





### Example with custom content

```html
<a href="#" class="protect-me" data-name="mark" data-domain="gmail" data-tld="com" data-content="true" data-mailto="true">
   <i class="fa fa-heart"></i>
</a>
<script>
	$(".protect-me").spamguard();
</script>
```
