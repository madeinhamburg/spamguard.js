# jQuery Spam Guard





### Installation
```bash
npm install jquery-spamguard
yarn add jquery-spamguard
```





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

[Demo](https://madeinhamburg.github.io/jquery-spamguard/example/index.html)





### Options
| Attribute | Type | Default | Description |
|---|---|---|---|
| `data-name` | `string` | | Everything before the `@` of your email address |
| `data-domain` | `string` | | Domain name without extension |
| `data-tld` | `string` | | Extension without `.` |
| `data-number` | `string` | | You can add letters and special characters for obfuscation (see example) |
| `data-mailto` | `boolean` | false | Creates a `mailto:`-link |
| `data-content` | `boolean` | false | When `true`, your own content will be kept. Otherwise it returns the email address. |
| `data-subject` | `string` | | Set a custom subject for `mailto:`-link |
| `data-message` | `string` | | Set a custom message for `mailto:`-link |
|---|---|---|---|
| `data-text` | `string` | |   |
| `data-remove-this` | `string` | |   |





### Example with custom content

```html
<a href="#" class="protect-me" data-name="mark" data-domain="gmail" data-tld="com" data-content="true" data-mailto="true">
   <i class="fa fa-heart"></i>
</a>
<script>
   $(".protect-me").spamguard();
</script>
```



### Example with phone number

```html
<a href="#" class="protect-me" data-number="_+1 %&80#8 !555;; 01qY@@23" data-mailto="true"></a>
<script>
   $(".protect-me").spamguard();
</script>
```



### Example with a custom text

```html
<a href="#" class="protect-me" data-text="H$e__l-[l].o ::W=o)r%&%ld.!" data-remove-this="§$%&/()=_:;.-[]"></a>
<script>
   $(".protect-me").spamguard();
</script>
```
