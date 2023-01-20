<?php
include('server.php');

if (1) {
    session_start();
    echo 'api_file  ' . __FILE__ . "\n\r";
    var_dump($_REQUEST);
    var_dump($_COOKIE);
    echo json_encode($_REQUEST);

    foreach ($_POST as $xx) {
        echo $xx;
        echo "\n\r";
    }
}

class additem extends mainacc
{
    public $pmodeIndexkey = null;
    public $mainlistIndexkey = null;

    function __construct()
    {
        parent::__construct();
        $this->pmodeIndexkey = null;
        $this->mainlistIndexkey = null;
    }

    // partslist.pmodel JAN 存在かを確認する。存在する場合 pmodel.indexkey をReturn;
    public function jan_exists()
    {
        try {
            $sql = "select indexkey,jan,maker from partslist.pmodel where jan=:jan";
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $pr->execute(array('jan' => $_POST['jan']));
            $temp = $pr->fetchAll();
            $this->pmodeIndexkey = $temp[0]['indexkey'];
            $this->updatePmodel();
        } catch (PDOException $e) {
            $this->pmodeIndexkey = null;
            $this->printError($e);
        }
    }

    // partslist.pmodel 更新(JAN存在する場合)と追加(JAN存在しない場合)します。
    // 2022/11/29 Update可能, Insert可能
    public function updatePmodel()
    {
        if ($_POST['pmodel'] !== "" and $_POST['jan'] !== "") {
            if ($this->pmodeIndexkey != null) {
                try {
                    $sql = "update partslist.pmodel set item=:pmodel,maker=:maker where indexkey=:indexkey";
                    $sqlarray = array('pmodel' => $_POST['pmodel'], 'maker' => $_POST['maker'], 'indexkey' => $this->pmodeIndexkey);
                    $this->accsee();
                    $this->dbh->beginTransaction();
                    $pr = $this->dbh->prepare($sql);
                    $pr->execute($sqlarray);
                    $this->dbh->commit();
                } catch (PDOException $e) {
                    $this->printError($e);
                    $this->dbh->rollBack();
                }
            } else if ($this->pmodeIndexkey == null) {
                try {
                    $sql = "insert into partslist.pmodel (item,jan,maker,killl) values (:pmodel,:jan,:maker,:killl)";
                    $sqlarray = array('pmodel' => $_POST['pmodel'], 'jan' => $_POST['jan'], 'maker' => $_POST['maker'], 'killl' => '1');
                    $this->accsee();
                    $this->dbh->beginTransaction();
                    $pr = $this->dbh->prepare($sql);
                    $pr->execute($sqlarray);
                    $this->dbh->commit();
                } catch (PDOException $e) {
                    $this->printError($e);
                    $this->dbh->rollBack();
                }
            }
        }
    }

    // partslist.mainlist テーブルに同じシリアル番号は存在するか、存在する場合、データ更新、
    // 存在しない場合、データを追加する。
    public function findSnEXIST()
    {
        try {
            $sql = 'select indexkey from partslist.mainlist where modexsn=:modexsn';
            $sqlarray = array('modexsn' => $_POST['modexsn']);
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $pr->execute($sqlarray);
            $temp = $pr->fetchAll();
            $this->mainlistIndexkey = $temp[0]['indexkey'];
        } catch (PDOException $e) {
            $this->printError($e);
        } finally {
        }
    }

    // Itemの更新、または追加
    public function addnewitem()
    {
        //   indexkey | indate  | inperson | upstream | status | outdate | outperson | category | pmodel | modexsn  | comment  | killl
        // 更新
        if ($this->mainlistIndexkey != null) {
            try {
                $sqlarray = array(
                    ':indate' => $_POST['indate'], ':inperson' => $_POST['user'], ':upstream' => $_POST['upstream'],
                    ':status' => $_POST['status'], ':category' => $_POST['category'], ':pmodel' => $this->pmodeIndexkey,
                    ':comment' => $_POST['comment'], ':killl' => '1', ':indexkey' => $this->mainlistIndexkey
                );
                $sql = "update partslist.mainlist set indate=:indate, inperson=:inperson, upstream=:upstream, status=:status, category=:category, pmodel=:pmodel, comment=:comment, killl=:killl where indexkey=:indexkey";
                $this->accsee();
                $this->dbh->beginTransaction();
                $pr = $this->dbh->prepare($sql);
                $pr->execute($sqlarray);
                $this->dbh->commit();
                $okstatus = array('status' => 'OK', 'event' => '既存更新');
                echo json_encode($okstatus, JSON_UNESCAPED_UNICODE);
            } catch (PDOException $e) {
                $this->printError($e);
                $this->dbh->rollBack();
                $okstatus = array('status' => 'NG', 'event' => '既存更新');
                echo json_encode($okstatus, JSON_UNESCAPED_UNICODE);
            }
        }

        // 新規追加
        if ($this->mainlistIndexkey == null) {
            try {
                $sqlarray = array(
                    ':indate' => $_POST['indate'], ':inperson' => $_POST['user'], ':upstream' => $_POST['upstream'],
                    ':status' => $_POST['status'], ':category' => $_POST['category'], ':pmodel' => $this->pmodeIndexkey,
                    ':modexsn' => $_POST['modexsn'], ':killl' => '1', ':comment' => $_POST['comment']
                );
                $sql = "insert into partslist.mainlist (indate,inperson,upstream,status,category,pmodel,modexsn,comment,killl) values (:indate,:inperson,:upstream,:status,:category,:pmodel,:modexsn,:comment,:killl)";
                $this->accsee();
                $this->dbh->beginTransaction();
                $pr = $this->dbh->prepare($sql);
                $pr->execute($sqlarray);
                $this->dbh->commit();
                $okstatus = array('status' => 'OK', 'event' => '新規追加');
                echo json_encode($okstatus, JSON_UNESCAPED_UNICODE);
            } catch (PDOException $e) {
                $this->printError($e);
                $this->dbh->rollBack();
                $okstatus = array('status' => 'NG', 'event' => '新規追加');
                echo json_encode($okstatus, JSON_UNESCAPED_UNICODE);
            } finally {
            }
        }
    }
}


$gf = new additem();
$gf->jan_exists();
$gf->updatePmodel();
$gf->findSnEXIST();
$gf->addnewitem();
