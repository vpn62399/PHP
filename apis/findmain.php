<?php
include('server.php');

if (0) {
    session_start();
    echo 'api_file  ' . __FILE__ . "\n\r";
    var_dump($_REQUEST);
    var_dump($_COOKIE);
    echo json_encode($_REQUEST);

    foreach ($_POST as $xx) {
        echo $xx;
        echo "\n\r";
    }

    foreach ($_GET as $xx) {
        echo $xx;
        echo "\n\r";
    }
}

class findmain extends mainacc
{
    public function modexsn($sn)
    {
        try {
            $sn = array('xsn' => $sn);
            $sql = "select * from partslist.mainlist where modexsn=:xsn";
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $pr->execute($sn);
            $temp = $pr->fetchAll();
            echo json_encode($temp, JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }
}

if ($_GET['j'] !== null) {
    $test = new findmain();
    $test->modexsn($_GET['j']);
}
