<?php
include_once 'conexion/db.php';

class UsuarioSession {

    public function __construct() {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
    }

    // === MÉTODOS QUE TU INDEX.PHP ESTÁ LLAMANDO (LOS MANTENEMOS) ===
    public function existeUsuario($usuario, $pass) {
        $db = new DB();
        $pdo = $db->conectar();

        $query = $pdo->prepare("
            SELECT id_usuario, nombre, password_hash, id_rol, estado 
            FROM usuarios 
            WHERE username = :usuario AND estado = 'activo'
            LIMIT 1
        ");
        $query->execute(['usuario' => $usuario]);
        $user = $query->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($pass, $user['password_hash'])) {
            $_SESSION['cod_usuario'] = $user['id_usuario'];
            $_SESSION['nombre_completo'] = $user['nombre'];
            $_SESSION['cod_rol'] = $user['id_rol'];
            $this->resetearIntentos($usuario); // Resetea intentos al loguear bien
            return true;
        } else {
            $this->incrementarIntento($usuario);
            return false;
        }
    }

    public function dameIntentos($usuario) {
        $db = new DB();
        $pdo = $db->conectar();
        $stmt = $pdo->prepare("SELECT intentos FROM usuarios WHERE username = ?");
        $stmt->execute([$usuario]);
        return (int)$stmt->fetchColumn();
    }

    public function actualizatIntentos($usuario, $intentos) {
        $db = new DB();
        $pdo = $db->conectar();
        $pdo->prepare("UPDATE usuarios SET intentos = ? WHERE username = ?")
            ->execute([$intentos, $usuario]);
    }

    public function bloquearUsuario($usuario) {
        $db = new DB();
        $pdo = $db->conectar();
        $pdo->prepare("UPDATE usuarios SET estado = 'inactivo' WHERE username = ?")
            ->execute([$usuario]);
    }

    public function usuarioLogeado() {
        return isset($_SESSION['cod_usuario']);
    }

    public function getNombre() {
        return $_SESSION['nombre_completo'] ?? 'Usuario';
    }

    public function getIdCliente() {
        return $_SESSION['cod_usuario'] ?? null;
    }

    public function getRol() {
        return $_SESSION['cod_rol'] ?? null;
    }

    // === MÉTODOS INTERNOS (para control de intentos) ===
    private function incrementarIntento($usuario) {
        $intentos = $this->dameIntentos($usuario) + 1;
        $this->actualizatIntentos($usuario, $intentos);

        if ($intentos >= 5) {
            $this->bloquearUsuario($usuario);
        }
    }

    private function resetearIntentos($usuario) {
        $this->actualizatIntentos($usuario, 0);
    }

    // === CERRAR SESIÓN ===
    public function cerrarSesion() {
        session_unset();
        session_destroy();
    }
}