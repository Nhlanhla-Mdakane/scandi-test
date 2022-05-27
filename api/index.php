

<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods:POST,GET,PUT,DELETE');
header('Access-Control-Allow-Headers: content-type or other');
header('Content-Type: application/json');

$servername = "localhost";
$username   = "root";
$password   = "password";
$dbname     = "productsdb";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//Add product
if(isset($_POST['sku']))
{
     $sql = "insert into products (id ,sku , name ,price , type ,attributes)

     VALUES (null,'".$_POST['sku']."', '".$_POST['name']."', '".$_POST['price']."', '".$_POST['type']."'
       , '".$_POST['attributes']."')";


    if (mysqli_query($conn,$sql)) {
    $data = array("data" => "You Data added successfully");
        echo json_encode($data);
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
//Delete user
elseif(isset($_POST['deleteid']))
{
    $sql = mysqli_query($conn, "DELETE from products where id =".$_POST['deleteid']);
    if ($sql) {

        //Success Message
        $data = array("data" => "Record deleted successfully");
        echo json_encode($data);
      } else {

        $data = array("data" =>"Error deleting record: " . mysqli_error($conn));
        echo json_encode($data);
      }
}
else
{
    //get all users details
    $trp = mysqli_query($conn, "SELECT * from products");
    $rows = array();
    while($r = mysqli_fetch_assoc($trp)) {
        $rows[] = $r;
    }
    print json_encode($rows);
}
?>
