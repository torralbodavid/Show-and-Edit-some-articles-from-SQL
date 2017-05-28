<?php
header("Content-type:application/json");
$con = mysqli_connect('192.168.1.105','david','admin','noticiesRSS');
if (!$con) {
    die('No ha estat possible connectar amb la base de dades: ' . mysqli_error($con));
}


function mostraArticleFiltrat()
{
    $filtre = $_POST['filtre'];

    global $con;
    $sql = "SELECT * FROM noticies WHERE title LIKE '%".$filtre."%'";
    $result = mysqli_query($con, $sql);

    $arrayNoticies = array();
    while ($row = mysqli_fetch_array($result)) {

        //afegim dins l'array, un array d'objectes.
        $arrayNoticies[] = array('id' => "".$row['id']."" ,'title' => "".$row['title']."",'link' => "".$row['link']."");

    }
    //encodifiquem a json.
    echo json_encode($arrayNoticies);
}

function guardarArticle()
{
    $id = intval($_POST['id']);
    $title = $_POST['title'];
    $link = $_POST['link'];

    global $con;
    $sql = "UPDATE noticies SET title = '".htmlentities($title, ENT_QUOTES)."', link = '".htmlentities($link, ENT_QUOTES)."' WHERE id = $id;";
    mysqli_query($con, $sql);

    $myObj['id'] = $id;
    $myObj['title'] = $title;
    $myObj['link'] = $link;

    $myJSON = json_encode($myObj);
    echo $myJSON;
}

//mostrem informació depenent de la variable enviada per post
if(isset($_POST['filtre'])){
    mostraArticleFiltrat();
} elseif (isset($_POST['id'])){
    guardarArticle();
}

mysqli_close($con);
?>