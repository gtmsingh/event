<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="../event.js"></script>
	<script src="jquery.js"></script>
</head>
<body>
	<div onclick="alert('propagated');">
		<button id="check">Check</button>
		<a href="https://www.github.com/gtmsingh" id="link">By handler</a>
		<a href="https://www.about.me/gtmsingh" id="event-link">By event</a>
	</div>
	<script>
		var x = event.Event('login');
		x.addHandler(function() {
			console.log('called login event');
		})
		.addHandler(function() {
			console.log('after first call');
		});

		$('#check').on('click', new event.Trigger('login'));
		setTimeout(function() {
			console.log('added more');
			event.Event('login').addHandler(function() {
				console.log('there again');
			});
		}, 5000);

		event.Event('link').addHandler(function() {
			console.log('tried stopping redirect');
		}, {
			stopPropagation: true,
			preventDefault: true
		});

		$('#link').on('click', new event.Trigger('link'));
	</script>
</body>
</html>