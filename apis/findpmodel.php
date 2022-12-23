<?php
// Janコードから製品情報Pmodeの検索
// url /apis/findpmodel.php
include('server.php');

class findpmodel extends mainacc
{
    public function jan($jan)
    {
        try {
            $jan = array('jan' => $jan);
            $sql = "select * from partslist.pmodel where jan=:jan and  killl=1";
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $pr->execute($jan);
            echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }
}


if ($_GET['j'] !== null) {
    $test = new findpmodel();
    $test->jan($_GET['j']);
}
