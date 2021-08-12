<?php session_start(); ?>
<?php include "../connexion/islogged.php"; ?>
<html>
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
		<link rel="stylesheet" href="../import/material-with-search.css" />
		<link rel="stylesheet" href="../ressources/css/animate.css">
		<link rel="stylesheet" href="../ressources/css/style.css">
		<link rel="stylesheet" href="../ressources/css/newBiere.css">

		<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
		<script src="../import/material-with-search.js"></script> 
		<script src="../ressources/js/scriptNew.js"></script>
	
		<link rel="icon" type="image/jpg" href="../ressources/img/icon.PNG">
		<title>GleBeer</title>
	</head>
	<body>
		<div class="spacer"></div>
		<div class="menu">
			<div class="first">
				<i class="fa fa-beer"></i>
			</div>
			<span class="title-new">Nouvelle Bière</span>
		</div>
	
		<div class="card-new card-search-new mdl-shadow--2dp animated fadeInRight">
			<form class='form-search-new'>
		  		<div class="search mdl-textfield mdl-js-textfield">
					<label class="mdl-button mdl-js-button mdl-button--icon" for="sample6">
                        <button class="button-search">
					        <i class="material-icons">search</i>
                        </button>
					</label>
                    <input class="mdl-textfield__input" type="text" id="sample6">
				</div>
			</form>
            <div class="search-web">
                <a id="search-web-a" href="" target="_blank" class="mdl-button mdl-js-button mdl-button--icon">
                    <i class="material-icons">web</i>
                </a>
            </div>
		 </div>

		<div class="card-new card-result-new mdl-shadow--2dp animated bounceIn"></div>

        <div class="card-new card-form-new mdl-shadow--2dp animated fadeInRight">
            <img id="imgfill"/>
			<form class='form-save-new'>
				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="text" id="name">
					<label class="mdl-textfield__label" for="name">Nom</label>
				</div>
				<div id="div-color" class="mdl-search mdl-js-search mdl-textfield mdl-textfield--floating-label" search="demo_search__search" submit="demo_search__submit" debounce="100">
				  <input id="color" class="mdl-search__input mdl-textfield__input" type="text">
				  <label class="mdl-textfield__label" for="color">Couleur</label>
				  <ul class="mdl-search__dropdown"></ul>
				</div>
				<div id="div-variete" class="mdl-search mdl-js-search mdl-textfield mdl-textfield--floating-label" search="demo_search__search" submit="demo_search__submit" debounce="100">
				  <input id="variete" class="mdl-search__input mdl-textfield__input" type="text">
				  <label class="mdl-textfield__label" for="variete">Variete</label>
				  <ul class="mdl-search__dropdown"></ul>
				</div>
				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="degre">
					<label class="mdl-textfield__label" for="degre">Degré d'alcool</label>
					<span class="mdl-textfield__error">La valeur doit être un nombre</span>
				</div>
				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="text" id="date">
					<label class="mdl-textfield__label" for="date">Date</label>
				</div>
				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="note">
					<label class="mdl-textfield__label" for="note">Note</label>
					<span class="mdl-textfield__error">La valeur doit être un nombre</span>
				</div>
				<div id="div-country" class="mdl-search mdl-js-search mdl-textfield mdl-textfield--floating-label" search="demo_search__search" submit="demo_search__submit" debounce="100">
				  <input id="country" class="mdl-search__input mdl-textfield__input" type="text">
				  <label class="mdl-textfield__label" for="country">Country</label>
				  <ul class="mdl-search__dropdown"></ul>
				</div>
				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="text" id="description">
					<label class="mdl-textfield__label" for="description">Description</label>
				</div>
				<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
					<input class="mdl-textfield__input" type="text" id="tags">
					<label class="mdl-textfield__label" for="tags">Tags</label>
				</div>
				<div class="input-file">
					<div class="file-upload mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
						<span>Photo Devant</span>
					      	<input type="file" name="photo_front" id="photo_front" class="upload" />
					</div>
		    			<input type="text" class='fileuploadurl' id="fileuploadurl_front" readonly placeholder="">
				</div>
				<div class="input-file">
					<div class="file-upload mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
						<span>Photo Derrière</span>
					      	<input type="file" name="photo_back" id="photo_back" class="upload" />
					</div>
		    			<input type="text" class='fileuploadurl' id="fileuploadurl_back" readonly placeholder="">
				</div>
				<div class='div-button-save'>
					<button class="mdl-button button-save mdl-js-button mdl-button--fab mdl-js-ripple-effect">
				  		<i class="material-icons">done</i>
					</button>
				</div>
			</form>
		</div>

		<div id="toast-ok" class="mdl-js-snackbar mdl-snackbar">
		  <div class="mdl-snackbar__text"></div>
		  <button class="mdl-snackbar__action" type="button"></button>
		</div>

	</body>
</html>
	
