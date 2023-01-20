<?php
// http://aut-sun2:88/apis/search.php
// 検索API、検証品のリスト検索、動作検証結果の検索
// 1.  maker_find($maker) メーカー名指定検索
// 2.  all_find() すべての検索、行数を設定していない。

// var_dump($_REQUEST);



include('./server.php');

class search extends mainacc
{

    // メーカー名指定の検索
    public function maker_find($maker)
    {
        try {
            $sql = 'select * from mainlist join pmodel on mainlist.pmodel=pmodel.indexkey join maker on pmodel.maker=maker.indexkey where maker.item=:maker';
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $pr->execute(array(':maker' => $maker));
            echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
            $this->dbh->rollBack();
        }
    }

    // すべての検索
    public function all_find()
    {
        try {
            $sql  = 'select * from mainlist join pmodel on mainlist.pmodel=pmodel.indexkey join maker on pmodel.maker=maker.indexkey';
            $this->accsee();
            $pr = $this->dbh->prepare($sql);
            $pr->execute(array());
            echo json_encode($pr->fetchAll(), JSON_UNESCAPED_UNICODE);
        } catch (PDOException $e) {
            $this->printError($e);
            $this->dbh->rollBack();
        }
    }
}



// テストファインクション
$nnn = new search();
// $nnn->maker_find("BIOSTAR");
$nnn->all_find();