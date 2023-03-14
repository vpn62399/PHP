<?php
// http://aut-sun2:88/apis/search.php
// 検索API、検証品のリスト検索、動作検証結果の検索
// 利用先 plist.js
// 2023-03-03 13:18:11  一つのSQLコマンドにした。


include('./server.php');

class search extends mainacc
{
    private $sqlcmd = 'select * from mainlist';

    function __construct()
    {
        parent::__construct();
    }

    // SQLコマンドの作成
    function sqlcmd()
    {
        // $this->sqlcmd = 'select * from mainlist join pmodel on mainlist.pmodel=pmodel.indexkey join maker on pmodel.maker=maker.indexkey';
        // $this->sqlcmd = 'select * from mainlist join pmodel on mainlist.pmodel=pmodel.indexkey join maker on pmodel.maker=maker.indexkey where pmodel.item like '%%' and mainlist.modexsn like '%%' and maker.item like '%%'';
        // $sqlarray = array('pmodel' => $_POST['pmodel'], 'maker' => $_POST['maker'], 'indexkey' => $this->pmodeIndexkey);
        // $this->sqlcmd = 'select * from mainlist join pmodel on mainlist.pmodel=pmodel.indexkey join maker on pmodel.maker=maker.indexkey where pmodel.item like :model and mainlist.modexsn like :Serial and maker.item like :maker';
        $this->sqlcmd = 'select mainlist.indate,pmodel.item,pmodel.jan AS jan,mainlist.modexsn,mainlist.comment,user.item AS user,category.item1 AS category  from mainlist 
                        join pmodel on pmodel.indexkey =mainlist.pmodel
                        join maker on maker.indexkey =pmodel.maker
                        join user on user.indexkey = mainlist.inperson
                        join category on category.indexkey = mainlist.category
                        where pmodel.item like :model 
                        and mainlist.modexsn like :Serial 
                        and maker.item like :maker';
    }

    // すべての検索
    public function opt_all()
    {
        try {
            $this->accsee();
            $pr = $this->dbh->prepare($this->sqlcmd);
            $sqlarray = [':model' => '%' . $_POST['model'] . '%', ':Serial' => '%' . $_POST['Serial'] . '%', ':maker' => '%' . $_POST['maker'] . '%'];
            $pr->execute($sqlarray);
            $temp = array($_POST, $pr->fetchAll());
            echo json_encode($temp, JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
            $this->dbh->rollBack();
        }
    }
}

$nnn = new search();
$nnn->sqlcmd();
$nnn->opt_all();
