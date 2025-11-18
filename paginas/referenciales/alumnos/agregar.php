<div class="container-fluid card" style="padding: 30px;">
    <div class="row g-3">
        <div class="col-md-12">
            <h3 id="alumno_form_titulo">Nuevo Alumno</h3>
        </div>
        <div class="col-md-12">
            <hr>
        </div>
        <input type="hidden" id="id_alumno" value="0">
        <div class="col-md-6">
            <label for="alumno_nombre" class="form-label">Nombre *</label>
            <input type="text" class="form-control" id="alumno_nombre" placeholder="Nombre del alumno">
        </div>
        <div class="col-md-6">
            <label for="alumno_apellido" class="form-label">Apellido *</label>
            <input type="text" class="form-control" id="alumno_apellido" placeholder="Apellido del alumno">
        </div>
        <div class="col-md-4">
            <label for="alumno_ci" class="form-label">CI</label>
            <input type="text" class="form-control" id="alumno_ci" placeholder="Número de documento">
        </div>
        <div class="col-md-4">
            <label for="alumno_fecha_nacimiento" class="form-label">Fecha de nacimiento</label>
            <input type="date" class="form-control" id="alumno_fecha_nacimiento">
        </div>
        <div class="col-md-4">
            <label for="alumno_estado" class="form-label">Estado *</label>
            <select id="alumno_estado" class="form-select">
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
            </select>
        </div>
        <div class="col-md-6">
            <label for="alumno_email" class="form-label">Email</label>
            <input type="email" class="form-control" id="alumno_email" placeholder="Correo electrónico">
        </div>
        <div class="col-md-6">
            <label for="alumno_telefono" class="form-label">Teléfono</label>
            <input type="text" class="form-control" id="alumno_telefono" placeholder="Teléfono de contacto">
        </div>
        <div class="col-md-12">
            <label for="alumno_direccion" class="form-label">Dirección</label>
            <textarea id="alumno_direccion" class="form-control" rows="3" placeholder="Dirección del alumno"></textarea>
        </div>
        <div class="col-md-12 text-end">
            <button class="btn btn-secondary" onclick="cancelarAlumno(); return false;">Cancelar</button>
            <button class="btn btn-primary" onclick="guardarAlumno(); return false;">Guardar</button>
        </div>
    </div>
</div>
