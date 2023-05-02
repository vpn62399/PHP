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
session_start();
include('./server.php');
// 2023-04-11 13:33:20 途中
// echo json_encode($_REQUEST, JSON_UNESCAPED_UNICODE);

class userapt extends mainacc
{
    protected $user = "";
    protected $pas = "";
    // function __construct()
    // {
    //     // parent::__construct();
    // }

    // public function usercheck()
    // {
    //     echo json_encode($_REQUEST, JSON_UNESCAPED_UNICODE);
    // }


    // 2023-04-25 13:55:24 土中
    public function userlgin()
    {
        try {
            $sql = "select * from user where Ename=:Ename";
            $sql = "select pass_HASH from user where Ename=:Ename";
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $pr->execute(array('Ename' => $_POST['name']));
            // $pr->execute(array('Ename' => 'tkk'));
            $temp = $pr->fetchAll();

            if (count($temp) == 0) {
                echo json_encode(array("loginStatus" => "Enameerror"), JSON_UNESCAPED_UNICODE);
                return;
            }
            if (password_verify($_POST['password'],   $temp[0]['pass_HASH'])) {
                // echo json_encode($temp[0], JSON_UNESCAPED_UNICODE);
                echo json_encode(array("loginStatus" => "LoginOK"));
                return;
            } else {
                echo json_encode(array("loginStatus" => "passerror"), JSON_UNESCAPED_UNICODE);
                return;
            }
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }

    public function test()
    {
        $v = '123456';
        $b = password_hash($v, PASSWORD_DEFAULT);
        $c = password_hash($v, PASSWORD_DEFAULT);
        echo $b;
        echo '<br>';
        echo $c;
        echo '<br>';
        echo password_verify('33123456', $c);
    }
}

$ks = new userapt();
$ks->userlgin();
// $ks->test();






?>
