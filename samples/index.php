<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="../event.js"></script>
	<script src="jquery.js"></script>
</head>
<body>
	<button id="check">Check</button>
	<script>
		var x = event.Event('login');
		x.addHandler('login', function() {
			console.log('called login event');
		})
		.addHandler('login', function() {
			console.log('after first call');
		});

		$('#check').on('click', new event.Trigger('login'));
		setTimeout(function() {
			console.log('added more');
			event.Event('login').addHandler('login', function() {
				console.log('there again');
			});
		}, 5000);
	</script>
</body>
</html>