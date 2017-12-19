<?php session_start(); ?>
<?php include "connexion/islogged.php"; ?>
<html>
	<?php include "template.php"; ?>
	
	<div class="loader" style="display:none;">
		<div class="centre">
			<div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
		</div>
	</div>
	
	<div class="content"></div>

	</body>

</html>