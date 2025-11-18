<?php
require_once '../conexion/db.php';

if (isset($_POST['listar'])) {
    listar();
}

if (isset($_POST['guardar'])) {
    guardar($_POST['guardar']);
}

if (isset($_POST['actualizar'])) {
    actualizar($_POST['actualizar']);
}

if (isset($_POST['id'])) {
    obtener_por_id($_POST['id']);
}

if (isset($_POST['eliminar'])) {
    eliminar($_POST['eliminar']);
}

if (isset($_POST['buscar'])) {
    buscar($_POST['buscar']);
}

if (isset($_POST['leer_activos'])) {
    leer_activos();
}

function listar() {
    $base_datos = new DB();
    $query = $base_datos->conectar()->prepare(
        "SELECT id_alumno, nombre, apellido, ci_alumno, fecha_nacimiento, email, telefono, direccion, estado
           FROM alumnos
       ORDER BY id_alumno DESC;"
    );
    $query->execute();
    if ($query->rowCount()) {
        print_r(json_encode($query->fetchAll(PDO::FETCH_OBJ)));
    } else {
        echo '0';
    }
}

function guardar($lista) {
    $json_datos = json_decode($lista, true);
    $base_datos = new DB();
    $query = $base_datos->conectar()->prepare(
        "INSERT INTO alumnos (nombre, apellido, ci_alumno, fecha_nacimiento, email, telefono, direccion, estado)
         VALUES (:nombre, :apellido, :ci_alumno, :fecha_nacimiento, :email, :telefono, :direccion, :estado);"
    );
    $params = [
        'nombre' => $json_datos['nombre'],
        'apellido' => $json_datos['apellido'],
        'ci_alumno' => !empty($json_datos['ci_alumno']) ? $json_datos['ci_alumno'] : null,
        'fecha_nacimiento' => !empty($json_datos['fecha_nacimiento']) ? $json_datos['fecha_nacimiento'] : null,
        'email' => !empty($json_datos['email']) ? $json_datos['email'] : null,
        'telefono' => !empty($json_datos['telefono']) ? $json_datos['telefono'] : null,
        'direccion' => !empty($json_datos['direccion']) ? $json_datos['direccion'] : null,
        'estado' => $json_datos['estado'],
    ];
    $query->execute($params);
}

function actualizar($lista) {
    $json_datos = json_decode($lista, true);
    $base_datos = new DB();
    $query = $base_datos->conectar()->prepare(
        "UPDATE alumnos
            SET nombre = :nombre,
                apellido = :apellido,
                ci_alumno = :ci_alumno,
                fecha_nacimiento = :fecha_nacimiento,
                email = :email,
                telefono = :telefono,
                direccion = :direccion,
                estado = :estado
          WHERE id_alumno = :id_alumno;"
    );
    $params = [
        'id_alumno' => $json_datos['id_alumno'],
        'nombre' => $json_datos['nombre'],
        'apellido' => $json_datos['apellido'],
        'ci_alumno' => !empty($json_datos['ci_alumno']) ? $json_datos['ci_alumno'] : null,
        'fecha_nacimiento' => !empty($json_datos['fecha_nacimiento']) ? $json_datos['fecha_nacimiento'] : null,
        'email' => !empty($json_datos['email']) ? $json_datos['email'] : null,
        'telefono' => !empty($json_datos['telefono']) ? $json_datos['telefono'] : null,
        'direccion' => !empty($json_datos['direccion']) ? $json_datos['direccion'] : null,
        'estado' => $json_datos['estado'],
    ];
    $query->execute($params);
}

function obtener_por_id($id) {
    $base_datos = new DB();
    $query = $base_datos->conectar()->prepare(
        "SELECT id_alumno, nombre, apellido, ci_alumno, fecha_nacimiento, email, telefono, direccion, estado
           FROM alumnos
          WHERE id_alumno = :id
          LIMIT 1;"
    );
    $query->execute(['id' => $id]);
    if ($query->rowCount()) {
        print_r(json_encode($query->fetch(PDO::FETCH_OBJ)));
    } else {
        echo '0';
    }
}

function eliminar($id) {
    $base_datos = new DB();
    $query = $base_datos->conectar()->prepare(
        "UPDATE alumnos SET estado = 'INACTIVO' WHERE id_alumno = :id;"
    );
    $query->execute(['id' => $id]);
}

function buscar($texto) {
    $base_datos = new DB();
    $query = $base_datos->conectar()->prepare(
        "SELECT id_alumno, nombre, apellido, ci_alumno, fecha_nacimiento, email, telefono, direccion, estado
           FROM alumnos
          WHERE CONCAT(nombre, ' ', apellido, ' ', COALESCE(ci_alumno, ''), ' ', COALESCE(email, ''), ' ', COALESCE(telefono, ''), ' ', estado, ' ', id_alumno) LIKE :texto
       ORDER BY id_alumno DESC
          LIMIT 50;"
    );
    $query->execute(['texto' => "%$texto%"]);
    if ($query->rowCount()) {
        print_r(json_encode($query->fetchAll(PDO::FETCH_OBJ)));
    } else {
        echo '0';
    }
}

function leer_activos() {
    $base_datos = new DB();
    $query = $base_datos->conectar()->prepare(
        "SELECT id_alumno, CONCAT(nombre, ' ', apellido) AS nombre_completo
           FROM alumnos
          WHERE estado = 'ACTIVO'
       ORDER BY nombre, apellido;"
    );
    $query->execute();
    if ($query->rowCount()) {
        print_r(json_encode($query->fetchAll(PDO::FETCH_OBJ)));
    } else {
        echo '0';
    }
}
?>
