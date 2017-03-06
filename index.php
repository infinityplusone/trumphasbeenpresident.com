<!DOCTYPE html>
<html>
	<head>
		<title>Trump has been President for...</title>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<?php $root = preg_replace('/^\/(.*)$/i', "/$1", str_ireplace('/index.php', '', $_SERVER["PHP_SELF"])); ?>
		<link rel="stylesheet" href="<?=$root?>/assets/thbp.css">
	</head>
	<body class="page page__index" data-page="index">
		<div id="counter">
			<h1><strong>Donald Trump</strong> has been</h1>
			<h1><strong class="potus">President of the United States</strong></h1>
			<div class="counter"></div>
			<h1 class="percent"></h1>
			<form action="#" method="post">
				<input type="hidden" id="domain" value="<?=$root?>/">
				<input type="text" id="new-adjectives" placeholder="How would you describe it?">
			</form>
		</div>
		<script src="<?=$root?>/bower_components/jquery/dist/jquery.min.js"></script>
		<script src="<?=$root?>/bower_components/moment/min/moment.min.js"></script>
		<script src="<?=$root?>/bower_components/handlebars/handlebars.min.js"></script>
		<script type="text/x-handlebars-template" data-template-id="counter" id="template-counter">
			<div class="counter">
				{{#each counter}}
					{{#if this}}
						<div class="time-row time-row--{{@key}}">
							<span class="time-key">{{this}}</span>
							<span class="time-value">{{pluralize this @key}}</span>
						</div>
					{{/if}}
				{{/each}}
			</div>
		</script>
		<script type="text/x-handlebars-template" data-template-id="percent" id="template-percent">
			<h1 class="counter-percent">In other words, we are just <strong>{{percent}}%</strong> of our way through this
				<strong class="adjective">{{adj}}</strong> presidency.</h1>
		</script>
		<script src="<?=$root?>/common/thbp/thbp.js"></script>
	</body>
</html>