<?php
include('server.php');
class pagemenu extends mainacc
{
    function __construct()
    {
        parent::__construct();
    }
}

$menu = new pagemenu();
$menu->pemenu($_GET['menugropu']);
