# Cách dùng

### Thêm script này vào thẻ ```<head></head>```

```
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/hunghg255/parallax-scroll@v1.0/parallax-scroll.min.js"></script>
```

### Thêm 1 số data-attribute

- Bắt buộc có: **data-parallax-scroll** . Thêm data này để query đến element đó.
- data-direction: **vertical** hoặc **herozional**. Mặc định là **vertical**
- data-rotate: *boolean*. Mặc định là false. Xoay element khi scroll
- data-speed: *number*. Mặc định là 4. Tốc độ thay đổi vị trí element

```html
<div data-parallax-scroll data-direction="horizontal" data-speed="4">

</div>
```
