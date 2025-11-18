function validarCampoDeTextoID(id, mensaje) {
    //validaciones de nombre
    if ($("#" + id + "").val().length <= 0) {
        mensaje_dialogo_info(mensaje);
        $("#" + id + "").focus();
        $("#" + id + "")
                .parent()
                .addClass("has-error");

        $("#" + id + "").keypress(function () {
            $("#" + id + "")
                    .parent()
                    .removeClass("has-error");
        });
        return false;
    }
    return true;
}

function validarListaDesplegableID(id, mensaje) {
    //validaciones de nombre
    if ($("#" + id + "").val() == 0) {
        alert(mensaje);
        $("#" + id + "").focus();
        $("#" + id + "")
                .parent()
                .addClass("has-error");

        $("#" + id + "").click(function () {
            $("#" + id + "")
                    .parent()
                    .removeClass("has-error");
        });
        return false;
    }
    return true;
}

/**
 * Funcion que devuelve un numero separando los separadores de miles
 * Puede recibir valores negativos y con decimales
 */
function formatearNumero(valor) {
    // Variable que contendra el resultado final
    var numero = String(valor);
    var resultado = "";

    // Si el numero empieza por el valor "-" (numero negativo)
    if (numero[0] == "-") {
        // Cogemos el numero eliminando los posibles puntos que tenga, y sin
        // el signo negativo
        nuevoNumero = numero.replace(/\./g, "").substring(1);
    } else {
        // Cogemos el numero eliminando los posibles puntos que tenga
        nuevoNumero = numero.replace(/\./g, "");
    }

    // Si tiene decimales, se los quitamos al numero
    if (numero.indexOf(",") >= 0)
        nuevoNumero = nuevoNumero.substring(0, nuevoNumero.indexOf(","));

    // Ponemos un punto cada 3 caracteres
    for (var j, i = nuevoNumero.length - 1, j = 0; i >= 0; i--, j++)
        resultado =
                nuevoNumero.charAt(i) + (j > 0 && j % 3 == 0 ? "." : "") + resultado;

    // Si tiene decimales, se lo añadimos al numero una vez forateado con
    // los separadores de miles
    if (numero.indexOf(",") >= 0)
        resultado += numero.substring(numero.indexOf(","));

    if (numero[0] == "-") {
        // Devolvemos el valor añadiendo al inicio el signo negativo
        return "-" + resultado;
    } else {
        return resultado;
    }
}

function formatearNumeroCampo(valor) {
    // Variable que contendra el resultado final
    var numero = $("#" + valor).val();
    var resultado = "";

    // Si el numero empieza por el valor "-" (numero negativo)
    if (numero[0] == "-") {
        // Cogemos el numero eliminando los posibles puntos que tenga, y sin
        // el signo negativo
        nuevoNumero = numero.replace(/\./g, "").substring(1);
    } else {
        // Cogemos el numero eliminando los posibles puntos que tenga
        nuevoNumero = numero.replace(/\./g, "");
    }

    // Si tiene decimales, se los quitamos al numero
    if (numero.indexOf(",") >= 0)
        nuevoNumero = nuevoNumero.substring(0, nuevoNumero.indexOf(","));

    // Ponemos un punto cada 3 caracteres
    for (var j, i = nuevoNumero.length - 1, j = 0; i >= 0; i--, j++)
        resultado =
                nuevoNumero.charAt(i) + (j > 0 && j % 3 == 0 ? "." : "") + resultado;

    // Si tiene decimales, se lo añadimos al numero una vez forateado con
    // los separadores de miles
    if (numero.indexOf(",") >= 0)
        resultado += numero.substring(numero.indexOf(","));

    if (numero[0] == "-") {
        // Devolvemos el valor añadiendo al inicio el signo negativo
        $("#" + valor).val("-" + resultado);
    } else {
        $("#" + valor).val(resultado);
    }
}

function dameFechaActual(id_componente) {
    var fecha = new Date();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    var actual = "";
    if (mes - 10 < 0) {
        actual = fecha.getFullYear() + "-0" + mes + "-";
    } else {
        actual = fecha.getFullYear() + "-" + mes + "-";
    }

    if (dia - 10 < 0) {
        actual += "0" + dia;
    } else {
        actual += dia;
    }
    $("#" + id_componente).val(actual);
}

function dameFechaActualFormateada() {
    var fecha = new Date();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    var actual = "";
    if (dia - 10 < 0) {
        actual = "0" + dia;
    } else {
        actual = dia;
    }
    if (mes - 10 < 0) {
        actual += "-0" + mes + "-" + fecha.getFullYear();
    } else {
        actual += "-" + mes + "-" + fecha.getFullYear();
    }

    return actual;
}
function dameFechaActualSQL() {
    var fecha = new Date();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    var actual = "";
    if (mes - 10 < 0) {
        actual = fecha.getFullYear() + "-0" + mes + "-";
    } else {
        actual = fecha.getFullYear() + "-" + mes + "-";
    }

    if (dia - 10 < 0) {
        actual += "0" + dia;
    } else {
        actual += dia;
    }
    return actual;
}

function dameFechaFormateadaSQL(fecha) {
    var fec = String(fecha).split("-");

    return fec[2] + "-" + fec[1] + "-" + fec[0];
}
function dameFechaFormateada(fecha) {
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate() + 1;
    var actual = "";
    if (dia - 10 < 0) {
        actual += "0" + dia;
    } else {
        actual += dia;
    }
    if (mes - 10 < 0) {
        actual += "-0" + mes + "-" + fecha.getFullYear();
    } else {
        actual += "-" + mes + "-" + fecha.getFullYear();
    }

    return actual;
}

function formatearFecha(fecha) {
    var dia = fecha.getDate() + 1;
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();
    return dia + "-" + mes + "-" + anio;
}

function dameFechaSQL() {
    var fecha = new Date();
    var dia = fecha.getDate() + 1;
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();
    return anio + "-" + mes + "-" + dia;
}
function dameFechaSQL2(fecha1) {
    var fecha = new Date(fecha1);
    var dia = fecha.getDate() + 1;
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();
    return anio + "-" + mes + "-" + dia;
}

function dameFechaSQL(fecha) {
    var fec = String(fecha).split("-");

    return fec[0] + "-" + fec[2] + "-" + fec[1];
}

function dameFechaTimeFormateadaComponente(fecha) {
    var dat = fecha.split(" ")[0];
    var fecha_split = dat.split("-");
    var tim = fecha.split(" ")[1];
    var hora = tim.split(":");
    return (
            fecha_split[0] +
            "-" +
            fecha_split[1] +
            "-" +
            fecha_split[2] +
            "T" +
            hora[0] +
            ":" +
            hora[1]
            );
}
function dameFechaFormateadaSQL(fecha) {
    var fec = String(fecha).split("-");

    return fec[2] + "-" + fec[1] + "-" + fec[0];
}

function quitarDecimalesConvertir(valor) {
    if (valor.length === 0)
        return 0;
    var num = String(valor);
    var numer = num.replace(/\./g, "");
    var nuevo_n = parseInt(numer);
    return nuevo_n;
}

function mensajeErrorUsuario(mensaje, titulo) {
    var modal =
            "<div class='modal fade' id='mensaje-usuario'>" +
            "<div class='modal-dialog'>" +
            "<div class='modal-content'>" +
            "<div class='modal-header' style='background: #990000;'> " +
            "<button class='close'" +
            " type='button'" +
            "data-dismiss='modal'" +
            "aria-label='Close'" +
            "><span aria-hidden='true'>&times;</span> </button>" +
            "<h4 class='modal-title' style='color: #fffc;'>" +
            titulo +
            "</h4>" +
            "</div>" +
            "<div class='modal-body' style='font-weight: bold;'>" +
            mensaje +
            "</div>" +
            "<div class='modal-footer'>" +
            "<button type='button'class='btn btn-default pull-left'" +
            " data-dismiss='modal'>Cerrar</button>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>";
    $("body").append(modal);
    $("#mensaje-usuario").modal("show");
}
function dameNombreDelMes(mes) {
    let nombre = "";
    switch (mes) {
        case 1:
            nombre = "ENERO";
            break;
        case 2:
            nombre = "FEBRERO";
            break;
        case 3:
            nombre = "MARZO";
            break;
        case 4:
            nombre = "ABRIL";
            break;
        case 5:
            nombre = "MAYO";
            break;
        case 6:
            nombre = "JUNIO";
            break;
        case 7:
            nombre = "JULIO";
            break;
        case 8:
            nombre = "AGOSTO";
            break;
        case 9:
            nombre = "SEPTIEMBRE";
            break;
        case 10:
            nombre = "OCTUBRE";
            break;
        case 11:
            nombre = "NOVIEMBRE";
            break;
        case 12:
            nombre = "DICIEMBRE";
            break;

        default:
            break;
    }
    return nombre;
}

function lpad(str, length, padChar) {
    str = String(str); // Convertir a cadena en caso de que no lo sea
    while (str.length < length) {
        str = padChar + str;
    }
    return str;
}

function ejecutarAjax(url, data) {
    var resultado = "";
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: url,
        data: data,
        success: function (datos) {
            //                console.log(datos);

            resultado = datos;
        },
    });

    return resultado;
}

function ejecutarAjaxHTML(url, data) {
    var resultado = "";
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        dataType: "html",
        url: url,
        data: data,
        success: function (datos) {
            //                console.log(datos);
            resultado = datos;
        },
    });

    return resultado;
}

function ejecutarAjaxERROR(url, data, mensaje_error, mensaje_correcto) {
    var resultado = "";
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: url,
        data: data,
        success: function (datos) {
            resultado = datos;
            mensaje_dialogo_info(mensaje_correcto, "CORRECTO");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            mensaje_dialogo_info_ERROR(mensaje_error + " " + textStatus, "ERROR");
        },
        beforeSend: function (xhr) {
            //logo de cargando
        },
    });

    return resultado;
}

var modalConfirm;

function mensaje_confirmacion(mensaje, titulo) {
     Swal.fire(
            mensaje,
            titulo,
            'success'
            );
}

function mensaje_dialogo_info(mensaje, titulo) {
    //    var con = `
    //
    //<!-- Modal -->
    //<div id='dialogo-mensaje' class='modal fade' role='dialog'>
    //  <div class='modal-dialog'>
    //
    //    <!-- Modal content-->
    //    <div class='modal-content'>
    //      <div class='modal-header'>
    //        <button type='button' class='close' data-dismiss='modal'>&times;</button>
    //        <h4 class='modal-title'>${titulo}</h4>
    //      </div>
    //      <div class='modal-body'>
    //        <p>${mensaje}</p>
    //      </div>
    //      <div class='modal-footer'>
    //        <button type='button' class='btn btn-default' data-dismiss='modal'>Aceptar</button>
    //      </div>
    //    </div>
    //
    //  </div>
    //</div>`;
    //
    //    $("html").append(con);
    //
    //    $("#dialogo-mensaje").modal("show");
    Swal.fire(
            mensaje,
            titulo,
            'info'
            );
}

function mensaje_dialogo_info_ERROR(mensaje, titulo) {
    Swal.fire(
            titulo,
            mensaje,
            'error'
            );
}

$(document).on("keyup", ".formatear", function (evt) {
    $(this).val(formatearNumero($(this).val()));
});

function dameContenido(dir) {
    var contenido = "";

    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: dir,
        success: function (datos) {
            contenido = datos;

        }
    });

    return contenido;
}

$(document).on("click", ".remover-item", function (evt) {
    var tr = $(this).closest("tr");
    alertify.confirm(
            "ATENCION",
            "¿Desea remover el item?",
            function () {
                $(tr).remove();
                alertify.success("Removido");
            },
            function () {
                alertify.error("Cancelado");
            }
    );
});

function dameTimeStapActualSQL() {
    var fecha = new Date();
    return (
            fecha.getFullYear() +
            "-" +
            (fecha.getMonth() + 1) +
            "-" +
            fecha.getDate() +
            " " +
            fecha.getHours() +
            ":" +
            fecha.getMinutes() +
            ":" +
            fecha.getSeconds()
            );
}
function imprimir() {
    window.print();
}

function format(input) {
    var num = input.value.replace(/\./g, "");
    if (!isNaN(num)) {
        num = num
                .toString()
                .split("")
                .reverse()
                .join("")
                .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
        num = num.split("").reverse().join("").replace(/^[\.]/, "");
        input.value = num;
    } else {
        alert("Solo se permiten numeros");
        input.value = input.value.replace(/[^\d\.]*/g, "");
    }
}

function cargarDataTable(componente, lista) {
    $(componente).DataTable({
        lengthChange: false,
        responsive: "true",
        data: lista,
        dom: "Bfrtilp",
        buttons: [
            {
                extend: "excelHtml5",
                text: "Excel",
                titleAttr: "Exportar a Excel",
                className: "btn btn-success",
            },
            {
                extend: "pdfHtml5",
                text: "PDF",
                titleAttr: "Exportar a PDF",
                className: "btn btn-danger",
            },
            {
                extend: "print",
                text: "Imprimir",
                titleAttr: "Imprimir",
                className: "btn btn-secondary",
            },
        ],
        iDisplayLength: 10,
        language: {
            sSearch: "Buscar: ",
            sInfo:
                    "Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros",
            sInfoFiltered: "(filtrado de entre _MAX_ registros)",
            sZeroRecords: "No hay resultados",
            sInfoEmpty: "No hay resultados",
            oPaginate: {
                sNext: "Siguiente",
                sPrevious: "Anterior",
            },
        },
    });
}

function cargarDataTableCiudad(componente, lista) {
    console.log($.fn.DataTable.isDataTable(componente));
    if ($.fn.DataTable.isDataTable(componente)) {
        console.log("creado");
        var tabla = $(componente).DataTable();
        tabla.clear().draw();
        tabla.rows.add(lista).draw();
    } else {
        console.log("no creado");
        $(componente).dataTable().fnDestroy();
        $(componente).DataTable({
            lengthChange: false,
            responsive: "true",
            data: lista,
            dom: "Bfrtilp",
            buttons: [
                {
                    extend: "excelHtml5",
                    text: "Excel",
                    titleAttr: "Exportar a Excel",
                    className: "btn btn-success",
                },
                {
                    extend: "pdfHtml5",
                    text: "PDF",
                    titleAttr: "Exportar a PDF",
                    className: "btn btn-danger",
                },
                {
                    extend: "print",
                    text: "Imprimir",
                    titleAttr: "Imprimir",
                    className: "btn btn-secondary",
                },
            ],
            iDisplayLength: 10,
            language: {
                sSearch: "Buscar: ",
                sInfo:
                        "Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros",
                sInfoFiltered: "(filtrado de entre _MAX_ registros)",
                sZeroRecords: "No hay resultados",
                sInfoEmpty: "No hay resultados",
                oPaginate: {
                    sNext: "Siguiente",
                    sPrevious: "Anterior",
                },
            },
        });
    }
}

function cargarDataTableProveedor(componente, lista) {
    console.log($.fn.DataTable.isDataTable(componente));
    if ($.fn.DataTable.isDataTable(componente)) {
        console.log("creado");
        var tabla = $(componente).DataTable();
        tabla.clear().draw();
        tabla.rows.add(lista).draw();
    } else {
        console.log("no creado");
        $(componente).dataTable().fnDestroy();
        $(componente).DataTable({
            lengthChange: false,
            responsive: "true",
            data: lista,
            dom: "Bfrtilp",
            buttons: [
                {
                    extend: "excelHtml5",
                    text: "Excel",
                    titleAttr: "Exportar a Excel",
                    className: "btn btn-success",
                },
                {
                    extend: "pdfHtml5",
                    text: "PDF",
                    titleAttr: "Exportar a PDF",
                    className: "btn btn-danger",
                },
                {
                    extend: "print",
                    text: "Imprimir",
                    titleAttr: "Imprimir",
                    className: "btn btn-secondary",
                },
            ],
            iDisplayLength: 10,
            language: {
                sSearch: "Buscar: ",
                sInfo:
                        "Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros",
                sInfoFiltered: "(filtrado de entre _MAX_ registros)",
                sZeroRecords: "No hay resultados",
                sInfoEmpty: "No hay resultados",
                oPaginate: {
                    sNext: "Siguiente",
                    sPrevious: "Anterior",
                },
            },
        });
    }
}

function cargarDataTableMascota(componente, lista) {
    console.log($.fn.DataTable.isDataTable(componente));
    if ($.fn.DataTable.isDataTable(componente)) {
        console.log("creado");
        var tabla = $(componente).DataTable();
        tabla.clear().draw();
        tabla.rows.add(lista).draw();
    } else {
        console.log("no creado");
        $(componente).dataTable().fnDestroy();
        $(componente).DataTable({
            lengthChange: false,
            responsive: "true",
            data: lista,
            dom: "Bfrtilp",
            buttons: [
                {
                    extend: "excelHtml5",
                    text: "Excel",
                    titleAttr: "Exportar a Excel",
                    className: "btn btn-success",
                },
                {
                    extend: "pdfHtml5",
                    text: "PDF",
                    titleAttr: "Exportar a PDF",
                    className: "btn btn-danger",
                },
                {
                    extend: "print",
                    text: "Imprimir",
                    titleAttr: "Imprimir",
                    className: "btn btn-secondary",
                },
            ],
            iDisplayLength: 10,
            language: {
                sSearch: "Buscar: ",
                sInfo:
                        "Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros",
                sInfoFiltered: "(filtrado de entre _MAX_ registros)",
                sZeroRecords: "No hay resultados",
                sInfoEmpty: "No hay resultados",
                oPaginate: {
                    sNext: "Siguiente",
                    sPrevious: "Anterior",
                },
            },
        });
    }
}

function cargarDataTablePropietario(componente, lista) {
    console.log($.fn.DataTable.isDataTable(componente));
    if ($.fn.DataTable.isDataTable(componente)) {
        console.log("creado");
        var tabla = $(componente).DataTable();
        tabla.clear().draw();
        tabla.rows.add(lista).draw();

    } else {
        console.log("no creado");
        $(componente).dataTable().fnDestroy();
        $(componente).DataTable({
            lengthChange: false,
            responsive: "true",
            data: lista,
            dom: "Bfrtilp",
            buttons: [
                {
                    extend: "excelHtml5",
                    text: "Excel",
                    titleAttr: "Exportar a Excel",
                    className: "btn btn-success",
                },
                {
                    extend: "pdfHtml5",
                    text: "PDF",
                    titleAttr: "Exportar a PDF",
                    className: "btn btn-danger",
                },
                {
                    extend: "print",
                    text: "Imprimir",
                    titleAttr: "Imprimir",
                    className: "btn btn-secondary",
                },
            ],
            iDisplayLength: 10,
            language: {
                sSearch: "Buscar: ",
                sInfo:
                        "Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros",
                sInfoFiltered: "(filtrado de entre _MAX_ registros)",
                sZeroRecords: "No hay resultados",
                sInfoEmpty: "No hay resultados",
                oPaginate: {
                    sNext: "Siguiente",
                    sPrevious: "Anterior",
                },
            },
        });
    }
}
function borrardatos() {
    $("#propietario_tb").dataTable().fnDestroy();
}

function borrardatosproveedor() {
    $("#propietario_tb").dataTable().fnDestroy();
}

function cargarDataTableBotones(componente, lista) {
    console.log($.fn.DataTable.isDataTable(componente));
    if ($.fn.DataTable.isDataTable(componente)) {
        console.log("creado");
        var tabla = $(componente).DataTable();
        tabla.clear().draw();
        tabla.rows.add(lista).draw();
    } else {
        console.log("no creado");
        $(componente).dataTable().fnDestroy();
        $(componente).DataTable({
            lengthChange: false,
            responsive: "true",
            data: lista,
            dom: "Bfrtilp",
            buttons: [
                {
                    extend: "excelHtml5",
                    text: "Excel",
                    titleAttr: "Exportar a Excel",
                    className: "btn btn-success",
                },
                {
                    extend: "pdfHtml5",
                    text: "PDF",
                    titleAttr: "Exportar a PDF",
                    className: "btn btn-danger",
                },
                {
                    extend: "print",
                    text: "Imprimir",
                    titleAttr: "Imprimir",
                    className: "btn btn-secondary",
                },
            ],
            iDisplayLength: 10,
            language: {
                sSearch: "Buscar: ",
                sInfo:
                        "Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ registros",
                sInfoFiltered: "(filtrado de entre _MAX_ registros)",
                sZeroRecords: "No hay resultados",
                sInfoEmpty: "No hay resultados",
                oPaginate: {
                    sNext: "Siguiente",
                    sPrevious: "Anterior",
                },
            },
        });
    }
}
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
$(document).on("keyup", ".formatear-numero", function (evt) {
    $(this).val(formatearNumero($(this).val()));
});