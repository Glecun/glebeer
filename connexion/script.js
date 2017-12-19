$(document).ready(function() {
  $('#formlogin').on('submit', function(e){
	e.preventDefault(); 
	var mdp=$( "#Password" ).val();
	$.ajax({
			url : "check.php",
			cache:false,
			data : {"mdp" : mdp} ,
			dataType : "json",
			type : "GET",
			success: function(response){
					if(response!='0'){
						$('.checkmark').show();
						setTimeout(function(){
						  window.location.replace(response);
						}, 3000);

					} else {
						alert('Mot de passe incorrect');
					}
			}
	});
  });
});