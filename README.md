# spamguard.js

Origine : https://github.com/madeinhamburg/spamguard.js

Ajout de : 
 *  data-protocol="" sur data-number : whatsapp / tel / sms
 *  data-sgalign="" : alignement pour affichage selon CSS justify-content


### Usage
```javascript
spamguard(selector);
```

```html
<a href="#" class="obfuscate-it" data-name="mark" data-domain="gmail" data-tld="com" data-mailto="true"></a>
<script>
	spamguard(".obfuscate-it");
</script>
```

### Options
| Attribute | Type | Default | Description |
|---|---|---|---|
| `data-name` | `string` | | Everything before the `@` of your email address |
| `data-domain` | `string` | | Domain name without extension |
| `data-tld` | `string` | | Extension without `.` |
| `data-salt` | `string` | | Additional characters for confusion, which are removed |
| `data-number` | `string` | | You can add letters and special characters for obfuscation (see example) |
| `data-mailto` | `boolean` | false | Creates a `mailto:`-link |
| `data-content` | `boolean` | false | When `true`, your own content will be kept. Otherwise it returns the email address. |
| `data-subject` | `string` | | Set a custom subject for `mailto:`-link |
| `data-message` | `string` | | Set a custom message for `mailto:`-link |
| `data-text` | `string` | | Obfuscate a custom string |
| `data-protocol` | `string` | tel | On number : whatsapp, tel, sms  |
| `data-sgalign` | `string` | center | justify-content |

### Example with custom content

```html
<a href="#" class="obfuscate-it" data-name="mark" data-domain="gmail" data-tld="com" data-mailto="true" data-content="true">
	<i class="fa fa-heart"></i>
</a>
<script>
	spamguard(".obfuscate-it");
</script>
```

### Example with phone number

```html
<a href="#" class="obfuscate-it" data-number="_+1 $&80=8 :555;; 01-))23" data-salt="§$%&/()=_:;.-[]" data-mailto="true"></a>
<script>
	spamguard(".obfuscate-it");
</script>
```

### Example with a custom text

```html
<span class="obfuscate-it" data-text="H$e__l-[l].o ::W=o)r%&%ld.!" data-salt="§$%&/()=_:;.-[]"></span>
<script>
	spamguard(".obfuscate-it");
</script>
```
