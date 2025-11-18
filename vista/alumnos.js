function mostrarListaAlumnos() {
    let contenido = dameContenido("paginas/referenciales/alumnos/listar.php");
    $(".contenido-principal").html(contenido);
    cargarTablaAlumnos();
}

function mostrarAgregarAlumno() {
    let contenido = dameContenido("paginas/referenciales/alumnos/agregar.php");
    $(".contenido-principal").html(contenido);
}

function guardarAlumno() {
    if ($("#alumno_nombre").val().trim().length === 0 || $("#alumno_apellido").val().trim().length === 0) {
        mensaje_dialogo_info_ERROR("Debes ingresar nombre y apellido", "ATENCIÓN");
        return;
    }
    let cabecera = {
        nombre: $("#alumno_nombre").val().trim(),
        apellido: $("#alumno_apellido").val().trim(),
        ci_alumno: $("#alumno_ci").val().trim(),
        fecha_nacimiento: $("#alumno_fecha_nacimiento").val(),
        email: $("#alumno_email").val().trim(),
        telefono: $("#alumno_telefono").val().trim(),
        direccion: $("#alumno_direccion").val().trim(),
        estado: $("#alumno_estado").val(),
    };
    if ($("#id_alumno").val() === "0") {
        ejecutarAjax("controladores/alumnos.php", "guardar=" + JSON.stringify(cabecera));
        mensaje_confirmacion("Guardado correctamente", "Éxito");
    } else {
        cabecera = { ...cabecera, id_alumno: $("#id_alumno").val() };
        ejecutarAjax("controladores/alumnos.php", "actualizar=" + JSON.stringify(cabecera));
        mensaje_confirmacion("Actualizado correctamente", "Éxito");
    }
    mostrarListaAlumnos();
}

function cargarTablaAlumnos() {
    let datos = ejecutarAjax("controladores/alumnos.php", "listar=1");
    let fila = "";
    if (datos === "0") {
        fila = `<tr><td colspan='9' class='text-center'>No hay registros</td></tr>`;
    } else {
        let json_datos = JSON.parse(datos);
        json_datos.map(function (item) {
            fila += `<tr>`;
            fila += `<td>${item.id_alumno}</td>`;
            fila += `<td>${item.nombre}</td>`;
            fila += `<td>${item.apellido}</td>`;
            fila += `<td>${item.ci_alumno ? item.ci_alumno : ""}</td>`;
            fila += `<td>${item.fecha_nacimiento ? item.fecha_nacimiento : ""}</td>`;
            fila += `<td>${item.email ? item.email : ""}</td>`;
            fila += `<td>${item.telefono ? item.telefono : ""}</td>`;
            fila += `<td><span class="badge bg-${item.estado === "ACTIVO" ? "success" : "danger"}">${item.estado}</span></td>`;
            fila += `<td class='text-end'>`;
            fila += `<button class='btn btn-warning editar-alumno'><i data-feather="edit"></i></button> `;
            fila += `<button class='btn btn-danger eliminar-alumno'><i data-feather="trash"></i></button>`;
            fila += `</td>`;
            fila += `</tr>`;
        });
    }
    $("#alumnos_tb").html(fila);
    feather.replace();
}

$(document).on("click", ".eliminar-alumno", function () {
    let id = $(this).closest("tr").find("td:eq(0)").text();
    Swal.fire({
        title: 'Estas seguro?',
        text: "Desea eliminar esta registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.isConfirmed) {
            ejecutarAjax("controladores/alumnos.php", "eliminar=" + id);
            mensaje_confirmacion("Eliminado correctamente", "Éxito");
            cargarTablaAlumnos();
        }
    });
});

$(document).on("click", ".editar-alumno", function () {
    let id = $(this).closest("tr").find("td:eq(0)").text();
    let response = ejecutarAjax("controladores/alumnos.php", "id=" + id);
    if (response === "0") {
        mensaje_dialogo_info_ERROR("No se pudo obtener el registro", "Error");
        return;
    }
    let json_registro = JSON.parse(response);
    let contenido = dameContenido("paginas/referenciales/alumnos/agregar.php");
    $(".contenido-principal").html(contenido);
    $("#alumno_form_titulo").text("Editar Alumno");
    $("#id_alumno").val(json_registro.id_alumno);
    $("#alumno_nombre").val(json_registro.nombre);
    $("#alumno_apellido").val(json_registro.apellido);
    $("#alumno_ci").val(json_registro.ci_alumno ? json_registro.ci_alumno : "");
    $("#alumno_fecha_nacimiento").val(json_registro.fecha_nacimiento ? json_registro.fecha_nacimiento : "");
    $("#alumno_email").val(json_registro.email ? json_registro.email : "");
    $("#alumno_telefono").val(json_registro.telefono ? json_registro.telefono : "");
    $("#alumno_direccion").val(json_registro.direccion ? json_registro.direccion : "");
    $("#alumno_estado").val(json_registro.estado);
});

function cancelarAlumno() {
    mostrarListaAlumnos();
}

$(document).on("keyup", "#b_alumno", function () {
    let texto = $(this).val();
    if (texto.trim().length === 0) {
        cargarTablaAlumnos();
        return;
    }
    let datos = ejecutarAjax("controladores/alumnos.php", "buscar=" + texto);
    let fila = "";
    if (datos === "0") {
        fila = `<tr><td colspan='9' class='text-center'>No hay registros</td></tr>`;
    } else {
        let json_datos = JSON.parse(datos);
        json_datos.map(function (item) {
            fila += `<tr>`;
            fila += `<td>${item.id_alumno}</td>`;
            fila += `<td>${item.nombre}</td>`;
            fila += `<td>${item.apellido}</td>`;
            fila += `<td>${item.ci_alumno ? item.ci_alumno : ""}</td>`;
            fila += `<td>${item.fecha_nacimiento ? item.fecha_nacimiento : ""}</td>`;
            fila += `<td>${item.email ? item.email : ""}</td>`;
            fila += `<td>${item.telefono ? item.telefono : ""}</td>`;
            fila += `<td><span class="badge bg-${item.estado === "ACTIVO" ? "success" : "danger"}">${item.estado}</span></td>`;
            fila += `<td class='text-end'>`;
            fila += `<button class='btn btn-warning editar-alumno'><i data-feather="edit"></i></button> `;
            fila += `<button class='btn btn-danger eliminar-alumno'><i data-feather="trash"></i></button>`;
            fila += `</td>`;
            fila += `</tr>`;
        });
    }
    $("#alumnos_tb").html(fila);
    feather.replace();
});

function cargarListaAlumnosActivos(componente) {
    let datos = ejecutarAjax("controladores/alumnos.php", "leer_activos=1");
    let option = "<option value='0'>Selecciona un Alumno</option>";
    if (datos !== "0") {
        let json_datos = JSON.parse(datos);
        json_datos.map(function (item) {
            option += `<option value='${item.id_alumno}'>${item.nombre_completo}</option>`;
        });
    }
    $(componente).html(option);
}
