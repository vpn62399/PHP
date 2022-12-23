<?php
session_start();

// print(__FILE__);
// echo '<br>';
// echo '<pre>';
// var_dump($_REQUEST);
// var_dump($_SESSION);
var_dump(session_id());
// echo $_SERVER['HTTP_USER_AGENT'];
// print_r($_SERVER);
// // echo gettype($_SERVER);
// // echo '<br>';
// // echo '<pre>';
// echo json_encode($_SERVER);
// phpinfo();
?>


<?php

class accMysql
{
	private $db_name = 'mysql:dbname=partslist;host=127.0.0.1';
	private $db_user = 'root';
	private $user_password = 'toor';
	private $dbacc;

	private function get_dbname()
	{
		return $this->db_name;
	}

	private function getacc()
	{
		try {
			$this->dbacc = new PDO($this->db_name, $this->db_user, $this->user_password);
			return $this->dbacc;
		} catch (PDOException $e) {
			echo $e, PHP_EOL;
			echo 'Mysql アクセル失敗した(0001)';
		}
	}

	public function t1()
	// すべてのユーザーを確認
	{
		$bb = array();
		$tb = $this->getacc();
		$temp = $tb->query('select * from user');
		foreach ($temp as $wr) {
			$bb[] = array($wr[1]);
		}
		echo json_encode($bb, JSON_UNESCAPED_UNICODE);
	}
}

// var_dump($_REQUEST);


// $b = new accMysql();
// $b->t1();
?>


<?php
// $dsn = 'mysql:dbname=partslist;host=127.0.0.1';
// $user = 'root';
// $password = 'toor';
// echo '<pre>';

// try {
// 	$dbh = new PDO($dsn, $user, $password);
// 	echo "接続に成功しました\n";
// } catch (PDOException $e) {
// 	echo "接続に失敗しました\n";
// 	echo $e->getMessage() . "\n";
// 	var_dump($e);
// }

// $xx = $dbh->query('select User,Host from user');


// print($dbh->getAttribute(PDO::ATTR_DRIVER_NAME));


// print(PDO::ATTR_DRIVER_NAME);
// print(PDO::PARAM_BOOL);
// echo '<br>';


// var_dump($xx);
// print(gettype($xx));

// echo '<pre>';
// foreach ($xx as $k => $v) {
// 	echo '<br>';
// 	print($v);
// 	print_r($v);
// 	echo '<br>';
// 	print($v['Host']);
// 	echo '<br>';
// 	print($v['User']);
// 	print($k);
// }


?>