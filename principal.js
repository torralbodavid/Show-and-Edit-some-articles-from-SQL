$('document').ready(function(){

    //filtrem informació i la mostrem
    $('#enviaInformacio').click(function(){

        //comprovem que el filtre estigui ple
        if($('#filtre').val() != "") {
            var filtre = $('#filtre').val();
        } else {
            $('#alertes').html("No pots deixar el camp en blanc");
            $('#alertes').css('color','red');
            $('#alertes').css('border','solid 1px');
        }

        //passarem les dades per post
        jQuery.post("dades.php", {
            filtre:filtre
        }, function(data, status){
            if(status == "success"){
                if(data != "") {
                    //eliminarà el contingut del div quan tornem a fer una consulta.
                    $("#proves").empty();

                    //per a cada objecte dins l'array creem els div que contindran la informació de l'article
                    $.each(data, function (key, value) {

                        $("#proves").append('<div id="articles"><h3>Article ' + value['id'] + '</h3>' +
                            '<input type="button"id="btnShow_' + value['id']+'" class="botoMostrar ' + value['id'] + '" value="Mostrar"/>' +
                            '<input type="hidden" id="title_' + value['id'] + '" value="' + value['title'] + '"/><br>' +
                            '<input type="hidden" id="link_' + value['id'] + '" value="' + value['link'] + '"/><br><br>' +
                            '<input type="hidden" id="btnEdit_' + value['id']+'" class="botoEditar ' + value['id'] + '" value="Editar"/>' +
                            '</div>');

                    });

                    //s'activarà quan es cliqui el botó amb la classe que començi per botoEditar
                    $('[class^="botoMostrar"]').click(function(){

                        //agafem tota la clase i la dividim per espais
                        var str = $(this).attr("class").split(" ");
                        //agafem l'última part
                        var id_article = str.pop();

                        $('#btnShow_'+id_article).prop('type', 'hidden');
                        $('#title_'+id_article).prop('type', 'text');
                        $('#link_'+id_article).prop('type', 'text');
                        $('#btnEdit_'+id_article).prop('type', 'button');
                    });

                    //s'activarà quan es cliqui el botó amb la classe que començi per botoEditar
                    $('[class^="botoEditar"]').click(function(){

                        //agafem tota la clase i la dividim per espais
                        var str = $(this).attr("class").split(" ");
                        //agafem l'última part
                        var id_article = str.pop();

                        //agafem les variables de l'article
                        var id_title = $('#title_'+id_article).val();
                        var id_link = $('#link_'+id_article).val();

                        //passem les dades per post
                        jQuery.post("dades.php", {
                            id:id_article,
                            title:id_title,
                            link:id_link
                        }, function(data, status){
                            if(status == "success"){

                                $('#alertes').html("Guardat correctament!");
                                $('#alertes').css('color','green');
                                $('#alertes').css('border','solid 1px');
                            } else{
                                $('#alertes').html(data);
                                $('#alertes').css('color','red');
                                $('#alertes').css('border','solid 1px');
                            }
                        });

                    });

                    $('#alertes').html("S'han trobat resultats !");
                    $('#alertes').css('color', 'green');
                    $('#alertes').css('border', 'solid 1px');
                } else {
                    $("#proves").html("No s'han trobat resultats");
                }
            }
            else{
                $('#alertes').html("Error");
                $('#alertes').css('color','red');
                $('#alertes').css('border','solid 1px');
            }
        });
    });
});