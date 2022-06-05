const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {

        if( this._listado[id]){
            delete this._listado[id];
        }

    }

    toggleCompletadas( ids = [ ]){

        ids.forEach( id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn){
                tarea.completadoEn =  new Date().toISOString();
            }
        })

        this.listadoArr.forEach( tarea => {
            
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }


        })

    }

    cargarTareasFromArray(array) {

        array.forEach( tarea => {
            this._listado[tarea.id] = tarea;

        })
    }

    crearTarea( descripcion = '' ) {

        const tarea = new Tarea( descripcion );
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {

        this.listadoArr.forEach( (tarea, i) => {
            const idx = `${i + 1}`.cyan;
            const { descripcion, completadoEn } = tarea;

            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            console.log(`${(idx + '.').cyan} ${descripcion} :: ${estado}`);

        })
    }

    listarPendientesCompletadas( completadas = true) {

        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea => {
            const { descripcion, completadoEn } = tarea;
            
            if (completadas){
            
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').cyan} ${descripcion} :: ${completadoEn}`)
                } 
            } else {

                if(!completadoEn) {
                    contador += 1;
                    console.log(`${(contador + '.').cyan} ${descripcion}`)
                }
                
            }
                    
            
        })

    }

}


module.exports = Tareas;

