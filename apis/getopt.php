<?php
// echo "入力フォームの選択肢設定";
include('server.php');


// var_dump($_POST);
// var_dump($_GET);
// var_dump($_REQUEST);
// var_dump($_COOKIE);


class getopt extends mainacc
{
    public function showrequest()
    {
        print_r($_REQUEST);
    }

    // Ajax GETオプション = 'opt=getcategory'
    public function getcategory()
    {
        try {
            $sql = "select * from partslist.category where killl=1";
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $this->dbh = null;
            $pr->execute();
            echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }

    public function getupstream()
    {
        try {
            $sql = "select * from partslist.upstream where killl=1";
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $this->dbh = null;
            $pr->execute();
            echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }

    public function getstatus()
    {
        try {
            $sql = "select * from partslist.status where killl=1";
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $this->dbh = null;
            $pr->execute();
            echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }

    public function getuser()
    {
        try {
            $sql = "select * from partslist.user where killl=1";
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $this->dbh = null;
            $pr->execute();
            echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }

    public function getmaker()
    {
        try {
            $sql = "select * from partslist.maker where killl=1";
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $this->dbh = null;
            $pr->execute();
            echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }
}

$setopt = new getopt();
if ($_GET['opt'] == 'getcategory') {
    $setopt->getcategory();
}
if ($_GET['opt'] == 'upstream') {
    $setopt->getupstream();
}
if ($_GET['opt'] == 'status') {
    $setopt->getstatus();
}
if ($_GET['opt'] == 'user') {
    $setopt->getuser();
}
if ($_GET['opt'] == 'maker') {
    $setopt->getmaker();
}


// $bvb->getcategory();
