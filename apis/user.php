<?php
// if ($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])) {
//     /* 
//     Up to you which header to send, some prefer 404 even if 
//     the files does exist for security
//     */
//     header('HTTP/1.0 403 Forbidden', TRUE, 403);
//     /* choose the appropriate page to redirect users */
//     die(header('location: /error.php'));
// }
?>

<?php
include('./server.php');
// 2023-04-11 13:33:20 途中
// echo json_encode($_REQUEST, JSON_UNESCAPED_UNICODE);

class userapt extends mainacc
{
    protected $user = "";
    protected $pas = "";

    function __construct()
    {

    }

    public function usercheck()
    {
        echo json_encode($_REQUEST, JSON_UNESCAPED_UNICODE);
    }




}

// echo json_encode($_REQUEST, JSON_UNESCAPED_UNICODE);
$ks = new userapt();
$ks->usercheck();






?>
