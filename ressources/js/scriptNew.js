// Convert string to camel case
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+|\.)/g, function(match, index) {
        if (/\s+|\./.test(match)) return "";
        return index == 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

function setDateInput() {
    var date = new Date(Date.now());
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    $('#date').val(day + '/' + month + '/' + date.getFullYear());
}


function resetFields(){
    $('#imgfill').attr("src", "").removeClass('fully-loaded');
    $('.form-save-new').trigger('reset');
    $('#name').parent().removeClass('is-dirty');
    $('#color').parent().removeClass('is-dirty');
    $('#variete').parent().removeClass('is-dirty');
    $('#degre').parent().removeClass('is-dirty');
    $('#note').parent().removeClass('is-dirty');
    $('#country').parent().removeClass('is-dirty');
    $('#description').parent().removeClass('is-dirty');
    setDateInput();
}

function getImgFileName() {
    var fileName = camelize($('#name').val() + $('#color').val() + $('#variete').val());
    return fileName.replace(new RegExp("'", 'g'), "");
}

$( document ).ready(function() {
    setDateInput();

    // When search beer
    $(".form-search-new").submit(function(e){
        q=$('.form-search-new input.mdl-textfield__input').val();
        $('div.card-result-new').html('');
        resetFields();
        if (q!=''){
            $('#search-web-a').attr("href", 'http://www.google.com/search?q='+ q);
            // Does the beer already exist ?
            $.ajax({
                url : "../donnees/get_data.php",
                data : {"q" : q, "checkedfiltres" : ""} ,
                dataType : "json",
                type : "GET",
                error    : function(request, error) {
                    alert("Erreur : responseText: "+request.responseText);
                },
                success: function(response){
                    if (response.length>0){
                        $('div.card-result-new').hide();
                        list='';
                        for(var i = 0; i < response.length; i++){
                            list+="<div class='div-item-warn'>";

                            list+="   <i class='icon-warn material-icons'>error</i>";
                            list+="   <span class='span-item-warn'>"+response[i]['nom']+"</span>";
                            if(response[i]['degre']!='')
                                list+="   <span class='span-item-warn'>"+response[i]['degre']+"°</span>";
                            list+="   <span class='span-item-warn'>"+response[i]['couleur']+"</span>";
                            list+="   <span class='span-item-warn'>"+response[i]['variete']+"</span>";
                            list+="   <span class='span-item-warn'>"+response[i]['pays']+"</span>";
                            list+="</div>";
                        }
                        $('div.card-result-new').html(list);
                        setTimeout(function(){
                            $('div.card-result-new').show();
                        }, 1);

                    }
                }
            });

            // Fill the form inputs
            $.ajax({
                url : "../donnees/getInfoBiere.php",
                data : {"name" : q} ,
                dataType : "json",
                type : "GET",
                error    : function(request, error) {
                    alert("Erreur : responseText: "+request.responseText);
                },
                success: function(response){
                    response['name'] !== "" && $('#name').val(response['name']).parent().addClass('is-dirty');
                    response['color'] !== "" && $('#color').val(response['color']).parent().addClass('is-dirty');
                    response['type'] !== "" && $('#variete').val(response['type']).parent().addClass('is-dirty');
                    response['alcohol'] !== "" && $('#degre').val(response['alcohol']).parent().addClass('is-dirty');
                    response['rate'] !== "" && $('#note').val(response['rate']).parent().addClass('is-dirty');
                    response['from'] !== "" && $('#country').val(response['from']).parent().addClass('is-dirty');
                    response['content'] !== "" && $('#description').val(response['content']).parent().addClass('is-dirty');
                    response['img'] !== "" && $('#imgfill').attr("src", response['img']).addClass('fully-loaded');
                }
            });
        }
        return false;
    });

    // When saving beer
    $(".form-save-new").submit(function(e){
        if($('#name').val() === "") return false;

        // Get the values of the inputs
        data2 = {};
        data2["name"] = $('#name').val();
        data2["color"] = $('#color').val();
        data2["type"] = $('#variete').val();
        data2["alcohol"] = $('#degre').val();
        data2["date"] = $('#date').val();
        data2["rate"] = $('#note').val();
        data2["from"] = $('#country').val();
        data2["description"] = $('#description').val();
        data2["photo"] = "";
        if($('#photo_front').prop('files')[0]!=null){
            data2["photo"] = getImgFileName();
        }
        data2["tags"] = $('#tags').val();

        // Save the beer in xml
        $.ajax({
            url : "../donnees/saveBiere.php",
            dataType: "json",
            data: { biere: JSON.stringify(data2) },
            type : "POST",
            error    : function(request, error) {
                alert("Erreur : responseText: "+request.responseText+" "+error);
            },
            success: function(response){
                var snackbarContainer = document.querySelector('#toast-ok');
                var data = {message: 'Biere sauvegardée',timeout: 1000};
                snackbarContainer.MaterialSnackbar.showSnackbar(data);

                // Save the front beer img
                if($('#photo_front').prop('files')[0]!=null){
                    var file_data = $('#photo_front').prop('files')[0];
                    var form_data = new FormData();
                    form_data.append('file', file_data, getImgFileName());
                    $.ajax({
                        url: '../donnees/uploadImg.php',
                        dataType: 'text',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form_data,
                        type: 'post',
                        error: function(request, error) {
                            alert("Erreur : responseText: "+request.responseText);
                        },
                        success: function(response){
                            var snackbarContainer = document.querySelector('#toast-ok');
                            var data = {message: 'Photo devant sauvegardée',timeout: 1000};
                            snackbarContainer.MaterialSnackbar.showSnackbar(data);
                        }
                    });
                }

                // Save the back beer img
                if($('#photo_back').prop('files')[0]!=null){
                    var file_data = $('#photo_back').prop('files')[0];
                    var form_data = new FormData();
                    form_data.append('file', file_data, getImgFileName()+"_back");
                    $.ajax({
                        url: '../donnees/uploadImg.php',
                        dataType: 'text',
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form_data,
                        type: 'post',
                        error: function(request, error) {
                            alert("Erreur : responseText: "+request.responseText);
                        },
                        success: function(response){
                            var snackbarContainer = document.querySelector('#toast-ok');
                            var data = {message: 'Photo derrière sauvegardée',timeout: 1000};
                            snackbarContainer.MaterialSnackbar.showSnackbar(data);
                        }
                    });
                }
            }
        });
        return false;
    });

    // On change file name
    document.getElementById("photo_front").onchange = function () {
        document.getElementById("fileuploadurl_front").value = this.value.replace(/C:\\fakepath\\/i, '');
    };
    document.getElementById("photo_back").onchange = function () {
        document.getElementById("fileuploadurl_back").value = this.value.replace(/C:\\fakepath\\/i, '');
    };

    // Fill the input autocomplete
    $.ajax({
        url : "../donnees/get_selectbox.php",
        dataType : "json",
        type : "GET",
        error    : function(request, error) {
            alert("Erreur : responseText: "+request.responseText+" "+error);
        },
        success: function(response){
            for(var i = 0; i < response.length; i++){
                if( i==0 || i==1 || i==4 ){
                    searchbox="";
                    if( i==0) searchbox="#div-color";
                    if( i==1) searchbox="#div-variete";
                    if( i==4) searchbox="#div-country";

                    for(var j = 0; j < response[i].length; j++){
                        $(''+searchbox+' ul.mdl-search__dropdown').append('<li class="mdl-search__item" tabindex="-1">'+response[i][j]+'</li>');
                    }
                }
                $('#div-color ul.mdl-search__dropdown li').click(function(){
                    $('#color').val($(this).html()).parent().addClass('is-dirty');
                });
                $('#div-variete ul.mdl-search__dropdown li').click(function(){
                    $('#variete').val($(this).html()).parent().addClass('is-dirty');
                });
                $('#div-country ul.mdl-search__dropdown li').click(function(){
                    $('#country').val($(this).html()).parent().addClass('is-dirty');
                });

            }
        }
    });


});


