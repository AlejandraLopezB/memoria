const { db } = require("../pgAdaptor");
const { Date } = require("./customScalars");

const resolvers = {
    Date,
	Query: {
        persona: async (_, args) => {
            const query = `SELECT * FROM Persona WHERE idpersona = $1`;
            const values = [args.idpersona];
            try {
                const res = await db.oneOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        personas: async () => {
            const query = `SELECT * FROM Persona`;
            try {
                const res = await db.manyOrNone(query);
                return res;
            } catch (err) {
                return err;
            }
        },
        personasPorCargo: async (_, args) => {
            const query = `SELECT * FROM Persona WHERE cargo = $1`;
            const values = [args.cargo];
            try {
                const res = await db.manyOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        personasPorCargoYPeriodo: async (_, args) => {
            const query = `SELECT * FROM Persona WHERE cargo = $1 AND periodo_legislativo = $2`;
            const values = [args.cargo, args.periodo_legislativo];
            try {
                const res = await db.manyOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        personasPorCargoPeriodoYPartido: async (_, args) => {
            const query = `SELECT * FROM Persona WHERE cargo = $1 AND periodo_legislativo = $2 AND idpartidopolitico = $3`;
            const values = [args.cargo, args.periodo_legislativo, args.idpartidopolitico];
            try {
                const res = await db.manyOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        personasPorTipo: async (_, args) => {
            const query = `SELECT * FROM Persona WHERE tipo = $1`;
            const values = [args.tipo];
            try {
                const res = await db.manyOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        personasPorTipoYPeriodo: async (_, args) => {
            const query = `SELECT * FROM Persona WHERE tipo = $1 AND periodo_legislativo = $2`;
            const values = [args.tipo, args.periodo_legislativo];
            try {
                const res = await db.manyOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        personasPorTipoPeriodoYPartido: async (_, args) => {
            const query = `SELECT * FROM Persona WHERE tipo = $1 AND periodo_legislativo = $2 AND idpartidopolitico = $3`;
            const values = [args.tipo, args.periodo_legislativo, args.idpartidopolitico];
            try {
                const res = await db.manyOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        periodosLegislativos: async () => {
            const query = `SELECT * FROM Periodo_Legislativo`;
            try {
                const res = await db.manyOrNone(query);
                return res;
            } catch (err) {
                return err;
            }
        },
        periodoLegislativo: async (_, args) => {
            const query = `SELECT * FROM periodo_legislativo WHERE periodo_legislativo = $1`;
            const values = [args.periodo_legislativo];
            try {
                const res = await db.one(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        comision: async (_, args) => {
            const query = `SELECT * FROM comision WHERE idcomision = $1`;
            const values = [args.idcomision];
            try {
                const res = await db.one(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        sesionesPorAno: async (_, args) => {
            const query = `SELECT * FROM sesion WHERE extract(year from fecha) = $1`;
            const values = [args.ano];
            try {
                const res = await db.manyOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        sesionesPorComisionYAno: async (_, args) => {
            const query = `SELECT * FROM sesion WHERE idcomision = $1 AND extract(year from fecha) = $2`;
            const values = [args.idcomision, args.ano];
            try {
                const res = await db.manyOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        },
        sesionesPorComisionYPeriodo: async (_, args) => {
            const query = `SELECT * FROM sesion WHERE idcomision = $1 AND periodo_legislativo = $2`;
            const values = [args.idcomision, args.periodo_legislativo];
            try {
                const res = await db.manyOrNone(query, values);
                return res;
            } catch (err) {
                return err;
            }
        }
        
    },
    Persona: {
        periodoLegislativo(parent) {
            const query = `SELECT * FROM Periodo_Legislativo WHERE periodo_legislativo = ${ parent.periodo_legislativo }`;
            try {
                const res = db.oneOrNone(query);
                return res;
            } catch (err) {
                return err;
            }
        },
        partidoPolitico(parent) {
            const query = `SELECT * FROM partido_politico WHERE idpartidopolitico = ${ parent.idpartidopolitico }`;
            try {
                const res = db.oneOrNone(query);
                return res;
            } catch (err) {
                return err;
            }
        }
    },
    Comision: {
        sesiones(parent) {
            const query = `SELECT * FROM sesion WHERE idcomision = ${ parent.idcomision }`;
            try {
                const res = db.manyOrNone(query);
                return res;
            } catch (err) {
                return err;
            }
        },
    },
    Sesion: {
        comision(parent) {
            const query = `SELECT * FROM comision WHERE idcomision = ${ parent.idcomision }`;
            try {
                const res = db.one(query);
                return res;
            } catch (err) {
                return err;
            }
        },
        periodoLegislativo(parent) {
            const query = `SELECT * FROM Periodo_Legislativo WHERE periodo_legislativo = ${ parent.periodo_legislativo }`;
            try {
                const res = db.one(query);
                return res;
            } catch (err) {
                return err;
            }
        },
        sesionLog(parent) {
            const query = `SELECT * FROM sesion_log WHERE idsesion = ${ parent.idsesion }`;
            try {
                const res = db.manyOrNone(query);
                return res;
            } catch (err) {
                return err;
            }
        }
    },
    SesionLog: {
        personas(parent) {
            const query = `SELECT * FROM persona WHERE idpersona = ${ parent.idpersona }`;
            try {
                const res = db.manyOrNone(query);
                return res;
            } catch (err) {
                return err;
            }
        }
    }
};

exports.resolvers = resolvers;