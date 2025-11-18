
<?php

include_once 'conexion/db.php';

class UsuarioSession {

    public function __construct() {
        session_start();
    }

    public function existeUsuario($usuario, $pass) {

        //conversor  a md5
        $passMD5 = md5($pass);
        //instancia de la clase BD para conexiones con la base de datos
        $db = new DB();

        //preparamos la sentencia a ser ejecutada ,ponemos en vez de todo menos FROM *
        // Only allow users with estado = 'ACTIVO'
        $query = $db->conectar()->prepare("SELECT `cod_usuario`, `nombre_apellido`, 
            `nick_name`, `password`, `estado`, `cod_rol`
            FROM `usuarios`
                WHERE nick_name = :usuario and password = :pass AND estado = 'ACTIVO'"); //u.usuario y pass de base de datos
        //agregamos los valores a la consulta mediante la ayuda de un diccionario
        $query->execute(['usuario' => $usuario, 'pass' => $passMD5]);

        if ($query->rowCount()) {

            foreach ($query as $user) {
                $_SESSION['cod_usuario'] = $user['cod_usuario'];
                // Use consistent session keys across the app
                $_SESSION['cod_usuario'] = $user['cod_usuario'];
                $_SESSION['nombre_completo'] = $user['nombre_apellido'];
                $_SESSION['cod_rol'] = $user['cod_rol'];

                return true;
            }
        } else {
            return false;
        }
    }

    public function bloquearUsuario($usuario) {


        //instancia de la clase BD para conexiones con la base de datos
        $db = new DB();

        //preparamos la sentencia a ser ejecutada
        // Ensure we update the same field used elsewhere (nick_name)
        $query = $db->conectar()->prepare("UPDATE usuarios SET estado = 'BLOQUEADO' 
        WHERE nick_name LIKE :usuario");
        //agregamos los valores a la consulta mediante la ayuda de un diccionario
        $query->execute(['usuario' => $usuario]);
    }

    public function actualizatIntentos($usuario, $intentos) {


//        instancia de la clase BD para conexiones con la base de datos
//        echo "<script> alert($usuario); alert($intentos); </script>";
        $db = new DB();
        //preparamos la sentencia a ser ejecutada
        $query = $db->conectar()->prepare("UPDATE usuarios SET intentos = :intentos 
        WHERE  nick_name LIKE :usuario");
        //agregamos los valores a la consulta mediante la ayuda de un diccionario
        $query->execute(['usuario' => $usuario, 'intentos' => $intentos]);
    }

    public function dameIntentos($usuario) {


        //instancia de la clase BD para conexiones con la base de datos
        $db = new DB();

        //preparamos la sentencia a ser ejecutada
        $query = $db->conectar()->prepare("SELECT intentos FROM usuarios  
        WHERE  nick_name LIKE :usuario limit 1");
        //agregamos los valores a la consulta mediante la ayuda de un diccionario
        $query->execute(['usuario' => $usuario]);

        if ($query->rowCount()) {

            foreach ($query as $user) {


                return $user['intentos'];
            }
        } else {
            return 0;
        }
    }

    public function dameLimiteIntentos($usuario) {


        //instancia de la clase BD para conexiones con la base de datos
        $db = new DB();

        //preparamos la sentencia a ser ejecutada
        $query = $db->conectar()->prepare("SELECT limite_intentos FROM usuarios  
        WHERE  nick_name LIKE :usuario");
        //agregamos los valores a la consulta mediante la ayuda de un diccionario
        $query->execute(['usuario' => $usuario]);

        if ($query->rowCount()) {

            foreach ($query as $user) {


                return $user['limite_intentos'];
            }
        } else {
            return 0;
        }
    }

    public function usuarioLogeado() {
        // Check the session key set by existeUsuario
        return isset($_SESSION['cod_usuario']);
    }

    public function getNombre() {
        return isset($_SESSION['nombre_completo']) ? $_SESSION['nombre_completo'] : '';
    }

    public function getIdCliente() {
        return isset($_SESSION['cod_usuario']) ? $_SESSION['cod_usuario'] : null;
    }

    public function getIdSucursal() {
        return $_SESSION['id_sucursal'];
    }

    public function getSucursal() {
        return $_SESSION['sucursal'];
    }

    public function getRol() {
        return isset($_SESSION['cod_rol']) ? $_SESSION['cod_rol'] : null;
    }

//##############################################################################
//##############################################################################
//##############################PARA ADMINISTRADORES#######################
//##############################################################################
//##############################################################################

    public function existeAdmin($usuario, $pass) {

        //conversor  a md5
        $passMD5 = md5($pass);
        //instancia de la clase BD para conexiones con la base de datos
        $db = new DB();

        //preparamos la sentencia a ser ejecutada
        $query = $db->conectar()->prepare("SELECT nombre_apellido,"
                . "id_usuario FROM usuario WHERE nombre = :usuario "
                . "and clave = :pass;");
        //agregamos los valores a la consulta mediante la ayuda de un diccionario
        $query->execute(['usuario' => $usuario, 'pass' => $passMD5]);

        if ($query->rowCount()) {

            foreach ($query as $user) {
                $_SESSION['nombre_apellido_admin'] = $user['nombre_apellido'];
                $_SESSION['id_usuario'] = $user['id_usuario'];

                return true;
            }
        } else {
            return false;
        }
    }

    /**
     * 
     * @return boolean
     */
    public function adminLogeado() {
        if (isset($_SESSION['id_usuario'])) {
            return true;
        } else {
            return false;
        }
    }

    public function getNombreAdmin() {
        return $_SESSION['nombre_apellido_admin'];
    }

    public function getIdAdmin() {
        return $_SESSION['id_usuario'];
    }
}
