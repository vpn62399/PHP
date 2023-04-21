<?php
// sqlite3 テスト
// echo  __FILE__;

class SQDB extends SQLite3
{
    function __construct()
    {
        // $dbname = "C:\Users\mvk_sun\Desktop\PHP-main\SE7ALL.db";
        // 
        $dbname = "../../SE7ALL/SE7ALL.db";
        $this->open($dbname);
    }
}

$db = new SQDB();
$result = $db->query('select * from hbp0020sa7 limit 3');

while ($row = $result->fetchArray()) {
    echo json_encode($row, JSON_UNESCAPED_UNICODE);
}
echo json_encode($result->fetchArray(), JSON_UNESCAPED_UNICODE);
