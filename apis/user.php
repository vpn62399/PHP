<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])) {
    /* 
    Up to you which header to send, some prefer 404 even if 
    the files does exist for security
    */
    header('HTTP/1.0 403 Forbidden', TRUE, 403);
    /* choose the appropriate page to redirect users */
    die(header('location: /error.php'));
}
?>

<?php

// 参数

include('./server.php');

session_start();
var_dump(session_id());

print_r($_POST);

// class uck extends mainacc
// {
//     protected $un;
//     protected $um;
//     protected $up;
//     // function __construct($user_name, $user_mail, $user_password)
//     // {
//     // }


//     $this->getusersessionid();
// }

// $usp = new uck();


class userck extends mainacc
{
}

$test = new userck();
var_dump($test->getusersessionid($_POST['PHPCKID']));


?>
