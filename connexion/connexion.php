<html>
	<head>
	<title>Connexion</title>
		
	<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
	<!-- load myScript -->
	<script src="script.js"></script>
	
	<!-- load Css -->
	<link rel="stylesheet" href="style.css">
	<link rel="stylesheet" href="animate.css">
	
	</head>
	<body>

		<div class="container animated fadeInRight">
		  <div class="card"></div>
		  <div class="card">
			<h1 class="title">Login</h1>
			<div class="checkmark" style='display:none;'></div>
			<form id='formlogin'>
			  <div class="input-container">
				<input type="password" id="Password" required="required"/>
				<label for="Password">Password</label>
				<div class="bar"></div>
			  </div>
			  <div class="button-container">
				<button id="go"><span>Go</span></button>
			  </div>
			</form>
		  </div>
		</div>
	</body>
</html>