<?php

// if ($_SERVER['REQUEST_METHOD'] == 'GET' && realpath(__FILE__) == realpath($_SERVER['SCRIPT_FILENAME'])) {
//     /* 
//            Up to you which header to send, some prefer 404 even if 
//            the files does exist for security
//         */
//     header('HTTP/1.0 403 Forbidden', TRUE, 403);

//     /* choose the appropriate page to redirect users */
//     die(header('location: /error.php'));
// }
?>


<?php
class mainacc
{
    protected $mysqluser = '';
    protected $mysqlpassword = '';
    protected $mysqldb_name = '';
    protected $dbh = null;
    protected $deg = false;

    // abstract public function getacc();
    // abstract public function init();

    function __construct()
    {
        $this->mysqluser = 'root';
        $this->mysqlpassword = 'toor';
        $this->mysqldb_name = 'mysql:dbname=partslist;host=localhost';
    }

    public function accsee()
    {
        try {
            $this->dbh =  new PDO($this->mysqldb_name, $this->mysqluser, $this->mysqlpassword);
            return $this->dbh;
        } catch (PDOException $e) {
            echo json_encode('{"error": 12345,"pdo":$e}', JSON_UNESCAPED_UNICODE);
        }
    }

    public function getMainlist()
    {
        try {
            $sql = 'select * from partslist.mainlist';
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $this->dbh = null;
            $pr->execute();
            echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }

    public function setMainList($array)
    {
        try {
            $this->accsee();
            $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->dbh->beginTransaction();
            // $sql='update set ';
            $this->dbh->commit();
        } catch (PDOException $e) {
            $this->dbh->rollBack();
        }
    }



    public function getupstream()
    {
        try {
            $sql = "select * from partslist.upstream";
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
            $sql = "select * from partslist.status";
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $this->dbh = null;
            $pr->execute();
            echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }

    public function getcategory()
    {
        try {
            $sql = "select * from partslist.category";
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $this->dbh = null;
            $pr->execute();
            echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }

    public function getModel()
    {
        try {
            $sql = "select * from partslist.pmodel";
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $this->dbh = null;
            $pr->execute();
            echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }

    public function upModel($item)
    // 成功
    // update partslist.pmodel set item=:item,jan=:jan,make=:make,killl=:killl where indexkey=:key;
    {
        // 引数の例
        $item = array('item' => 'NEW P8PHD23', 'jan' => '1234567', 'maker' => 1, 'killl' => null, 'key' => 2);
        $sql = 'update partslist.pmodel set item=:item,jan=:jan,maker=:makerr,killl=:killl where indexkey=:key';
        try {
            $this->accsee();
            $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->dbh->beginTransaction();
            $pr = $this->dbh->prepare($sql);
            $pr->execute($item);
            $this->dbh->commit();
        } catch (PDOException $e) {
            $this->printError($e);
            $this->dbh->rollBack();
        } finally {
            $this->dbh = null;
        }
    }

    public function addModel($item)
    // 成功
    {
        // $item = array('item' => "NEWPC", 'jan' => '1233333', 'maker' => 2);
        $sql = 'insert into partslist.pmodel(item,jan,maker)values(:item,:jan,:maker)';
        try {
            $this->accsee();
            $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->dbh->beginTransaction();
            $pr = $this->dbh->prepare($sql);
            if ($pr->execute($item)) {
                $this->statusOK(array("status" => 'ok'));
            };
            $this->dbh->commit();
        } catch (PDOException $e) {
            $this->dbh->rollBack();
            if ($this->deg == true) {
                $this->printError($e);
            } else {
                $this->statusOK(array("status" => 'Functino name:' . __FUNCTION__ . ' Line num:' . __LINE__));
            }
        } finally {
            $this->dbh = null;
        }
    }

    public function getmaker()
    {
        try {
            $sql = "select * from partslist.maker";
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $this->dbh = null;
            $pr->execute();
            echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }

    //
    public function getuser()
    {
        try {
            $sql = 'select * from partslist.user';
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $pr->execute();
            echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }

    // 2022年10月20日機能を追加
    // PHPセッションIDを検出
    // return ユーザー情報
    // 動作可能
    public function getusersessionid($ssid)
    {
        // 引数
        $temp = array("sessionid" => $ssid);
        try {
            $sql = 'select item,phpsession from partslist.user where phpsession =:sessionid';
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $pr->execute($temp);
            return $pr;
            // echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
        }
    }

    public function userlogin($userpr)
    {
    }

    public function printError($e)
    {
        echo '<pre>';
        print_r($e);
    }
    private function statusOK($e)
    {
        echo '<pre>';
        print_r(json_encode($e));
    }
}







function test()
{
    $temp = new mainacc();
    echo '<pre>';
    $temp->getupstream();
    echo '<pre>';
    $temp->getModel();
    echo '<pre>';
    $temp->getMainlist();
    echo '<pre>';
    $temp->getstatus();
    echo '<pre>';
    $temp->getUser();
};


function test2()
{
    $temp = new mainacc();
    echo '<pre>';
    $temp->addModel(array('item' => "NEWPC3334", 'jan' => '12333334', 'maker' => 2));
    echo '<pre>';
    $temp->getModel();
}

function test3()
{
    $vvv = new mainacc();
    $vvv->getusersessionid('924149t426m94gvn06kjqe9rog');
}

// test3();

?>