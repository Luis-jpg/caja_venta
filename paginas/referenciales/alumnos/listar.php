<div class="container-fluid card" style="padding: 30px;">
    <div class="row">
        <div class="col-md-8">
            <h3>Lista de Alumnos</h3>
        </div>
        <div class="col-md-4 text-end">
            <button class="btn btn-primary" onclick="mostrarAgregarAlumno(); return false;"><i class="fa fa-plus"></i> Agregar</button>
        </div>
        <div class="col-md-12">
            <hr>
        </div>
        <div class="col-md-12">
            <label for="b_alumno">Búsqueda</label>
            <input type="text" class="form-control" id="b_alumno" placeholder="Ingrese datos para buscar">
        </div>
        <div class="col-md-12" style="margin-top: 30px;">
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>CI</th>
                            <th>Fecha Nac.</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Estado</th>
                            <th class="text-end">Operaciones</th>
                        </tr>
                    </thead>
                    <tbody id="alumnos_tb"></tbody>
                </table>
            </div>
        </div>
    </div>
</div>
