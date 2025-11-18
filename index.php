
<?php

include_once './controladores/usuarioSession.php';
$error_sesion = "";
$usuario = new UsuarioSession();

// Support Post-Redirect-Get: if a previous POST set an error message, read it from session
if (isset($_SESSION['error_sesion'])) {
    $error_sesion = $_SESSION['error_sesion'];
    unset($_SESSION['error_sesion']);
}

if ($usuario->usuarioLogeado()) {
    // Usuario ya logeado: mostrar main
    include_once 'main.php';


//    echo "usuario logeado";
} else if (isset($_POST['usuario']) && isset($_POST['pass'])) {


    if (empty($_POST['usuario']) || empty($_POST['pass'])) {
        $error_sesion = 'Debes ingresar usuario y contraseña';
        include_once 'login.php';
    } else {
        // Leer intentos y límite (si límite no está configurado, usar 3)
        $intentos = $usuario->dameIntentos($_POST['usuario']);
        $limite = (int) $usuario->dameLimiteIntentos($_POST['usuario']);
        if ($limite <= 0) $limite = 3;

        // Si el usuario está bloqueado (intentos >= limite) mostrar mensaje
        if ($intentos >= $limite) {
            $error_sesion = 'Usuario bloqueado, contacta con el administrador.';
            // store message in session and redirect to avoid double POST on refresh
            $_SESSION['error_sesion'] = $error_sesion;
            header('Location: index.php');
            exit;
        }

        // Intentamos autenticar (existeUsuario ahora solo permitirá estado = ACTIVO)
        if ($usuario->existeUsuario($_POST['usuario'], $_POST['pass'])) {
            // login correcto -> resetear intentos y mostrar main
            $usuario->actualizatIntentos($_POST['usuario'], 0);
            // clear any previous error
            if (isset($_SESSION['error_sesion'])) unset($_SESSION['error_sesion']);
            include_once 'main.php';
            exit;
        } else {
            // login incorrecto: incrementar intentos y comprobar bloqueo
            $intentos++;
            $usuario->actualizatIntentos($_POST['usuario'], $intentos);

            if ($intentos >= $limite) {
                // bloquear usuario en DB
                $usuario->bloquearUsuario($_POST['usuario']);
                $error_sesion = 'Usuario bloqueado por superar el número de intentos. Contacta con el administrador.';
            } else {
                $restantes = $limite - $intentos;
                $error_sesion = 'Usuario o contraseña incorrectos. Te quedan ' . $restantes . ' intentos.';
            }
            // store error and redirect to avoid incrementing attempts again on refresh
            $_SESSION['error_sesion'] = $error_sesion;
            header('Location: index.php');
            exit;
        }
    }
} else {
//    echo "login";


    include_once 'login.php';
}
?>

